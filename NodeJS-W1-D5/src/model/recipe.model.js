const fs = require("fs");
const path = require("path");

const recipes = require("../data/recipes.json");

const rootDir = require("../utils/path-helper");
const dataPath = path.join(rootDir, "data", "recipes.json");

module.exports = class Recipe {
  constructor(name, ingredient, instruction) {
    this.id = recipes.length + 1;
    this.name = name;
    this.ingredient = ingredient;
    this.instruction = instruction;
  }

  save(callback) {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        callback({ message: "Could not read recipe.json", status: 500 });
      }

      //Parse the JSON file
      const recipes = JSON.parse(data);
      recipes.push(this);

      //Write the new data to JSON file
      fs.writeFile(
        dataPath,
        JSON.stringify(recipes, null, 2),
        "utf8",
        (err) => {
          if (err) {
            callback({
              message: "Could not write to recipe.json",
              status: 500,
            });
          }
          callback({ message: "Recipe saved successfully", status: 200 });
        }
      );
    });
  }

  static fetchAllRecipes(callback) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        callback({ message: "Could not read recipe.json", status: 500 });
      }
      callback(JSON.parse(data));
    });
  }

  static findById(id) {
    const recipes = JSON.parse(fs.readFileSync(dataPath));
    const found = recipes.some((recipe) => recipe.id === parseInt(id));

    if (!found) {
      return { message: "Recipe not found", status: 404 };
    }

    return recipes.find((recipe) => recipe.id === parseInt(id));
  }

  static updateRecipeById(recipeToUpdate, callback) {
    const recipes = JSON.parse(fs.readFileSync(dataPath));
    const found = recipes.some((recipe) => recipe.id === recipeToUpdate.id);

    if (found) {
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === recipeToUpdate.id) {
          return recipeToUpdate;
        }
        return recipe;
      });

      fs.writeFileSync(dataPath, JSON.stringify(updatedRecipes, null, 2));
      callback({
        status: 200,
        message: "Recipe updated",
      });
    } else {
      callback({
        status: 404,
        message: "Recipe not found",
      });
    }
  }

  static deleteRecipeById(id, callback) {
    const recipes = JSON.parse(fs.readFileSync(dataPath));
    const found = recipes.some((recipe) => recipe.id === +id);

    if (found) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== +id);
      fs.writeFileSync(dataPath, JSON.stringify(updatedRecipes, null, 2));
      callback({
        status: 200,
        message: "Deleted recipe",
      });
    } else {
      callback({ 
        status: 404,
        message: "Recipe cannot be deleted" 
        });
    }
  }
};
