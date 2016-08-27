var express = require('express');
var router = express.Router();
var models = require('../models/model');
var isLogged = require('./isLogged');

//define o limit padrão das requisições paginadas
var defaultLimit = 6;

/** Monta o PageRequest com os atributos passados na requisição. **/
var getPage = function (params) {
    return {'page': params.number ? Number(params.number) : 0, 'limit': params.limit ? params.limit : defaultLimit};
};

/** Monta a resposta com um objeto de paginação. **/
var setResponse = function (limit, count, page, rows) {
    return {'total': count, 'pages': Math.ceil(count / limit), 'number': page, 'size': rows.length, 'content': rows}
};

/* Cria um middleware para interceptar todas as requisições e verificar se possui um usuário logado */
router.use(isLogged, function (req, res, next) {
    next();
})

/* GET - Lista todos os usuários */
router.get('/', function (req, res, next) {
    var pageRequest = getPage(req.query);
    models.User.findAndCountAll({
        offset: pageRequest.page * pageRequest.limit,
        limit: pageRequest.limit,
        order: [['id', 'DESC']]
    }).then(function (result) {
        res.json(setResponse(pageRequest.limit, result.count, pageRequest.page, result.rows));
    });
});

/* POST - salva um usuário */
router.post('/', function (req, res, next) {
    if (req.body.id != null) {
        models.User.update(req.body,
            {
                where: {'id': req.body.id}
            }
        ).then(function () {
            res.status(200).send({});
        }, function (err) {
            res.status(500).send(err);
        });
    } else {
        models.User.create(req.body)
            .then(function () {
                res.status(200).json({});
            }, function (err) {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

/* GET - Busca um usuário por ID */
router.get('/find/:id', function (req, res, next) {
    models.User.find({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.json(user);
    }, function (err) {
        res.status(500).json(err);
    });
});

/* DELETE - Deleta um usuário pelo ID informado */
router.delete('/delete/:id', function (req, res, next) {
    models.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json({});
    }, function (err) {
        res.status(500).json(err);
    })
});

/* GET - Obtem o usuário da sessão*/
router.get('/authenticated', function (req, res, next) {
    models.User.findById(req.user.id).then(function (user) {
        res.json(user);
    }, function (err) {
        res.status(500).json(err);
    })
});

module.exports = router;
