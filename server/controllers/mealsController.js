const { Meals, MealProducts, Products, sequelize } = require("../models");
const { DateTime } = require("luxon");
// Create a meal
module.exports.create_meal_post = async (req, res) => {
  const { prods, createdAt, ...rest } = req.body;
  console.log(req.body);
  if (prods.length < 1)
    return res.status(400).json({ error: "At least one product is required" });
  const luxonDate = DateTime.fromISO(createdAt);
  console.log(luxonDate);
  if (luxonDate.invalidExplanation)
    return res.status(400).json({ error: luxonDate.invalidExplanation });
  const normalizedDate = luxonDate.toISO();
  console.log("Normalized ", normalizedDate);
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
    res.status(400).json("Error");
  }
};
// Get a meal
module.exports.meal_page_get = async (req, res) => {
  const { meal_id } = req.params;
  if (!meal_id) return res.status(400).json({ error: "Choose a meal!" });
  try {
    const meal = await Meals.findOne({
      where: { meal_id: meal_id, user_id: req.token.userId },

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
    if (!meal) return res.status(400).json({ error: "Meal doesn't exist" });
    // Returning an ojbect of every product in simplified format, because sequelize returns them in a very inconvienient way
    const prodsInfo = meal.dataValues.Products.map((product) => {
      const { dataValues } = product.MealProducts;
      const { title, product_id } = product;

      return { title, product_id, ...dataValues };
    });
    const { title, createdAt, calories, protein, carbs, weight, isPortion } =
      meal.dataValues;
    res.status(200).json({
      title,
      createdAt,
      calories,
      protein,
      carbs,
      weight,
      isPortion,
      prodsInfo,
      meal_id,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};
