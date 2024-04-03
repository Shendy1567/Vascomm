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
}

module.exports = new ProductControllers();
