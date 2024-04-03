const verifyRole = (allowedRole) => {
    return (req, res, next) => {
        console.log(req.role);
        if (!req?.role) return res.sendStatus(401);
        console.log(2);
        if (req.role != allowedRole) return res.sendStatus(401);
        next();
    };
};

module.exports = verifyRole;
