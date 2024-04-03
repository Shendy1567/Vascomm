const { Op } = require("sequelize");
const { User } = require("../models");

class UserControllers {
    async getUsers(req, res) {
        const { name } = req.query;
        try {
            let users;
            if (name) {
                users = await User.findAll({
                    where: {
                        name: { [Op.like]: `%${name}%` },
                    },
                });
            } else {
                users = await User.findAll();
            }
            if (!users || users.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Users didn't found",
                    data: null,
                });
            }
            return res.status(200).json({
                code: 200,
                message: "Users found",
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message: `User with id ${id} not found`,
                    data: null,
                });
            }
            return res.status(200).json({
                code: 200,
                message: `User with id ${id} found`,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async updateUser(req, res) {}
}

module.exports = new UserControllers();
