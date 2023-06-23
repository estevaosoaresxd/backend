const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/database")

const IngredientModel = sequelize.define('IngredientModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unity: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    { tableName: 'ingredients' }
)

module.exports = IngredientModel;
