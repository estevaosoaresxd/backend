const { Op } = require("sequelize")

const IngredientModel = require("../model/ingredient_model")

const { sucess, fail } = require("../helpers/response")


async function createIngredient(req, res) {
    try {
        var { name, recipeId, quantity, unity } = req.body

        quantity = parseInt(quantity)

        if (!unity) {
            unity = "UN";
        }

        if (!quantity) {
            quantity = 0;
        }

        const ingredient = await IngredientModel.create({ name, quantity, unity, recipeId });

        res.status(201).json(sucess(ingredient));
    } catch (error) {
        res.status(500).json(fail('Erro ao criar ingrediente'));
    }
}


async function getAllIngredient(req, res) {
    var limit = req.limit;
    var page = req.page;

    try {
        const ingredients = await IngredientModel.findAndCountAll({
            limit: limit,
            offset: page * limit
        });

        res.json(sucess(ingredients.rows))
    } catch (error) {
        res.status(500).json(fail('Erro ao obter ingredientes'));
    }
}

async function getByIdIngredient(req, res) {
    try {
        const ingredient = req.data;

        res.json(sucess(ingredient))
    } catch (error) {
        res.status(500).json(fail("Não foi possível localizar o ingrediente."));
    }
}


async function getByNameIngredient(req, res) {
    try {
        const ingredient = req.data

        res.json(sucess(ingredient))
    } catch (error) {
        res.status(500).json(fail("Não foi possível localizar o ingrediente."));
    }
}


async function updateIngredient(req, res) {
    const { name, recipeId, quantity, unity } = req.body

    quantity = parseInt(quantity);

    try {
        const ingrediente = req.data;

        await ingrediente.update({ name, quantity, unity, recipeId });

        res.json({ ingrediente });
    } catch (error) {
        res.status(500).json(fail('Erro ao atualizar ingrediente'));
    }

}

async function deleteIngredient(req, res) {
    try {
        const ingrediente = req.data;

        await ingrediente.destroy();

        res.json(sucess(ingrediente));
    } catch (error) {
        res.status(500).json(fail('Erro ao excluir ingrediente'));
    }

}

module.exports = {
    createIngredient,
    getAllIngredient,
    getByIdIngredient,
    getByNameIngredient,
    updateIngredient,
    deleteIngredient
}