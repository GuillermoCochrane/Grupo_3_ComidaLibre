module.exports = (req, res, next) => {
  if (req.session.userLogged) {
    if (req.session.userLogged.roles_id === 1) {
      return next();
    }
    return res.redirect("/");
  }

  return res.redirect("/user/login");
};
