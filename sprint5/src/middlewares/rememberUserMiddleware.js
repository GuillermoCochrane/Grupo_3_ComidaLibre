const Username = require('../models/Users')

const usernameInCookie = req.cookies.username

module.exports = (req,res,next)=>
{
if (usernameInCookie) {
let usernameFromCookie = Username.findByUsername(usernameInCookie)
if (usernameFromCookie) {
    req.session.userLogged = {...findByUsername}
}
}
if (req.session.userLogged) {
    res.locals.userLogged = {...req.session.userLogged}
}
next()
}