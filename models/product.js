"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            category: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
            paranoid: true,
            deletedAt: "soft_delete",
        }
    );
    return Product;
};
