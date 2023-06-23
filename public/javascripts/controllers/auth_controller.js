import authServices from "../services/auth_services.js"
import routerServices from "../services/router_services.js"


function setError(message) {
    var div = document.querySelector("#error");
    div.innerHTML = "";
    div.removeAttribute("hidden");

    let label = document.createElement("label")
    label.innerText = message;
    label.className = 'error';

    div.appendChild(label);
}

function resetError() {
    var div = document.querySelector("#error");
    div.setAttribute("hidden", true);
    div.innerHTML = "";
}


async function createTask() {
    let username = document.querySelector("#username")
    let password = document.querySelector("#password")

    await authServices.auth(username.value, password.value).then((e) => {
        if (e.status == true) {
            authServices.setUser(e.data);
            routerServices.goToHome();
            resetError();
        } else {
            password.value = '';
            setError(e.message)
        }
    }).catch(e => setError(e))

}


window.addEventListener("load", function () {
    document.querySelector("form").addEventListener("submit", async function (evt) {
        evt.preventDefault();
        createTask();
    })
})