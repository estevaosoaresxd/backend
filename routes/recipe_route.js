const express = require("express")
const router = express.Router()

const AuthServices = require('../services/auth_services');
const RecipeServices = require('../services/recipe_services');
const RecipeController = require("../controller/recipe_controller")
const PaginationServices = require('../services/pagination_services');

router.get("/", AuthServices.validateToken, PaginationServices.setPagination, RecipeController.getAllRecipe)

router.get("/:id", AuthServices.validateToken, RecipeServices.validId, RecipeController.getByIdRecipe);

router.post("/", AuthServices.validateToken, RecipeServices.verifyAllData, RecipeController.createRecipe);

router.put("/:id", AuthServices.validateToken, RecipeServices.validId, RecipeServices.verifyAllData, RecipeController.updateRecipe)

router.delete("/:id", AuthServices.validateToken, RecipeServices.validId, RecipeController.deleteRecipe)

module.exports = router