const { DateTime } = require("luxon");
module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define(
    "Meals",
    {
      meal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        valdate: {
          isIn: [["Breakfast, Lunch, Dinner, Snack"]],
        },
      },
      calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      protein: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      carbs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      isPortion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  Meals.associate = (models) => {
    Meals.belongsToMany(models.Products, {
      through: models.MealProducts,
      foreignKey: "meal_id",
    });
    Meals.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };
  return Meals;
};
