var express = require('express');
var router = express.Router();
var models  = require('../models/model');
var isLogged = require('./isLogged');

//define o limit padrão das requisições paginadas
var defaultLimit = 6;

/** Monta o PageRequest com os atributos passados na requisição. **/
var getPage = function(params){
    return {'page' : params.number ? Number(params.number) : 0, 'limit': params.limit ? params.limit : defaultLimit };
};

/** Monta a resposta com um objeto de paginação. **/
var setResponse = function(limit, count, page, rows ){
    return {'total' : count, 'pages' : Math.ceil(count / limit), 'number': page,'size':rows.length, 'content': rows }
};

/* GET - Lista todos os usuários */
router.get('/', isLogged, function(req, res, next) {
    var pageRequest = getPage(req.query);
    models.User.findAndCountAll({
        offset : pageRequest.page * pageRequest.limit,
        limit : pageRequest.limit,
        order:[['id','DESC']]
    }) .then(function(result) {
        res.json(setResponse(pageRequest.limit, result.count, pageRequest.page, result.rows));
    });
});

/* POST - salva um usuário */
router.post('/', function(req, res, next){
    if(req.body.id != null){
        models.User.update(
            req.body,
            {
                where : {'id' : req.body.id }                
            }
        ).then(function(user){
            res.status(200).send({});
        }, function(err){
            res.status(500).send(err);
        });
    } else{
        models.User.register(new models.User(req.body),req.body.password)
            .then(function(user){
            res.status(200).json({});
        }, function(err){
            res.send(err, 500);
        });
    }
});

/* GET - Busca um usuário por ID */
router.get('/:id', function(req, res, next){
    models.User.find({
        where : {
            id : req.params.id
        }
    }).then(function(user){
        res.json(user);
    }, function(err){
        res.send(err, 500);
    });
});

/* DELETE - Deleta um usuário pelo ID informado */
router.delete('/:id', function(req, res, next){
    models.User.destroy({
        where : {
            id : req.params.id
        }
    }).then(function(){
        res.json({});
    }, function(err){
        res.send(err, 500);
    })
});

module.exports = router;
