const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');



passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'pwd'
},
    async function (username, pwd, done) {
        const user = await User.findOne({ username: username });

        if (!user) {
            console.log('error USer');
            return done(null, false, { message: 'User or Password are not correct' });
        } else {
            console.log(user);
            const match = await user.matchPwd(pwd);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'User or Password are not correct' });
            }

        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
