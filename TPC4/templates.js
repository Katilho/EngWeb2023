// Função auxiliar para renderizar parte da página que contém o formulário para um novo utilizador.
function userForm() {
    return `
    <form class="w3-container w3-padding" method="POST">
        <fieldset class="w3-light-grey">
            <legend>Novo utilizador</legend>
            <label>ID</label>
            <input class="w3-input w3-round-large w3-grey" type="text" name="id"/>
            <label>Nome</label>
            <input class="w3-input w3-round-large w3-grey" type="text" name="nome"/>
        </fieldset>
        <br />
        <button class="w3-btn w3-round w3-deep-purple" type="submit">Registar utilizador</button>
    </form>
    `
}

// Função auxiliar para renderizar parte da página que contém o formulário para uma nova tarefa.
function taskForm(users) {
    pagHTML = `
    <form class="w3-container" method="POST">
        <fieldset class="w3-light-grey">
            <legend>Nova Tarefa</legend>
            <label>Id</label>
            <input class="w3-input w3-round w3-grey" type="text" name="id"/>
            <label>User</label>
            <select class="w3-select w3-round w3-grey" name="user">`
    for (let u of users) {
        pagHTML += `
            <option value="${u.id}">${u.nome}</option>
        `
    }
    pagHTML += `
            </select> 
            <label>Task</label>
            <input class="w3-input w3-round w3-grey" type="text" name="task"/>
        </fieldset>
        <br />
        <button class="w3-btn w3-round w3-deep-purple" type="submit">Registar tarefa</button>
    </form>
    `
    return pagHTML
}

// flag toDo, distingue o que fazer quando tem de mostrar as tarefas a fazer, e quando lhe pede para mostrar as tarefas já feitas.
function showTasks(tasks, users, toDo = false) {
    pagHTML = `
    <table class="w3-table w3-striped w3-bordered w3-centered">`
    if (toDo){
        pagHTML += `<caption class="w3-large w3-grey">To do tasks</caption>`
    }
    else{
        pagHTML += `<caption class="w3-large w3-grey">Done tasks</caption>`
    }
    pagHTML += `
        <tr class="w3-deep-purple">
            <th>Id</th>
            <th>User</th>
            <th>Task</th>`
    pagHTML += `</tr>`
    for (let t of tasks) {
        pagHTML += `
        <tr>
            <td>${t.id}</td>
            <td>${users[t.user]}</td>
            <td>${t.task}</td>`
        if (toDo) {
            pagHTML += `
            <td>
                <a class="w3-btn w3-round-medium w3-deep-purple" href="/task/done/${t.id}"><b>Done</b></a> 
                <a class="w3-btn w3-round-medium w3-deep-purple" href="/task/edit/${t.id}"><b>Edit</b></a>
            </td>
            `
        }
        pagHTML += `</tr>`
    }
    pagHTML += "</table>"
    return pagHTML
}


function showTasksTODO(listTasks, users) {
    let todoTasks = listTasks.filter(t => t.done == undefined)
    return showTasks(todoTasks, users, true)
}

function showTasksDone(listTasks, users) {
    let doneTasks = listTasks.filter(t => t.done != undefined)
    return showTasks(doneTasks, users, false)
}

// Página que permite fazer edições a uma tarefa, após ser clicado o botão de EDIT
exports.editTask = function editTask(task, users) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
        <div class="w3-card-4">
        <header class="w3-container w3-deep-purple">
            <h1>Editar Tarefa</h1>
        </header>
        <form class="w3-container" method="POST">
            <fieldset class="w3-light-grey">
                <legend>Editar Tarefa</legend>
                <label>ID</label>
                <input class="w3-input w3-round w3-grey" type="text" name="id" value="${task.id}" readonly/>
                <label>User</label>
                <select class="w3-select w3-round w3-grey" name="user">`
    for (let user of users) {
        if (user.id != task.user) {
            pagHTML += `
            <option value="${user.id}">${user.nome}</option>`
        }
    }
    pagHTML += `
            </select> 
            <label>Task</label>
                <input class="w3-input w3-round w3-grey" type="text" name="task" value="${task.task}"/>
            </fieldset>
            <br />
            <button class="w3-btn w3-round-large w3-deep-purple" type="submit">Edit Task</button>
            <a class="w3-btn w3-round-large w3-deep-purple" href="/">Voltar</a>
        </form>
        </div>
        </body>
    </html`
    return pagHTML
}

exports.genMainPage = function genMainPage(lusers, ltasks) {
    var users = {}
    for (let u of lusers) {
        users[u.id] = u.nome
    }
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
        <header class="w3-container w3-deep-purple">
            <h1>Gestor de tarefas</h1>
        </header>
        <div class="w3-container">
            <div class="w3-cell-row">
                <div class="w3-cell" style="width:50%">`
    pagHTML += taskForm(lusers)
    pagHTML += `
                </div>
                <div class="w3-cell" style="width:50%"> `
    pagHTML += userForm()
    pagHTML += `
                </div>
            </div>
            <br />
            <div class="w3-cell-row">
                <div class="w3-cell"  style="width:45%">`
    pagHTML += showTasksTODO(ltasks, users)
    pagHTML += `</div>
                <div class="w3-cell"  style="width:5%">
                </div>
                <div class="w3-cell"  style="width:45%">`
    pagHTML += showTasksDone(ltasks, users)
    pagHTML += `
                </div>
            </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.successMessage = function successMessage(msg) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
        <div>
            <header class="w3-container w3-deep-purple">
                <h1>Operação bem sucedida</h1>
            </header>
            <div class="w3-container ">
                <h3>${msg}.</h3>
                <a class="w3-btn w3-large w3-deep-purple" href="/">Voltar</a>
            </div>
        </div>
        </body>
    </html`
    return pagHTML
}