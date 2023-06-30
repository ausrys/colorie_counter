const { Router } = require("express");
const router = Router();
const productsController = require("../controllers/productsController");
// Add product
router.post("/products/add", productsController.add_product_post);
// Get all products
router.get("/products", productsController.all_products_get);
// Add food category
router.post("/categories/add", productsController.add_category_post);
// Get all categories
router.get("/categories/all", productsController.categories_get);
// Get all products by a category
router.get(
  "/products/:food_category_id",
  productsController.products_by_category_get
);
// Get all products by query
router.get("/products/search/:query", productsController.products_by_search);
// Exporting all the routes
module.exports = router;
