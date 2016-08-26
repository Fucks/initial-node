var express = require('express');
var router = express.Router();
var models  = require('../models');

router.post('/', function(req, res, next) {
    models.Task.create({
        title : "Teste",
        complete : false
    }).then(function(){
        res.send("<h2>Task criada!<h2>");
    });
});

router.get('/', function(req, res, next) {
    models.Task.findAll()
        .then(function(tasks) {
            res.render('index', {
                title: 'Sequelize: Express Example',
                tasks: tasks
            });
    });
});

module.exports = router;
