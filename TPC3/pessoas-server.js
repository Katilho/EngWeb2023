const http = require('http');
const axios = require('axios');
const mypages = require('./mypages')
const fs = require('fs');

const porta = 7777

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(mypages.genHomePage(d)) // talvez pudesse ir buscar isto a um ficheiro.
    }

    else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc') // demonstra a lista por ordem.
        .then(function(resp){
            var pessoas = resp.data
            console.log("Recuperei " + pessoas.length + " registos")

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(erro => {   // É UMA FUNÇÃO ANÓNIMA. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/p\d+/)){

        // axios.get('http://localhost:3000' + req.url) // é equivalente
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
        .then(function(resp){
            var pessoa = resp.data

            console.log("A mostrar registo de " + pessoa.nome + ".")

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genPessoaPage(pessoa, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url == '/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let pessoasOrdenadas = pessoas.sort(
                (p1,p2) => (p1.nome < p2.nome) ? 1 : -1
            )

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasOrdenadas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if(req.url == '/pessoas/distrSexo'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            console.log("A recuperar registo de pessoas com " + pessoas.length + " nomes para distrSexo.")

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genDistrSexo(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if(req.url.match(/\/pessoas\/sexo=\w+/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var sexo = decodeURI(req.url.substring(14))
            
            var pessoasSexo = []
            for (p of pessoas){
                console.log(p.sexo)
                if (p.sexo == sexo){
                    pessoasSexo.push(p)
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasSexo, d, `Lista de pessoas do sexo ${sexo}`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if(req.url == '/pessoas/distrDesporto'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            console.log("A recuperar registo de pessoas com " + pessoas.length + " nomes para distrDesporto.")

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genDistrDesporto(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if(req.url.match(/\/pessoas\/desporto=\w+/)){ /// COPY-PASTE -- PARA ALTERAR TUDO
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var sexo = decodeURI(req.url.substring(14))
            
            var pessoasSexo = []
            for (p of pessoas){
                console.log(p.sexo)
                if (p.sexo == sexo){
                    pessoasSexo.push(p)
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasSexo, d, `Lista de pessoas do sexo ${sexo}`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if(req.url.match("/w3.css")){
        fs.readFile('w3.css', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/css'});
            if(err){
                res.write("Erro na leitura do ficheiro " + err)
            }
            else{
                res.write(data)
            }
            res.end();
        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p>Erro: Operação não suportada...</p>")
    }

    }).listen(porta)


console.log("Servidor à escuta na porta " + porta + "...");