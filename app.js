const express = require("express");
const app = express();
const apiRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const PORT = 3030;

app.use(cookieParser());

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRoutes);

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
});
