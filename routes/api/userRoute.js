const userControllers = require("../../controller/userController");
const router = require("express").Router();
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/:id", userControllers.getUserById);
router.get("/", userControllers.getUsers);

router.use(verifyJWT);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", verifyRoles("admin"), userControllers.deleteUser);

module.exports = router;
