const { Op } = require("sequelize")

const { sucess, fail } = require("../helpers/response")

const RecipeModel = require('../model/recipe_model')
const IngredientModel = require("../model/ingredient_model")


async function createRecipe(req, res) {
    try {
        var allIngredients = [];

        const { name, categoryId, description, method, ingredients } = req.body

        if (Array.isArray(ingredients) && ingredients != []) {
            ingredients.forEach((e) => allIngredients.push(e))
        }

        const recipe = await RecipeModel.create({
            name: name,
            description: description,
            method: method,
            categoryId: categoryId
        });

        if (allIngredients != []) {
            allIngredients.forEach(async (ingredient) => {
                var { name, quantity, unity } = ingredient;

                quantity = parseInt(quantity)

                if (!unity) {
                    unity = "UN";
                }

                if (!quantity) {
                    quantity = 0;
                }

                if (name.length > 1) {
                    var ingredient = await IngredientModel.create({ name, quantity, unity, recipeId: recipe.id });
                }
            })
        }

        res.status(201).json(sucess({ recipe, allIngredients }));
    } catch (error) {
        res.status(500).json(fail('Erro ao criar a receita.'));
    }
}


async function getAllRecipe(req, res) {
    var limit = req.limit;
    var page = req.page;
    var filterByCategoryId = req.query.filterByCategoryId;

    try {
        if (filterByCategoryId) {
            filterByCategoryId = parseInt(filterByCategoryId);
        }

        const recipes = filterByCategoryId ? await RecipeModel.findAndCountAll({
            where: {
                categoryId: filterByCategoryId
            },
            include: [{ model: IngredientModel }],
            limit: limit,
            offset: page * limit,
        }) : await RecipeModel.findAndCountAll({
            include: [{ model: IngredientModel }],
            limit: limit,
            offset: page * limit,
        })

        res.json(sucess(recipes.rows))
    } catch (error) {
        res.status(500).json(fail('Erro ao obter as receitas'));
    }
}

async function getByIdRecipe(req, res) {
    try {
        const recipe = req.data;

        res.json(sucess(recipe))
    } catch (error) {
        res.status(500).json(fail("Não foi possível localizar o ingrediente."));
    }
}


async function updateRecipe(req, res) {
    const { name, categoryId, description, method } = req.body

    try {
        const recipe = req.data;

        await recipe.update({ name, categoryId, description, method });

        res.json(sucess(recipe));
    } catch (error) {
        res.status(500).json(fail('Erro ao atualizar a receita.'));
    }

}

async function deleteRecipe(req, res) {
    try {
        const recipe = req.data;

        await recipe.destroy();

        res.json(sucess(recipe));
    } catch (error) {
        res.status(500).json(fail('Erro ao excluir a receita'));
    }

}

module.exports = {
    createRecipe,
    getAllRecipe,
    getByIdRecipe,
    updateRecipe,
    deleteRecipe
}
// router.get("/", async (req, res) => {
//     const categorys = await RecipeModel.RecipeModel.findAll({
//         include: [{ model: IngredientModel }]
//     })

//     res.json(categorys)
// })

// router.get("/:id", async (req, res) => {
//     const { id } = req.params
//     const categorys = await RecipeModel.RecipeModel.findByPk(id, {
//         include: [{ model: IngredientModel }]
//     })

//     res.json(categorys)
// })

// router.post("/", async (req, res) => {
//     const { name, categoryId, description, method } = req.body

//     const recipe = await RecipeModel.RecipeModel.create({
//         name: name,
//         description: description,
//         method: method,
//         categoryId: categoryId
//     });

//     res.status(201).json(recipe);
// })

// //###################################################################################################

// router.put("/:id", RecipeServices.validId, RecipeServices.verifyAllData, async (req, res) => {
//     const { id } = req.params
//     const { name, categoryId, ingredientIds, description, method } = req.body

//     let [result] = await RecipeModel.update(id, name, categoryId, ingredientIds, description, method);
//     if (result)
//         res.json(sucess(result))
//     else
//         res.status(500).json(fail("Falha ao alterar a receita."))
// })

// router.delete("/:id", RecipeServices.validId, async (req, res) => {
//     const { id } = req.params

//     let result = await RecipeModel.delete(id)
//     if (result)
//         res.json(sucess(result))
//     else
//         res.status(500).json(fail("Receita não encontrada"))
// })
