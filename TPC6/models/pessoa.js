const mongoose = require('mongoose')


var pessoaSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    idade: Number, 
    sexo: String, 
    morada: Object, 
    BI: String,
    CC: String,
    descricao: String, 
    profissao: String, 
    partido_politico: Object, 
    religiao: String,
    marca_carro: String,
    desportos: Object, 
    animais: Object,
    destinos_favoritos: Object,
    figura_publica_pt: Object, 
    atributos: Object
});


module.exports = mongoose.model('pessoa', pessoaSchema)