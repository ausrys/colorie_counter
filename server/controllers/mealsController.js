const { Meals, MealProducts, Products, sequelize } = require("../models");
const { Op } = require("sequelize");
const { DateTime } = require("luxon");
// Create a meal
module.exports.create_meal_post = async (req, res) => {
  const { prods, createdAt, ...rest } = req.body;
  const luxonDate = DateTime.fromISO(createdAt);
  if (luxonDate.invalidExplanation)
    return res.status(400).json({ error: luxonDate.invalidExplanation });
  const normalizedDate = luxonDate.toISO();
  try {
    await sequelize.transaction(async (t) => {
      const meal = await Meals.create(
        {
          ...rest,
          createdAt: normalizedDate,
          user_id: req.token.userId,
        },
        { transaction: t }
      );
      const { meal_id } = meal;
      const user_id = req.token.userId;
      const products = prods.map((obj) => {
        return {
          meal_id: meal_id,
          user_id: user_id,
          product_id: obj.product_id,
          createdAt: normalizedDate,
          ...obj,
        };
      });
      await MealProducts.bulkCreate(products, { transaction: t });
      return meal;
    });
    res.status(201).json("Meal was created successfuly!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// Get all meals
module.exports.all_meals_get = async (req, res) => {
  try {
    // Get meals from the newest
    const all_meals = await Meals.findAll({
      order: [["createdAt", "DESC"]],
      where: { user_id: req.token.userId },
    });

    res.status(200).json(all_meals);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
// Get a meal
module.exports.meal_page_get = async (req, res) => {
  const { meal_id } = req.params;
  if (!meal_id) return res.status(400).json("Meal doesn't exist");
  try {
    const meal = await Meals.findByPk(meal_id, {
      attributes: { exclude: ["meal_id"] },
      include: [
        {
          model: Products,
          attributes: ["title", "product_id"],
          through: {
            attributes: ["calories", "protein", "carbs", "weight"],
          },
        },
      ],
    });
    // Returning an ojbect of every product in simplified format, because sequelize returns them in a very inconvienient way
    const prodsInfo = meal.dataValues.Products.map((product) => {
      const { dataValues } = product.MealProducts;
      const { title, product_id } = product;

      return { title, product_id, ...dataValues };
    });
    const {
      title,
      createdAt,
      calories,
      protein,
      carbs,
      weight,
      isPortion,
      user_id,
    } = meal.dataValues;
    // Checking if an user wants to see his own meal
    if (user_id !== req.token.userId)
      return res.status(401).json("Thats not your meal!");
    res.status(200).json({
      title,
      createdAt,
      calories,
      protein,
      carbs,
      weight,
      isPortion,
      prodsInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
