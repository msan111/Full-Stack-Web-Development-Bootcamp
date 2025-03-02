import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/recipes");
    const result = response.data;
    res.render("index.ejs", {
       data: result,
       recipe: null,
       selectedCuisine: null,
       selectedDifficulty: null,
       error: null
       });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      data: null,
      recipe: null,
      selectedCuisine: null,
      selectedDifficulty: null,
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const cuisine = req.body.cuisine;
    const difficulty = req.body.difficulty;

    const response = await axios.get("https://dummyjson.com/recipes");
    const result = response.data.recipes;
    console.log(result);

    let filteredRecipes = result;

    if (cuisine) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine === cuisine);
    }
    if (difficulty) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
    }
    let randomRecipe = null;
        if (filteredRecipes.length > 0) {
            randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
        } else {
            throw new Error("No recipe that matches your criteria");
        }

    res.render("index.ejs", {
      data: result, 
      recipe: randomRecipe, 
      selectedCuisine: cuisine,
      selectedDifficulty: difficulty,
      error: null
    });

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      data: null,
      recipe: null,
      selectedCuisine: req.body.cuisine,
      selectedDifficulty: req.body.difficulty,
      error: "No receipe that matches your criteria",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
