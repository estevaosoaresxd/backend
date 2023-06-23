const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/database")

const IngredientModel = require('./ingredient_model')

const RecipeModel = sequelize.define('RecipeModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    { tableName: 'recipes' }
);

RecipeModel.hasMany(IngredientModel, { foreignKey: "recipeId" })

module.exports = RecipeModel
