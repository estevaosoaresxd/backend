const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/database")
const RecipeModel = require('./recipe_model')

const RecipeCategoryModel = sequelize.define('RecipeCategoryModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: 'recipe_categories' }
);

RecipeCategoryModel.hasMany(RecipeModel, { foreignKey: "categoryId" })

module.exports = RecipeCategoryModel;
