var express = require('express');
var router = express.Router();
var passport = require('passport');
var models  = require('../models/model');

/* POST - cria a sessão do usuário */
router.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?failure=true', failureFlash: true }));

/* GET - Remove a sessão do usuário logado */
router.get('/logout', function(req,res,next){
    req.logout();
    res.redirect('/');
});

/* POST - Registra um novo usuário na aplicação */
router.post('/register', function(req, res, next){
    models.User.create(req.body).then(function(data){
        res.redirect('/login');
    }, function(err){
        res.status(500);
    })
});

module.exports = router;
