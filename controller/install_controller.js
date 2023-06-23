const sequelize = require("../helpers/database")

const UserModel = require('../model/user_model')
const RecipeCategoryModel = require('../model/recipe_category_model')
const RecipeModel = require('../model/recipe_model')
const IngredientModel = require('../model/ingredient_model')

const { sucess, fail } = require("../helpers/response")

async function install(req, res) {
    try {
        await sequelize.sync({ force: true })


        // CREATE USER ADMIN
        const user = await UserModel.create({
            username: 'admin',
            password: 'admin',
            isAdmin: true
        })

        // CREATE FIVE CATEGORIES
        var categories = ['Massas', 'Lanches', 'Carnes', 'Saladas', 'Sobremesas'];

        for (var i = 0; i < categories.length; i++) {
            await RecipeCategoryModel.create({
                name: categories[i],
            });
        }

        //  // CREATE FIVE RECIPES WITH INGREDIENTS
        var ingredients = [{
            name: "Misto Quente",
            method: "1. Passe a margarina em ambas as fatias de pão, recheie com presunto e queijo. 2. Se quiser, use o tostex ou sanduicheira. 3. Coloque no forno, em uma assadeira, até que o queijo esteja derretido.",
            description: "A receita de Misto quente que é uma delícia e simples de ser feita",
            categoryId: 2,
            ingredients: [{ name: "Pão de forma", quantity: 2, unity: "UN" }, { name: "Queijo Prato", quantity: 2, unity: "UN" }, { name: "Presunto Magro", quantity: 2, unity: "UN" }]
        }, {
            name: "Macarrão",
            method: "1 Em uma panela, coloque aproximadamente 2 litros e meio de água para cozinhar o macarrão e acrescente sal a gosto. Deixe ferver. 2 Adicione meio pacote do macarrão de sua preferência e cozinhe até ficar al dente. Escorra e reserve. 3 Em seguida, adicione 4 colheres de sopa de óleo e meia cebola em cubos em uma panela. Refogue. 4 Acrescente meia xícara do molho de sua preferência e deixe ferver. 5 Depois, transfira o macarrão para a panela e misture. Sirva em seguida.",
            description: "Fácil de fazer, rápido e econômico: o macarrão simples ",
            categoryId: 1,
            ingredients: [{ name: "Macarrão", quantity: 500, unity: "G" }, { name: "Água", quantity: 2, unity: "L" }, { name: "Sal", quantity: 10, unity: "G" }, { name: "Óleo", quantity: 30, unity: "ML" }]
        }, {
            name: "Carne Frita",
            method: "1 Corte a carne em cubos bem pequenos. 2 Tempere com o sal, o alho, o vinagre e a pimenta. 3 Coloque o azeite na panela e deixe aquecer. 4 Despeje a carne na panela. 5 Deixe secar a água e deixe fritar. 6 Quanto estiver quase frita, adicione a cebola cortada em rodelas.",
            description: "A receita de Fraldinha é uma delicia.",
            categoryId: 3,
            ingredients: [{ name: "Fraldinha", quantity: 500, unity: "G" }, { name: "Azeite", quantity: 10, unity: "ML" }, { name: "Cebola", quantity: 1, unity: "UN" }]
        }, {
            name: "Salada Americada",
            method: "Lave bem todos os ingredientes. 2 Rasgue as folhas do alface para que fiquem menores. Rale as cenouras e a beterraba. O tomate, após estar sem pele e semente, deve ser picado. A cebola pode ser cortada em pedacinhos ou em rodelas, como preferir. Junte tudo. 3 Molho: Junte o açúcar, sal, azeite e vinagre em uma xícara. 4 Misture bem com uma colher e despeje sobre a salada.",
            description: "A receita de Salada é simples e é um bom jeito de servir as pessoas",
            categoryId: 4,
            ingredients: [{ name: "Alface", quantity: 1, unity: "UN" }, { name: "Beterraba", quantity: 1, unity: "UN" }, { name: "Cenoura", quantity: 2, unity: "UN" }, { name: "Tomate", quantity: 1, unity: "UN" }]
        }, {
            name: "Brigadeiro",
            method: "1.  Em uma panela, coloque o Leite MOÇA com o Chocolate em Pó DOIS FRADES e a manteiga. 2.  Misture bem e leve ao fogo baixo, mexendo sempre até desprender do fundo da panela (cerca de 10 minutos). 3.  Retire do fogo, passe para um prato untado com manteiga e deixe esfriar. 4.  Com as mãos untadas, enrole em bolinhas e passe-as no granulado. Sirva em forminhas de papel.",
            description: "Receita de Brigadeiro tradicional, feito com Leite Condensado MOÇA e Chocolate em Pó DOIS FRADES, coberto com chocolate granulado",
            categoryId: 5,
            ingredients: [{ name: "Leite Moça", quantity: 1, unity: "UN" }, { name: "Manteiga", quantity: 60, unity: "G" }, { name: "Chocolate em Pó", quantity: 200, unity: "G" }, { name: "Granulado", quantity: 80, unity: "G" }]
        }];

        for (var i = 0; i < ingredients.length; i++) {
            createRecipe(ingredients[i])
        }


        res.json(sucess({ user, categories, ingredients }))
    } catch (error) {
        res.status(500).json(fail('Erro na instalação'));
    }
}

async function createRecipe(obj) {
    var allIngredients = [];

    const { name, categoryId, description, method, ingredients } = obj;

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

}


module.exports = {
    install
}