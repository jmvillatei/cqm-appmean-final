const router = require("express").Router();

router.get('/users/signin', function(req,res){
    res.send('SIGN IN');
});

router.get('/users/signup', function(req,res){
    res.send('SIGN UP');
});

module.exports = router;