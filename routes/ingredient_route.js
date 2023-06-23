const express = require("express")
const router = express.Router()


const AuthServices = require('../services/auth_services');
const PaginationServices = require('../services/pagination_services');
const IngredientServices = require('../services/ingredient_services');
const IngredientController = require('../controller/ingredient_controller');


router.get("/", AuthServices.validateToken, PaginationServices.setPagination, IngredientController.getAllIngredient);

router.get("/:id", AuthServices.validateToken, IngredientServices.validId, IngredientController.getByIdIngredient)

router.get("/name/:name", AuthServices.validateToken, IngredientServices.validName, IngredientController.getByNameIngredient)

router.post("/", AuthServices.validateToken, IngredientServices.verifyAllData, IngredientController.createIngredient)

router.put("/:id", AuthServices.validateToken, IngredientServices.validId, IngredientServices.verifyAllData, IngredientController.updateIngredient)

router.delete("/:id", AuthServices.validateToken, IngredientServices.validId, IngredientController.deleteIngredient)

module.exports = router