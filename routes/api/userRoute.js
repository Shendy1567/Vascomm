const userControllers = require("../../controller/userController");
const router = require("express").Router();

router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUserById);

module.exports = router;
