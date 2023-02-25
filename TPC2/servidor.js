var http = require('http');
var fs = require('fs')
var url = require('url');

var port = 7777
http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0,16) // Obtenção da data.
    console.log(req.method + " " + req.url + " " + d)
    var pedido = url.parse(req.url, true).pathname
    pedido = pedido.substring(1)
    // console.log(pedido)
    if (pedido == ""){
        pedido = "index"
    }
    fs.readFile("pages/" + pedido + ".html", function(err, data){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        if(err){
            console.log(`${new Date().toISOString().substring(0,16)} Error opening requested file.`)
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.write('<h1 align="center">500 Error reading rquested file.</h1>');
        }
        else{
            res.write(data)
        }
        res.end()
    })
}).listen(port)

console.log(`Servidor à escuta na porta ${port}...`);
