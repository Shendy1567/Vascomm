const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.sendStatus(401);
    const authToken = authHeader && authHeader.split(" ")[1];
    if (!authToken) return res.sendStatus(401);
    jwt.verify(authToken, process.env.TOKEN, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.id = decoded.userId;
        req.email = decoded.userEmail;
        req.role = decoded.userRole;
        next();
    });
};

module.exports = verifyJWT;
