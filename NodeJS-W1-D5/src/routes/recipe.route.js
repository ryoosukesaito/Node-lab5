const express = require('express');

const {getRecipesPage, getAddRecipePage, postAddRecipe, getRecipeById, getEditRecipe } = require('../controller/recipe.controller')

const router = express.Router();

router.get('/', getRecipesPage) 
router.post('/save', postAddRecipe)
router.get('/create', getAddRecipePage)
router.get('/:id', getRecipeById)

router.get('/:id/edit', getEditRecipe)
router.post('/:id/edit',)

router.delete('/delete')

module.exports = router;