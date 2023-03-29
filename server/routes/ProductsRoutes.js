const {Router} = require('express');
const router = Router();
const productsController = require('../controllers/productsController')
// Add product
router.post('/products/add', productsController.add_product_post);
// Get all products
router.get('/products', productsController.all_products_get);
// Exporting all the routes
module.exports = router;