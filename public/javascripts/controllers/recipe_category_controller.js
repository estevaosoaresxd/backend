import recipeCategoriesServices from "../services/recipe_category_services.js"

async function refreshAll() {
  let respCategories = await recipeCategoriesServices.getAll();

  if (respCategories && respCategories.status == true) {
    setCategories(respCategories.data);
  }

}

async function setCategories(items) {
  let ul = document.querySelector("#categories");
  ul.innerHTML = "";

  items.forEach((item) => {
    let li = document.createElement("li")
    let label = document.createElement("label")
    let button = document.createElement("button")
    button.className = "btn btn-link text-danger text-decoration-none"
    button.innerText = "Excluir";

    button.addEventListener("click", async function () {
      if (confirm(`Deseja excluir a categoria: ${item.name}?`) == true) {
        await recipeCategoriesServices.delete(item.id);

        refreshAll();
      }
    })

    label.innerText = `${item.name} - `;

    li.appendChild(label)
    li.appendChild(button)
    ul.appendChild(li)
  })
}

async function createCategory() {
  let name = document.querySelector("#name")

  await recipeCategoriesServices.create(name.value).then((e) => {
    if (e.status == true) {
      refreshAll();
      name.value = '';
    } else {
      setError(e.message)
    }
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

  document.querySelector("form").addEventListener("submit", async function (evt) {
    evt.preventDefault();
    createCategory();
  })
})