var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var model = require('./models/model');
var session = require('express-session');

//conexão com o banco
var sequelize = require('./sequelize');

//segurança
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var security = require('./passport')(passport, Strategy, model.User);
var isLogged = require('./routes/isLogged');

//rotas
var users = require('./routes/users-route');
var login = require('./routes/login-route');

var app = express();

//configura as requisições
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//app.use(bodyParser.json());

//configura a sessão
app.use(passport.initialize());
app.use(passport.session());

//setting navigation routes
app.get('/', isLogged, function(req, res, next){
    res.redirect('/app');
});
app.use('/app', require('connect-ensure-login').ensureLoggedIn(), express.static('public/app'));
app.use('/login', express.static('public/login'));

//rotas de librarys front-end
app.use('/assets', express.static('public/assets'));

//rotas de serviços Rest
app.use('/api/users', users);
app.use('/api/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(500).send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
});


// route middleware to make sure a user is logged in
var isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


sequelize.sync().then(function(res){
    app.listen(8080);
}, function(err){
    console.log(err);
})

module.exports = app;
