import json

def ordCidade(cidade):
    return cidade['nome']


### Criação das estruturas auxiliares.

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)

cidadeID = {}
cidadeNameToID = {}
for c in cidades:
    cidadeID[c['id']] = c['nome']
    cidadeNameToID[c['nome']] = c['id']

ligacoes = mapa['ligações']

ligacaoFinal = {}
for lig in ligacoes:
    origem = lig['origem']
    destino = lig['destino']
    distancia = lig['distância']

    tuple = (destino,distancia)
    
    if origem not in ligacaoFinal:
        lista = [tuple]
        ligacaoFinal[origem] = lista
    
    else:
        lista = ligacaoFinal[origem]
        lista.append(tuple)

distr_dict = {} # dicionario com o formato {'distrito': [cidades do distrito]}
for c in cidades:
    distrito = c['distrito']
    nome = c['nome']
    if distrito in distr_dict:
        distr_dict[distrito].append(nome)
    else:
        distr_dict[distrito] = [nome]
distr_dict = dict(sorted(distr_dict.items()))



### Criação do index.html
pagHTML = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mapa virtual</title>
</head>
<body>
    <h1>Mapa virtual</h1>'''

for distrito in distr_dict:
    pagHTML += f'''
    <b>{distrito}</b>
    <ul>'''
    for cidade in distr_dict[distrito]:
        idCidade = cidadeNameToID[cidade]
        pagHTML += f'''
        <li><a href="http://localhost:7777/{idCidade}">{cidade}</a></li>'''
    pagHTML += '    </ul>'

pagHTML += '''
</body>
</html>
'''

#print(pagHTML)
filename = "pages/index.html"
file = open(filename, 'w')
file.write(pagHTML)
file.close()



### Criação das páginas
# c -> "id": "c1","nome": "Macedo de Cavaleiros","população": 34513,"descrição":"blabla" "distrito": "Bragança"
for c in cidades:
    pagHTML = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>{c["nome"]}</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>{c["nome"]}</h2>
        <p><b>Distrito:</b> {c["distrito"]}</p>
        <p><b>População:</b> {c["população"]}</p>
        <p><b>Descrição:</b> {c["descrição"]}</p>
        """ 
    
    if c['id'] in ligacaoFinal:
        pagHTML += f"""
                <h4>Ligações da cidade de {c['nome']}: </h4>
                <ul>
        """

        for destino in ligacaoFinal[c['id']]:
            id_destino = destino[0]
            distancia = destino[1]
            ### MUDAR AQUI O HREF PARA http://localhost:7777/{id_destino}
            pagHTML += f"""<li><b>Destino:</b> <a href="http://localhost:7777/{id_destino}">{cidadeID[id_destino]}</a> <b>Distância:</b> {distancia}</li>
            """

    pagHTML += f"""
            </ul>
            <a href="http://localhost:7777/">Voltar ao índice</a>
    </body>
    </html>
    """

    #print(pagHTML)
    filename = f"pages/{c['id']}.html"
    file = open(filename, 'w')
    file.write(pagHTML)
    file.close()