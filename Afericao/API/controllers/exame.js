var Exame = require('../models/exame')

// GET /api/emd - Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado";1
// GET /api/emd/:id - Devolve a informação completa de um EMD; 1
// GET /api/modalidades - Devolve a lista de modalidades, sem repetições;1
// GET /api/emd?res=OK - Devolve a lista de EMD com resultado "true";

// GET /api/emd?modalidade=X - Devolve a lista de EMD referentes à modalidade passada como
// parâmetro, X;

// GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos
// atletas de género feminino;

// GET /api/atletas?clube=X - Devolve uma lista ordenada alfabeticamente com os nomes dos
// atletas do clube X.

// Coloca esta API numa pasta de nome API no Git da aferição.

// GET /api/emd - Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado";1
module.exports.list = () => {
    return Exame
        .find({}, { "_id": 1, "nome": 1, "data": 1, "resultado": 1 })
        // .sort({data:-1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// GET /api/emd/:id - Devolve a informação completa de um EMD; 1
module.exports.getExame = id => {
    return Exame.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


// GET /api/modalidades - Devolve a lista de modalidades, sem repetições;1
module.exports.modalidades = () => {
    return Exame.aggregate([
        {
            $group: {
                _id: "$modalidade"
            }
        }
    ]).then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}

module.exports.resOK = () => {
    return Exame.find({ "resultado": true })
    .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listmodalidade = (mod) => {
    return Exame.find({ "modalidade": mod })
    .then((result) => {
        return result
        
    }).catch((err) => {
        return err
    });
}

module.exports.listGenF = () => {
    return Exame.find({ "género": "F" },{_id: 0, nome: 1}).sort({'nome': 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listAthletesByClub = (club) => {
    return Exame.find({ clube: club},{_id: 0, nome: 1}).sort({'nome': 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}




module.exports.addExame = l => {
    return Exame.create(l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateExame = l => {
    return Exame.updateOne({ _id: l._id }, l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}
