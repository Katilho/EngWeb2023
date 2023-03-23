var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/pessoas', function(req, res, next) {
  Pessoa.list()
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).json({erro:erro}))
});

router.get('/pessoas/:id', function(req, res, next) {
  Pessoa.getPessoa(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro:erro}))
});

router.post('/pessoas', function(req, res, next){
  Pessoa.addPessoa(req.body)
  .then((dados) => {
      res.json(dados)
  }).catch((erro) => {
      res.status(603).json({erro: erro})
  });
})

router.put('/pessoas', function(req, res, next){
  Pessoa.updatePessoa(req.body)
  .then((dados) => {
      res.json(dados)
  }).catch((erro) => {
      res.status(604).json({erro: erro})
  });
})

router.delete('/pessoas/:id', function(req, res, next) {
  Pessoa.deletePessoa(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(605).json({erro:erro}))
});

module.exports = router;
