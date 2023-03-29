module.exports = (sequelize, DataTypes) => {
    const Meals = sequelize.define('Meals', {
        meal_id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            valdate: {
                isIn: [['Breakfast, Lunch, Dinner, Snack']]
            }
        },
        calories : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        protein : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        carbs : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        price : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        weight : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        isPortion: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    })
    Meals.associate = (models) => {
        Meals.belongsToMany(models.Products, {
            through: models.MealProducts,
            foreignKey: "meal_id",
        });
    };
    return Meals
};