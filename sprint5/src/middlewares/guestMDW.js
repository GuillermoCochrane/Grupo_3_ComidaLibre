function guestMDW(req, res, next){

    if (!req.session.login){
    
        return res.redirect('/user/login');

    }

    next();
};

module.exports = guestMDW