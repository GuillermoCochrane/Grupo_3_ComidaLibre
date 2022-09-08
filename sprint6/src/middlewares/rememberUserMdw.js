const db = require("../database/models");

module.exports = async (req, res, next) => {
  let emailInCookie = req.cookies.userEmail;
  let userFromCookie;
  if (emailInCookie) {
    userFromCookie = await db.User.findOne({
      where: { email: emailInCookie },
      raw: true,
    });
  }
  if (userFromCookie) {
    delete userFromCookie.password;
    req.session.userLogged = { ...userFromCookie };
  }
  if (req.session.userLogged) {
    res.locals.userLogged = { ...req.session.userLogged };
  }
  next();
};
