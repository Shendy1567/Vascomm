const productControllers = require("../../controller/productController");
const router = require("express").Router();
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router.post("/", productControllers.registerProduct);
router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProductById);
router.put("/:id", productControllers.updateProduct);

module.exports = router;
