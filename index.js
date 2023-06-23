const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const mainRoute = require("./routes/main_route");
const ingredientRoute = require("./routes/ingredient_route");
const recipeRoute = require("./routes/recipe_route");
const recipeCategoryRoute = require("./routes/recipe_category_route");
const installRoute = require('./routes/install_route')
const userRoute = require('./routes/user_route')


app.use("/", mainRoute)
app.use("/ingredient", ingredientRoute)
app.use("/recipe", recipeRoute)
app.use("/recipe-category", recipeCategoryRoute)
app.use("/install", installRoute)
app.use("/user", userRoute)


app.listen(process.env.PORT, () => {
    console.log("Listenning...")
})