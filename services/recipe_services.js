
const { fail } = require("../helpers/response")

const RecipeModel = require('../model/recipe_model')
const IngredientModel = require("../model/ingredient_model")


async function validId(req, res, next) {
  let id = parseInt(req.params.id);

  if (id != id || id < 1) {
    res.status(500).json(fail("Por favor digite um ID Válido."))
    return;
  }

  const recipe = await RecipeModel.findByPk(id, {
    include: [{ model: IngredientModel }]
  })

  if (recipe != null && recipe != undefined) {
    req.data = recipe;
    return next();
  }

  res.status(404).json(fail("Receita não encontrada."))
}

function verifyAllData(req, res, next) {
  const { name, categoryId, description, method } = req.body

  if (name != undefined && categoryId != undefined && description != undefined && method != undefined) {
    next();
  } else {
    res.status(500).json(fail("Por favor envie todos os dados da receita."))
  }
}

module.exports = {
  validId,
  verifyAllData
};