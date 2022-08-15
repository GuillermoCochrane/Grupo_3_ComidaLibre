const User = require('../models/User')

module.exports = (req,res,next) => {
    let emailInCookie = req.cookies.userEmail

    if ( emailInCookie ) {
        let userFromCookie = User.findByEmail( emailInCookie )
        if ( userFromCookie ) {
            delete userFromCookie.password
            req.session.userLogged = { ...userFromCookie }
        };
    };

    if ( req.session.userLogged ) {
        res.locals.userLogged = { ...req.session.userLogged }
    };

    next();
}