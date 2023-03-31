const {Router} = require('express');
const router = Router();
const mealsController = require('../controllers/mealsController')
// Get all meals
router.get('/meals', mealsController.all_meals_get);
// Create meal
router.post('/meals/meal/create', mealsController.create_meal_post);
// Update
router.put('/meals/meal', mealsController.update_meal_post)
// Update only with portion
router.put('/meals/meal/update', mealsController.meal_update_portion)
// Show created meal 
router.get('/meals/meal/:meal_id', mealsController.meal_page_get)
router.get('/meals/meal/create/:meal_id', mealsController.meal_create_get)
// Exporting all the routes
module.exports = router;