const { Router } = require("express");
const router = Router();
const mealsController = require("../controllers/mealsController");
const { validateToken } = require("../auth/JWT");
// Get all meals
router.get("/meals", validateToken, mealsController.all_meals_get);
// Create meal
router.post(
  "/meals/meal/create",
  validateToken,
  mealsController.create_meal_post
);
// Show created meal
router.get(
  "/meals/meal/:meal_id",
  validateToken,
  mealsController.meal_page_get
);
router.get(
  "/meals/meal/create/:meal_id",
  validateToken,
  mealsController.meal_create_get
);
// Exporting all the routes
module.exports = router;
