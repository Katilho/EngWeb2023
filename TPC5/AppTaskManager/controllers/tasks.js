var axios = require('axios')

// Tasks List
module.exports.getTasks = () => {
    return axios.get('http://localhost:3000/tasks')
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

// Users List
module.exports.getUsers = () => {
    return axios.get('http://localhost:3000/users')
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks', t)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.editTask = t => {
    return axios.put('http://localhost:3000/tasks/' + t.id, t)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}