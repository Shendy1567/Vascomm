const jwt = require("jsonwebtoken");

module.exports = class AuthCheckMiddleware {
    async authVerify(req, res, next) {
        const authHeader = req.headers["Authorization"];
        const authToken = authHeader && authHeader.split(" ")[1];
        if (!authToken) return res.sendStatus(401);
        jwt.verify(authToken, process.env.TOKEN, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.email = decoded.email;
            next();
        });
    }
};
