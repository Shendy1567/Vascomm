const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.use(
    new GoogleStrategy(
        {
            clientSecret: process.env.CLIENT_SECRET,
            clientID: process.env.CLIENT_ID,
            callbackURL: "/api/oauth/google",
        },
        async (accessToken, refreshToken, profile, cb) => {
            const { name, email } = profile._json;

            console.log("Access Token:", accessToken);

            try {
                const existingUser = await User.findOne({ where: { email } });
                if (existingUser) {
                    return cb(null, existingUser);
                } else {
                    const newUser = await User.create({ email, name });
                    return cb(null, newUser);
                }
            } catch (err) {
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
