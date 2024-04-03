const authRoutes = require("./authRoute");
const oauthRoutes = require("./oauthRoute");
const userRoutes = require("./userRoute");
const productRoutes = require("./productRoute");
const api = require("express").Router();

api.use("/auth", authRoutes);
api.use("/oauth", oauthRoutes);
api.use("/user", userRoutes);
api.use("/product", productRoutes);

module.exports = api;
