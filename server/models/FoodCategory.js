module.exports = (sequelize, DataTypes) => {
  const FoodCategories = sequelize.define(
    "FoodCategories",
    {
      food_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  FoodCategories.associate = (models) => {
    FoodCategories.hasMany(models.Products, {
      foreignKey: "food_category_id",
    });
  };
  return FoodCategories;
};
