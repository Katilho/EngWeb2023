import json

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")

mapa = json.load(f)
cidades = mapa["cidades"]
cidades.sort(key=ordCidade)

pagHTML = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Mapa Virtual</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Mapa Virtual</h1>
    <table>
        <tr>
            <!--Coluna do índice-->
            <td>
                <h3>Índice</h3>
                <ol>
'''

for c in cidades:
    pagHTML += f'<li><a href="#{c["id"]}">{c["nome"]}</a></li>'

pagHTML += '''
</ol>
            </td>
            <!--Coluna do conteúdo-->
            <td>
                <h3>Nome da cidade</h3>
                <p><b>Distrito:</b> distrito</p>
                <p><b>População</b> população</p>
                p><b>Descrição</b> descrição</p>
                <center>
                    <hr width="80%">
                </center>
            </td>
        </tr>
    </table>
</body>
</html>
'''

print(pagHTML)