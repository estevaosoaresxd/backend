import taskService from "./taskservice.js"

async function refreshTasks() {
    let resp = await taskService.getAll()

    if (resp.status) {
        resetError();
        setTaskWaiting(resp.data.filter((e) => e.situation == 'waiting'));
        setTaskProgress(resp.data.filter((e) => e.situation == 'inprogress'));
        setTaskDone(resp.data.filter((e) => e.situation == 'done'));
    }
}

async function setTaskWaiting(items) {
    let ul = document.querySelector("#waiting");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let edit = document.createElement("label")
        let label = document.createElement("label")

        edit.addEventListener("click", async function () {
            await taskService.update(item.id, item.name, 'inprogress').then((e) => {
                if (e.status == true) {
                    refreshTasks();
                } else {
                    setError(e.message)
                }
            });
        })

        li.addEventListener("click", function () {
            li.style.backgroundColor = getRandomColor();
        })

        edit.className = "button-send"
        edit.innerText = "Iniciar"

        label.innerText = item.name + " ";

        li.appendChild(label)
        li.appendChild(edit)

        ul.appendChild(li)
    })
}

async function setTaskProgress(items) {
    let ul = document.querySelector("#inprogress");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let edit = document.createElement("label")
        let label = document.createElement("label")

        edit.addEventListener("click", async function () {
            await taskService.update(item.id, item.name, 'done').then((e) => {
                if (e.status == true) {
                    refreshTasks()
                } else {
                    setError(e.message)
                }
            });;
        })

        li.addEventListener("click", function () {
            li.style.backgroundColor = getRandomColor();
        })

        edit.className = "button-send"
        edit.innerText = "Concluir"

        label.innerText = item.name + " ";

        li.appendChild(label)
        li.appendChild(edit)
        ul.appendChild(li)
    })
}

async function setTaskDone(items) {
    let ul = document.querySelector("#done");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        li.className = 'text-done';

        let label = document.createElement("label")
        label.innerText = item.name + " ";

        li.appendChild(label)
        ul.appendChild(li)
    })
}

function setError(message) {
    var div = document.querySelector("#error");
    div.innerHTML = "";

    let label = document.createElement("label")
    label.innerText = message;
    label.className = 'error';

    console.log(label);

    div.appendChild(label);
}

function resetError() {
    var div = document.querySelector("#error");
    div.innerHTML = "";
}

async function createTask() {
    let name = document.querySelector("#name")
    let situation = document.querySelector("#situation")

    await taskService.create(name.value, situation.value).then((e) => {
        if (e.status == true) {
            refreshTasks()
            name.value = '';
            situation.value = situation.options[0].value;
        } else {
            setError(e.message)
        }
    })

}

function getRandomColor() {
    var arr = ['green', 'red', 'yellow', 'purple', 'brown', 'grey', 'pink', 'orange', 'aqua', 'darkgoldenrod'];
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

window.addEventListener("load", function () {
    refreshTasks()

    document.querySelector("form").addEventListener("submit", async function (evt) {
        evt.preventDefault();
        createTask();
    })
})