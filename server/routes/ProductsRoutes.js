const { Router } = require("express");
const router = Router();
const productsController = require("../controllers/productsController");
const { check_authorization, validateToken } = require("../auth/JWT");
// Add product
// Only admin can add products and categories
router.post(
  "/products/add",
  validateToken,
  check_authorization,
  productsController.add_product_post
);
// Get all products
router.get("/products", validateToken, productsController.all_products_get);
// Add food category
router.post(
  "/categories/add",
  validateToken,
  check_authorization,
  productsController.add_category_post
);
// Get all categories
router.get("/categories/all", validateToken, productsController.categories_get);
// Get all products by a category
router.get(
  "/products/:food_category_id",
  validateToken,
  productsController.products_by_category_get
);
// Get all products by query
router.get(
  "/products/search/:query",
  validateToken,
  productsController.products_by_search
);
// Exporting all the routes
module.exports = router;
