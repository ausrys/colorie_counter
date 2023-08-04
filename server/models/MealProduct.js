module.exports = (sequelize, DataTypes) => {
  const MealProducts = sequelize.define(
    "MealProducts",
    {
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  MealProducts.associate = (models) => {
    MealProducts.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };
  return MealProducts;
};
