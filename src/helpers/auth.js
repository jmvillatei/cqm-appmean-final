const helpers = {};

helpers.isAuthenticated =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error-msg', 'User without permissions');
    res.redirect('/users/signin');
};

module.exports = helpers;