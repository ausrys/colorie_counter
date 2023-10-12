const { areInputsPositive } = require("../helper/helperFunctions");
const { Products, FoodCategories } = require("../models");
const { Op } = require("sequelize");
module.exports.add_product_post = async (req, res) => {
  const { title, calories, protein, carbs, food_category_id } = req.body;
  if (
    !title ||
    isNaN(calories) ||
    isNaN(protein) ||
    isNaN(carbs) ||
    isNaN(food_category_id)
  )
    return res.status(400).json({
      error:
        "All valus must be provided and they must be in the correct format",
    });
  if (!areInputsPositive([calories, protein, carbs]))
    return res.status(400).json({ error: "Nutrition values must be positive" });
  if (calories < 0 || protein < 0 || carbs < 0)
    return res
      .status(400)
      .json({ error: "Nutrition values cannot be bellow zero" });
  try {
    const product = await Products.findOne({
      where: { title: title },
    });
    const category = await FoodCategories.findByPk(food_category_id);
    if (!category)
      return res.status(404).json({ error: "Category does not exist!" });
    if (product === null) {
      await Products.create({
        title: title,
        calories: calories,
        protein: protein,
        carbs: carbs,
        food_category_id: food_category_id,
      });
      res.status(201).json("Product added successfuly!");
    } else
      return res
        .status(400)
        .json({ error: "Product with this name already exists" });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong...");
  }
};
module.exports.all_products_get = async (req, res) => {
  try {
    const all_products = await Products.findAll();
    res.status(200).json(all_products);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
// Add new product category
module.exports.add_category_post = async (req, res) => {
  const { category_name } = req.body;
  if (!category_name) return res.status(400).json("Category was not provided");
  try {
    const category = await FoodCategories.findOne({
      where: { category_name: category_name },
    });
    if (category === null) {
      await FoodCategories.create({ category_name });
      res.status(201).json("Product category added");
    } else return res.status(400).json({ error: "Category already exists" });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
// Get all categories
module.exports.categories_get = async (req, res) => {
  try {
    const all_categories = await FoodCategories.findAll({
      order: [["category_name", "ASC"]],
    });
    res.status(200).json(all_categories);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
// Get all products by a category
module.exports.products_by_category_get = async (req, res) => {
  try {
    const { food_category_id } = req.params;
    if (!food_category_id)
      return res.status(400).json("Category doesn't exist");
    const all_products_by_category = await Products.findAll({
      where: {
        food_category_id: food_category_id,
      },
    });
    res.status(200).json(all_products_by_category);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
module.exports.products_by_search = async (req, res) => {
  try {
    const { query } = req.params;
    const pruducts_by_query = await Products.findAll({
      where: {
        title: { [Op.like]: `%${query}%` },
      },
    });
    res.status(200).json(pruducts_by_query);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};
