const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../utils/passwordHandler");

class AuthControllers {
    async registerUser(req, res) {
        const { name, email, password, phoneNumber, role } = req.body;
        if (await User.findOne({ where: { email } }))
            return res.status(400).json({
                code: 400,
                message: "Email already been used",
                data: null,
            });

        const hashedPassword = await hashPassword(password);

        try {
            const data = await User.create({
                name,
                email,
                password_hash: hashedPassword,
                phone_number: phoneNumber,
                role,
            });
            return res.status(200).json({
                code: 200,
                message: "Email successfuly created",
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
    async loginUser(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message: "Email not found please try again",
                    data: null,
                });
            }

            const matchPassword = await verifyPassword(
                req.body.password,
                user.password_hash
            );

            if (!matchPassword)
                return res.status(400).json({
                    code: 400,
                    message: "Wrong password please try again",
                    data: null,
                });

            const userId = user.id;
            const userName = user.name;
            const userEmail = user.email;
            const userRole = user.role;

            const token = jwt.sign(
                { userId, userName, userEmail, userRole },
                process.env.TOKEN,
                {
                    expiresIn: "1d",
                }
            );

            await User.update(
                { token },
                {
                    where: {
                        id: userId,
                    },
                }
            );

            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                path: "/",
            });

            return res.status(200).json({
                code: 200,
                message: "Login Success",
                data: {
                    token,
                },
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async logoutUser(req, res) {
        const token = req.cookies.token;
        if (!token)
            return res.status(404).json({
                code: 404,
                message: "Token not found",
                data: null,
            });

        const user = await User.findOne({
            where: {
                token,
            },
        });

        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found please try again",
                data: null,
            });
        }

        const userId = user.id;

        await User.update(
            { token: null },
            {
                where: {
                    id: userId,
                },
            }
        );
        res.clearCookie("token");
        return res.status(200).json({
            code: 200,
            message: "Token Successfully deleted",
            data: null,
        });
    }
}

module.exports = new AuthControllers();
