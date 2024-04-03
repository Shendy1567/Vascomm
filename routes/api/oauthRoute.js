const passport = require("passport");
const authControllers = require("../../controller/authController");
const passportGoogle = require("../../middleware/passportOAuth");
const router = require("express").Router();

// auth with google
router.get(
    "/login/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get("/google", passport.authenticate("google"), (req, res) => {
    return res.status(200).json({
        code: 200,
        message: "Login via google is success",
        data: req.user,
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    return res.status(200).json({
        code: 200,
        message: "Logout is success",
        data: null,
    });
});

module.exports = router;
