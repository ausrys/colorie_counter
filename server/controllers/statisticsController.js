const { Meals } = require("../models");
const { Op } = require("sequelize");
const { DateTime } = require("luxon");
// Get current week's meals
module.exports.get_currentWeek_meals = async (req, res) => {
  const { currentDate } = req.body;
  // Converting the date to luxon object so that it could be modified easier

  const luxonDate = DateTime.fromISO(currentDate);
  // Checking if the date is valid
  if (luxonDate.invalidExplanation)
    return res.status(400).json({ error: luxonDate.invalidExplanation });
  const beginningOfTheCurrentWeek = luxonDate.startOf("week");
  try {
    const currentWeekMeals = await Meals.findAll({
      where: {
        createdAt: {
          [Op.between]: [beginningOfTheCurrentWeek.toISO(), luxonDate.toISO()],
        },
        isPortion: 1,
      },
    });
    const weekDaysObject = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    const weekNutrition = {
      calories: 0,
      carbs: 0,
      protein: 0,
    };
    // For each meal we get it's weekday and push it to the object, this way we have each meal for a coresponding day, this way it will be easier to represent this data in the front end
    currentWeekMeals.forEach((element) => {
      const weekDay = DateTime.fromISO(element.createdAt, {
        locale: "en-GB",
      }).weekdayShort;
      weekDaysObject[weekDay].push(element);
      weekNutrition.calories += element.calories;
      weekNutrition.carbs += element.carbs;
      weekNutrition.protein += element.protein;
    });
    const CaloriesSumForEachWeekDay = {};
    for (const day in weekDaysObject) {
      if (weekDaysObject[day].length > 0) {
        const daysCalories = weekDaysObject[day]
          .map((object) => {
            return object.calories;
          })
          .reduce((acummulator, cuurentValue) => acummulator + cuurentValue);
        CaloriesSumForEachWeekDay[day] = daysCalories;
      } else CaloriesSumForEachWeekDay[day] = 0;
    }
    res.status(200).json({ CaloriesSumForEachWeekDay, weekNutrition });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.get_test_meals = async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  if (
    DateTime.fromISO(startDate).invalidExplanation ||
    DateTime.fromISO(endDate).invalidExplanation
  )
    return res
      .status(400)
      .json("Date or dates that were provided are in the incorrect format");
  if (!startDate && !endDate)
    return res.status(400).json("No dates were provided");
  const monthDays = {};
  const luxonStartDate = DateTime.fromISO(startDate);
  const luxonEndDate = DateTime.fromISO(endDate);
  try {
    const mealsByInterval = await Meals.findAll({
      where: {
        createdAt: {
          [Op.between]: [luxonStartDate.toISO(), luxonEndDate.toISO()],
        },
        isPortion: 1,
        user_id: req.token.userId,
      },
    });
    mealsByInterval.forEach((element) => {
      const monthDay = DateTime.fromISO(element.createdAt, {
        locale: "en-GB",
      }).day;
      const monthName = DateTime.fromISO(element.createdAt, {
        locale: "en-GB",
      }).monthShort;
      if (!monthDays[`${monthName} ${monthDay}`])
        monthDays[`${monthName} ${monthDay}`] = [];
      monthDays[`${monthName} ${monthDay}`].push(element);
    });
    const CaloriesSumForEachDay = {};
    for (const day in monthDays) {
      const daysCalories = monthDays[day]
        .map((object) => {
          return object.calories;
        })
        .reduce((acummulator, cuurentValue) => acummulator + cuurentValue);
      CaloriesSumForEachDay[day] = daysCalories;
    }
    res.status(200).json(CaloriesSumForEachDay);
  } catch (error) {
    res.status(400).json(error);
  }
};
