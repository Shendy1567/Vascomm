const { Op } = require("sequelize");
const { User } = require("../models");
const { hashPassword } = require("../utils/passwordHandler");

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

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const data = await User.findByPk(id);
            if (!data)
                return res.status(404).json({
                    code: 404,
                    message: `Player with id: ${id} not found`,
                    data: null,
                });
            console.log(req.id);
            if (id != req.id)
                return res.status(401).json({
                    code: 401,
                    message: `Unauthorized user detected`,
                    data: null,
                });

            const updateFields = {};

            if (name) {
                updateFields.name = name;
            }

            if (email) {
                updateFields.email = email;
            }

            if (password) {
                updateFields.password = await hashPassword(password);
            }
            const [updateCount] = await User.update(updateFields, {
                where: { id: id },
            });
            if (updateCount === 1) {
                return res.status(200).json({
                    code: 401,
                    message: `Player with id: ${id} successfully updated`,
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
    async deleteUser(req, res) {
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

            await User.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).json({
                code: 200,
                message: "User Successfully deleted",
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
}

module.exports = new UserControllers();
