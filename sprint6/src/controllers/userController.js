const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');


const Users = db.User
const Sale =  db.Sale
const SaleDetail = db.SaleDetail
const Favourites = db.Favourite

module.exports = {
  //LISTADO DE USUARIOS
  index: (req, res) =>  {
    Users.findAll({
      attributes: { exclude: ['password'] },
      include: ["user_role"],
      raw: true,
      nest: true,
    })
    .then(users =>{
      return res.render('users/userList',{
        headTitle: 'Free Food - Listado de usuarios',
        stylesheet: ' ',
        allUsers: users
      })
    })
  },
  //PERFIL DE USUARIOS
  profile: async (req, res) => {
    let userId = req.params.id;
    let userFound = await db.User.findAll({
      attributes: {exclude: ['password']},
      include: ["user_role", "users_products"],
      where: { id: userId },
      raw: true,
      nest: true,
    });
    let userSales = await db.Sale.findAll({
        where: { users_id: userId },
        raw: true
    });
    let userSalesDetails = await db.SaleDetail.findAll({
      include: ['saleDetail_product'], 
      raw: true, 
      nest: true 
    });
    return res.render("users/userProfile", {
      headTitle: "Free Food - Perfil de Usuario",
      stylesheet: "styles.css",
      user: userFound,
      userSales: userSales,
      userSalesDetails: userSalesDetails
    });
  },
  //FORMULARIO DE LOGIN
  login: (req, res) => {
    return res.render("users/login", {
      headTitle: "Free Food - Ingresar",
      stylesheet: "styles_log.css",
    });
  },
  //PROCESO DE LOGIN
  loginPost: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        headTitle: "Free Food - Ingresar",
        stylesheet: "styles_log.css",
        errors: errors.mapped(),
      });
    }

    let data = { ...req.body };
    Users.findOne({ where: { email: data.emailUser }, raw: true })
    .then(user => {
      if (!user) {
        Users.findOne({ where: { username: data.emailUser }, raw: true })
        .then(user => {
          delete user.password;
          if (data.remember_user) {
            res.cookie("userEmail", user.email, { maxAge: 600000 * 6 });
          }
          req.session.userLogged = { ...user };
          return res.redirect('/');
        });
      } else {
        delete user.password;
        if (data.remember_user) {
          res.cookie("userEmail", user.email, { maxAge: 600000 * 6 });
        }
        req.session.userLogged = { ...user };
        return res.redirect('/');
      }
    });
  },
  //FORMULARIO DE REGISTRO
  register: (req, res) => {
    return res.render("users/register", {
      headTitle: "Free Food - Registro",
      stylesheet: "styles_register.css",
    });
  },
  //CREACION DE USUARIO
  add: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        headTitle: "Free Food - Registro",
        stylesheet: "styles_register.css",
        //agrergar old data
        errors: errors.mapped(),
      });
    }
    let userData = { ...req.body };
    delete userData.rePassword;
    let hashedPassword = bcryptjs.hashSync(userData.password, 10);
    let newUser = {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      roles_id: 2,
    }
    Users.create(newUser);
    return res.redirect("/");
  },
  //FORMULARIO DE EDICION DE USUARIO
  edit: (req, res) => {
    if (req.session.userLogged.roles_id === 1) {
      let userId = req.params.id;
      Users.findOne({ where: { id: userId }, raw: true })
      .then((user) => {
        return res.render("users/userEdit", {
          headTitle: "Free Food - Editar usuario",
          stylesheet: "styles_forms.css",
          usuario: user,
        });
      });
    } else {
      return res.render("users/userEdit", {
        headTitle: "Free Food - Editar usuario",
        stylesheet: "styles_forms.css",
        usuario: req.session.userLogged,
      });
    }
  },
  //ACTUALIZA INFORMACION DE USUARIO
  update: async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let userId = req.params.id;
      let oldData = await db.User.findOne({ where: { id: userId }, raw: true });
      return res.render("users/userEdit", {
        headTitle: "Free Food - Editar usuario",
        stylesheet: "styles_forms.css",
        errors: errors.mapped(),
        oldData: oldData,
      });
    }
    let userId = req.params.id;
    let userFound = await Users.findOne({ where: { id: userId } });
    let userData = { ...req.body };
    let hashedPassword;
    if (userData.password != "") {
      hashedPassword = bcryptjs.hashSync(userData.password, 10);
    }
    for (let input in userData) {
      if (userData[input] == "") {
        delete userData[input];
      }
    }
    let updatedUser;
    if (req.file && hashedPassword) {
      updatedUser = {
        ...userFound,
        ...userData,
        rePassword: undefined,
        password: hashedPassword,
        image: req.file.filename,
      };
    } else if (req.file && !hashedPassword) {
      updatedUser = {
        ...userFound,
        ...userData,
        rePassword: undefined,
        password: userFound.password,
        image: req.file.filename,
      };
    } else if (hashedPassword && !req.file) {
      updatedUser = {
        ...userFound,
        ...userData,
        rePassword: undefined,
        password: hashedPassword,
      };
    } else {
      updatedUser = {
        ...userFound,
        ...userData,
        rePassword: undefined,
        password: userFound.password,
      };
    }
    Users.update(updatedUser, { where: { id: userId } });
    return res.redirect(`/user/${req.params.id}`);
  },
  //ELIMINA UN USUARIO
  delete: (req, res) => {
    let id = req.params.id;
    Users.destroy({ where: { id: id }, force: true });
    return res.redirect("/user");
  },
  //DESLOGUEA AL USUARIO
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },
};
