
const { fail } = require("../helpers/response")

const { Op } = require("sequelize")

const RecipeCategoryModel = require('../model/recipe_category_model')
const RecipeModel = require('../model/recipe_model')
const IngredientModel = require("../model/ingredient_model")

async function validId(req, res, next) {
  let id = parseInt(req.params.id);

  if (id != id || id < 1) {
    res.status(500).json(fail("Por favor digite um ID Válido."))
    return;
  }

  const category = await RecipeCategoryModel.findByPk(id, { include: [{ model: RecipeModel, include: [{ model: IngredientModel }] }] })

  if (category != null && category != undefined) {
    req.data = category;
    return next();
  }

  res.status(404).json(fail("Categoria não encontrada."))
}

function verifyAllData(req, res, next) {
  const { name } = req.body

  if (name != undefined) {
    next();
  } else {
    res.status(500).json(fail("Por favor envie todos os dados da categoria."))
  }
}

async function validName(req, res, next) {
  let name = req.params.name;

  if (!name) {
    res.status(500).json(fail("Por favor digite um nome de categória válida."))
    return;
  }

  const category = await RecipeCategoryModel.findOne({
    where: {
      name: {
        [Op.like]: '%' + name + '%'
      }
    }
  })

  if (category) {
    req.data = category;
    return next();
  }

  res.status(404).json(fail('Categoria não encontrada.'));
}


module.exports = {
  validId,
  validName,
  verifyAllData
};