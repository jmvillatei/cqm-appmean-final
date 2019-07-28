const router = require("express").Router();

const User = require('../models/User')

const passport = require('passport');

// SIGN IN
router.get('/users/signin', function (req, res) {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
})); 


// SIGN UP
router.get('/users/signup', function (req, res) {
    res.render('users/signup');
});

router.post('/users/signup', async function (req, res) {
    const { username, email, pwd, repwd } = req.body;
    const errors = [];
    const existEmail = await User.findOne({email: email});
    const existUser = await User.findOne({username: username});
    
    if (existUser) {
        errors.push({ text: 'This user already exist' });
    }
    if (existEmail) {
        errors.push({ text: 'This email is in use, please login' });
    }
    if (pwd.length < 5) {
        errors.push({ text: 'Password must be greater than 4 characters' });
    }
    if (pwd != repwd) {
        errors.push({ text: 'Passwords not match ' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, username, email, pwd, repwd });
    } else {

        const newUser = new User({username, email, pwd});
        newUser.pwd = await newUser.encryptPwd(pwd);
        await newUser.save();
        req.flash('success_msg', 'Opreation Successfully, You are Registered');
        res.redirect('/users/signin');
    }

});

module.exports = router;