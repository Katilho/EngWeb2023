var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exame')

router.get('/api/emd', function (req, res, next) {
  if(Object.keys(req.query).length > 0){
      if(req.query.modalidade){
          console.log("AQUI")
          Exame.listmodalidade(req.query.modalidade)
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }else if(req.query.res && req.query.res == "OK"){
          Exame.resOK()
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }
  }
  else{
      Exame.list()
      .then((result) => {
          res.jsonp(result);
      }).catch((err) => {
          res.jsonp(err);
      });
  }
});

// GET /api/emd/:id - Devolve a informação completa de um EMD;
router.get('/api/emd/:id', function(req, res, next) {
  id = req.params.id
  Exame.getExame(id)
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})

// GET /api/modalidades - Devolve a lista de modalidades, sem repetições;
router.get('/api/modalidades', function (req, res, next) {
  Exame.modalidades()
  .then((result) => {
      res.jsonp(result);
  }).catch((err) => {
      res.jsonp(err);
  });
})

router.get('/api/atletas', function (req, res, next) {
  if(Object.keys(req.query).length > 0){
      if(req.query.gen && req.query.gen == 'F'){
          Exame.listGenF()
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }else if (req.query.clube){
          Exame.listAthletesByClub(req.query.clube)
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }
  }
})

module.exports = router;
