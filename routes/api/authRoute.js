const authControllers = require("../../controller/authController");
const router = require("express").Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);

router.delete("/logout", authControllers.logoutUser);

module.exports = router;
