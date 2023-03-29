module.exports = (sequelize, DataTypes) => {
    const MealProducts = sequelize.define('MealProducts', {
        calories : {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        protein : {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        carbs : {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price : {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        weight : {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    })
    return MealProducts
};