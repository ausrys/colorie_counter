module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        product_id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        picture_path: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { timestamps: false }
    )
    Products.associate = (models) => {
        Products.belongsToMany(models.Meals, {
            through: models.MealProducts,
            foreignKey: "product_id",
        });
    };
    return Products
};