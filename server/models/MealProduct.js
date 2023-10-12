module.exports = (sequelize, DataTypes) => {
  const MealProducts = sequelize.define(
    "MealProducts",
    {
      calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      protein: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      carbs: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
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
