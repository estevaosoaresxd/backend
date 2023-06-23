import authServices from "../services/auth_services.js"


let routerServices = {
  goToHome: async function () {
    if (authServices.isAuth) {
      window.location.href = '/home';
    } else {
      authServices.logoff();
    }
  },
  goToRecipes: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-recipes';
    } else {
      authServices.logoff()
    }
  },
  goToIngredients: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-ingredients';
    } else {
      authServices.logoff()
    }
  },
  goToCategories: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-recipe-category';
    } else {
      authServices.logoff()
    }
  },
}

export default routerServices