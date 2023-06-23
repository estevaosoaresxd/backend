const express = require("express")
const router = express.Router()

const RecipeCategoryServices = require('../services/recipe_category_services');
const RecipeCategoryController = require('../controller/recipe_category_controller');
const PaginationServices = require('../services/pagination_services');

const AuthServices = require('../services/auth_services');

module.exports = router

router.get("/", AuthServices.validateToken, PaginationServices.setPagination, RecipeCategoryController.getAllCategory);

router.get("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, RecipeCategoryController.getByIdCategory)

router.get("/name/:name", AuthServices.validateToken, RecipeCategoryServices.validName, RecipeCategoryController.getByNameCategory)

router.post("/", AuthServices.validateToken, RecipeCategoryServices.verifyAllData, RecipeCategoryController.createCategory)

router.put("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, RecipeCategoryServices.verifyAllData, RecipeCategoryController.updateCategory)

router.delete("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, RecipeCategoryController.deleteCategory)

module.exports = router