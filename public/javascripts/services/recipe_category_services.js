import authServices from "../services/auth_services.js"

let recipeCategoriesServices = {
    getAll: async function () {
        var user = authServices.getUser();

        if (user) {
            const data = {
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer: ${user.token}`, },
            }

            const response = await fetch('/recipe-category', data)

            if (response.status == 401) {
                authServices.logoff()
            }

            return await response.json()
        } else {
            authServices.logoff()
        }
    },
    create: async function (name, situation) {
        var user = authServices.getUser();

        if (user) {
            const data = {
                method: 'POST',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer: ${user.token}`, },
                body: JSON.stringify({ name: name })
            }
            const response = await fetch('/recipe-category', data)

            if (response.status == 401) {
                authServices.logoff()
            }

            return await response.json()
        } else {
            authServices.logoff()
        }
    },
    update: async function (id, name) {
        var user = authServices.getUser();

        if (user) {
            const data = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer: ${user.token}`, },
                body: JSON.stringify({ id: id, name: name, })
            }
            const response = await fetch(`/recipe-category/${id}`, data);

            if (response.status == 401) {
                authServices.logoff()
            }

            return await response.json()
        } else {
            authServices.logoff()
        }
    },
    delete: async function (id) {
        var user = authServices.getUser();

        if (user) {
            const data = {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer: ${user.token}`, },
            }

            const response = await fetch(`/recipe-category/${id}`, data);

            if (response.status == 401) {
                authServices.logoff()
            }

            return await response.json()
        } else {
            authServices.logoff()
        }
    },

}

export default recipeCategoriesServices