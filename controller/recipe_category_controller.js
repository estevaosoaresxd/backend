const RecipeModel = require('../model/recipe_model')
const IngredientModel = require("../model/ingredient_model")
const RecipeCategoryModel = require("../model/recipe_category_model")

const { sucess, fail } = require("../helpers/response")


async function createCategory(req, res) {
    try {
        const { name } = req.body

        const category = await RecipeCategoryModel.create({
            name: name,
        });

        res.status(201).json(sucess(category));
    } catch (error) {
        res.status(500).json(fail('Erro ao criar a categoria.'));
    }
}


async function getAllCategory(req, res) {
    var limit = req.limit;
    var page = req.page;

    try {
        const categories = await RecipeCategoryModel.findAndCountAll({
            include: [{ model: RecipeModel, include: [{ model: IngredientModel }] }],
            limit: req.limit,
            offset: page * limit
        })

        res.json(sucess(categories.rows))
    } catch (error) {
        res.status(500).json(fail('Erro ao obter as categorias'));
    }
}

async function getByIdCategory(req, res) {
    try {
        const category = req.data;

        res.json(sucess(category))
    } catch (error) {
        res.status(500).json(fail("Não foi possível localizar o ingrediente."));
    }
}

async function getByNameCategory(req, res) {
    try {
        const category = req.data;

        res.json(sucess(category))
    } catch (error) {
        res.status(500).json(fail("Não foi possível localizar a categoria."));
    }
}


async function updateCategory(req, res) {
    const { name } = req.body

    try {
        const category = req.data;

        await category.update({ name });

        res.json(sucess(category));
    } catch (error) {
        res.status(500).json(fail('Erro ao atualizar a categoria.'));
    }

}

async function deleteCategory(req, res) {
    try {
        const category = req.data;

        await category.destroy();

        res.json(sucess(category));
    } catch (error) {
        res.status(500).json(fail('Erro ao excluir a categoria'));
    }

}

module.exports = {
    createCategory,
    getAllCategory,
    getByIdCategory,
    getByNameCategory,
    updateCategory,
    deleteCategory
}