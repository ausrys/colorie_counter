const {Meals, MealProducts, Products, sequelize} = require('../models')
const { Op} = require('sequelize')
// Create a meal
module.exports.create_meal_post = async (req, res) => {
    const {MealProducts, title, isPortioned, ...rest} = req.body;
    const newArray = MealProducts.map((obj) => {
        return {}
    })
    try {
        const result = await sequelize.transaction(async (t) => {
            const meal = await Meals.create(...rest, {transaction: t});
            const meal_id = meal.meal_id;
            await MealProducts.bulkcreate([MealProducts], {transaction: t})
            return meal
        })
        res.status(201).send(result)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
    // try {
    //     const Meal = await Meals.create({title: title});
    //     res.status(201).json(Meal.dataValues);
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json('Error')
    // }
}
// Post a meal with products
module.exports.create_meal_with_prods_post = async (req, res) => {
    const meals = req.body;
    const newArray = meals[0].map((obj) => {
        const {title, ...rest} = obj;
        return {...rest, meal_id: Number(meals[1])}
    })
    
    try {
        const result = await MealProducts.bulkCreate(newArray);
        res.status(201);
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
// Post a meal info
module.exports.update_meal_post = async (req, res) => {
    const {meal_id, ...rest} = req.body;
    try {
        const result = await Meals.update({...rest}, {where: {meal_id : meal_id}});
        res.status(201);
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
// Get all meals
module.exports.all_meals_get = async (req, res) => {
    try {
        // Get meals from the newest
        const all_meals = await Meals.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(all_meals)
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
// Get a meal
module.exports.meal_page_get = async (req, res) => {
    const {meal_id} = req.params;
    if(!meal_id) return res.status(400).json("Meal doesn't exist")
    try {
        const meal = await Meals.findAll(
            {
            where: {meal_id : meal_id},
            attributes: {exclude: ['meal_id', 'updatedAt']},
            include: [
                {
                    model: Products,
                    attributes: ['title',  'product_id'],
                    through: {
                        attributes: ['calories', 'protein', 'carbs', 'price', 'weight']
                    }
                }
            ]
        });
        res.status(200).json(meal[0])
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
module.exports.meal_create_get = async (req, res) => {
    const {meal_id} = req.params;
    if(!meal_id) return res.status(400).json("Meal doesn't exist")
    try {
        const meal = await Meals.findByPk(meal_id);
        res.status(200).json(meal)
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
}
module.exports.meal_update_portion = async (req, res) => {
    const {meal_id, portion} = req.body;
    try {
        await Meals.update({portion: Number(portion).toPrecision(3)}, {where: {meal_id : meal_id}});
        await MealProducts.update({portion: Number(portion).toPrecision(3)}, {
            where: {
                meal_id : meal_id,
                portion : {[Op.ne]: 1}
            }});
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
    
}