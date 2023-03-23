var Pessoa = require('../models/pessoa')

// Treino list
module.exports.list = () => {
    return Pessoa.find().sort({data:-1}) //maneira de ordenar a sua coleção
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({_id:id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPessoa = a => {
    return Pessoa.create(a) // create é equivalente ao insertOne.
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePessoa = a => {
    return Pessoa.updateOne({_id:a._id}, a) // create é equivalente ao insertOne.
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({_id:id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}