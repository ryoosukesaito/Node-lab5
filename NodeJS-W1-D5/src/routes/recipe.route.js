const router = require("express").Router();

const {
  getRecipesPage,
  getAddRecipePage,
  postAddRecipe,
  getRecipeById,
  getEditRecipe,
  postEditRecipe,
  deleteRecipe,
} = require("../controller/recipe.controller");

router.get("/", getRecipesPage);
router.post("/save", postAddRecipe);
router.get("/create", getAddRecipePage);
router.get("/:id", getRecipeById);

router.get("/:id/edit", getEditRecipe);
router.post("/:id/edit", postEditRecipe);

router.post("/delete/:id", deleteRecipe);

module.exports = router;
