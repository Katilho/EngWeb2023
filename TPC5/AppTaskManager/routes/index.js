var express = require('express');
var router = express.Router();
var Task = require('../controllers/tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTasks()
    .then(tasks => {
      Task.getUsers()
        .then(users => {
          // Talvez pudesse passar o users para um dicionário id->nome.
          res.render('index', { tasks: tasks, users: users})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  let req_task = req.body
  Task.addTask(req_task)
    .then(() => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});

router.post('/editTask/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.editTask(req.body)
    .then(() => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});


module.exports = router;
