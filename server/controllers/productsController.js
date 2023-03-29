const {Products} = require('../models')
module.exports.add_product_post = async (req, res) => {
    try {
        const {product_id, title, calories, protein, carbs, price} = req.body;
        await Products.create({
            product_id: product_id, title: title, calories: calories, protein: protein, carbs: carbs, price: price
        })
        res.status(201).json('Product added successfuly')
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
module.exports.all_products_get = async (req, res) => {
    try {
        const all_products = await Products.findAll();
        res.status(200).json(all_products)
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}