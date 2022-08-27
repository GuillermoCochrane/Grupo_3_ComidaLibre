module.exports = (req, res, next) => {
    if( req.session.userLogged ){
        if( req.session.userLogged.category === 'administrador' ){
            return next();
        }
        return res.redirect( '/' )
    }

    return res.redirect( '/user/login' )
}