import authServices from "../services/auth_services.js"
import ingredientsServices from "../services/ingredients_services.js"
import recipesServices from "../services/recipe_services.js"
import recipeCategoriesServices from "../services/recipe_category_services.js"


async function refreshAll() {
    let respIngredients = await ingredientsServices.getAll();

    if (respIngredients && respIngredients.status == true) {
        setIngredients(respIngredients.data);
    }

    let respCategories = await recipeCategoriesServices.getAll();

    if (respCategories && respCategories.status == true) {
        setCategories(respCategories.data);
    }

    let respRecipes = await recipesServices.getAll();

    if (respRecipes && respRecipes.status == true) {
        // setRecipes(respRecipes.data);
    }

}

async function setRecipes(items) {
    let ul = document.querySelector("#recipes");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let p = document.createElement("p")
        let button = document.createElement("p")
        button.className = "btn btn-primary btn-sm";

        button.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        li.innerText = item.name;

        li.appendChild(label)

        ul.appendChild(li)
    })
}

async function setIngredients(items) {
    let ul = document.querySelector("#ingredients");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let label = document.createElement("label")

        li.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        label.innerText = item.name;

        li.appendChild(label)

        ul.appendChild(li)
    })
}

async function setCategories(items) {
    let ul = document.querySelector("#categories");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let label = document.createElement("label")

        li.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        label.innerText = item.name;

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

window.addEventListener("load", function () {
    refreshAll();

    // document.querySelector("form").addEventListener("submit", async function (evt) {
    //     evt.preventDefault();
    //     createTask();
    // })
})