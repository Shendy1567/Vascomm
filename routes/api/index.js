const authRoutes = require("./authRoute");
const oauthRoutes = require("./oauthRoute");
const userRoutes = require("./userRoute");

const api = require("express").Router();

api.use("/auth", authRoutes);
api.use("/oauth", oauthRoutes);
api.use("/user", userRoutes);

module.exports = api;
