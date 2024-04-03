const { Op } = require("sequelize");
const { Product } = require("../models");

class ProductControllers {
    async registerProduct(req, res) {
        const { name, category, description, price, quantity } = req.body;
        if (await Product.findOne({ where: { name } }))
            return res.status(400).json({
                code: 400,
                message: "Product name already been used",
                data: null,
            });

        try {
            const data = await Product.create({
                name,
                category,
                description,
                price,
                quantity,
            });
            return res.status(200).json({
                code: 200,
                message: "Product successfuly created",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async getProducts(req, res) {
        const { name, category } = req.query;
        let where = {};
        if (name && category) {
            where = {
                name: { [Op.like]: `%${name}%` },
                category: { [Op.like]: `%${category}%` },
            };
        } else if (name) {
            where = {
                name: { [Op.like]: `%${name}%` },
            };
        } else if (category) {
            where = {
                category: { [Op.like]: `%${category}%` },
            };
        }

        try {
            const data = await Product.findAll({
                where,
            });
            if (!data || data.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Products didn't found",
                    data: null,
                });
            }
            return res.status(200).json({
                code: 200,
                message: "Products found",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({
                    code: 404,
                    message: `Product with id ${id} not found`,
                    data: null,
                });
            }
            return res.status(200).json({
                code: 200,
                message: `Product with id ${id} found`,
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, category, description, price, quantity } = req.body;
            const data = await Product.findByPk(id);
            if (!data)
                return res.status(404).json({
                    code: 404,
                    message: `Product with id: ${id} not found`,
                    data: null,
                });
            const updateFields = {};

            if (name) {
                updateFields.name = name;
            }

            if (category) {
                updateFields.category = category;
            }

            if (description) {
                updateFields.description = description;
            }

            if (price) {
                updateFields.price = price;
            }

            if (quantity) {
                updateFields.quantity = quantity;
            }

            const [updateCount] = await Product.update(updateFields, {
                where: { id },
            });
            if (updateCount === 1) {
                return res.status(200).json({
                    code: 200,
                    message: `Product with id: ${id} successfully updated`,
                    data: updateFields,
                });
            }
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({
                    code: 404,
                    message: `Product with id ${id} not found`,
                    data: null,
                });
            }

            await Product.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).json({
                code: 200,
                message: "Product Successfully deleted",
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }
}

module.exports = new ProductControllers();
