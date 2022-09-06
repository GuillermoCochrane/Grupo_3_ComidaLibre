const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');

const Users = db.User

module.exports = {
    //LISTADO DE USUARIOS
    index: (req, res) =>  {
        Users.findAll()
        .then(users =>{
            res.render('users/userList',{
                    headTitle: 'Free Food - Listado de usuarios',
                    stylesheet: ' ',
                    allUsers: users
                })
        })
    },
    
    //PERFIL DE USUARIOS
    profile: (req, res)=>{
        Users.findByPk(req.params.id)
        .then(user =>{
            res.render('users/userProfile', {
                headTitle: 'Free Food - Perfil de Usuario',
                stylesheet: 'styles.css',
                user: user
            })            
        })
        
        // return res.render('users/userProfile', {
        //     headTitle: 'Free Food - Perfil de Usuario',
        //     stylesheet: 'styles.css',
        //     user: User.findById(req.params.id)
        // })
    },
    //FORMULARIO DE LOGIN
    login: (req, res)=>{
        res.render('users/login', {
            headTitle: 'Free Food - Ingresar',
            stylesheet: 'styles_log.css',
        })
    },
    //PROCESO DE LOGIN
    loginPost: (req, res) => {
        let errors = validationResult(req)
        if( !errors.isEmpty() ){  
            return res.render('users/login', {
                headTitle: 'Free Food - Ingresar',
                stylesheet: 'styles_log.css',
                errors: errors.mapped()
            })
        }

        let log = req.body.emailUser
        
        Users.findAll({
            where: {
                email: log,
            },
        })
        .then(userbyemail=>{
            if(userbyemail.length>0){
                let foundByEmail =  {
                    id:          userbyemail[0].id,
                    username:    userbyemail[0].username,
                    image:       userbyemail[0].image,
                    first_name:  userbyemail[0].first_name,
                    last_name:   userbyemail[0].last_name,
                    address:     userbyemail[0].address,
                    phone:       userbyemail[0].phone,
                    roles_id:    userbyemail[0].roles_id,
                    }                
                    if( req.body.remember_user ) {
                        res.cookie( 'userEmail', foundByEmail.email , { maxAge: 600000*6 })
                    }
                    req.session.userLogged = { ...foundByEmail }
                    return res.redirect('/')
            }else{
                Users.findAll({
                    where: {
                        username: log,
                    },
                })
                .then(userbyusername=>{
                    if(userbyusername.length>0){
                        let foundByUsername = {
                        id:          userbyusername[0].id,
                        username:    userbyusername[0].username,
                        image:       userbyusername[0].image,
                        first_name:  userbyusername[0].first_name,
                        last_name:   userbyusername[0].last_name,
                        address:     userbyusername[0].address,
                        phone:       userbyusername[0].phone,
                        roles_id:    userbyusername[0].roles_id,
                        }                    
                        if( req.body.remember_user ) {
                            res.cookie( 'userEmail', foundByUsername.email , { maxAge: 600000*6 })
                        }
                        req.session.userLogged = { ...foundByUsername }
                        return res.redirect('/')                        
                    }
                })
            }            
        })
    },
    //FORMULARIO DE REGISTRO
    register: (req, res)=>{
        res.render('users/register', {
            headTitle: 'Free Food - Registro',
            stylesheet: 'styles_register.css'
        })
    },
    //CREACION DE USUARIO
    add: (req, res) => {
        let errors = validationResult(req)
        if( !errors.isEmpty() ){
            return res.render('users/register', {
                headTitle: 'Free Food - Registro',
                stylesheet: 'styles_register.css',
                errors: errors.mapped()
            })
        }
        let userData = req.body;

        let hashedPassword = bcryptjs.hashSync(userData.password, 10)

        let newUser = {
            ...userData,
            password: hashedPassword,
            roles_id: 2,
            image: 'default.png'
        }
        Users.create(newUser)
        .then(()=>{
            return res.redirect('/')
        })
    },
    //FORMULARIO DE EDICION DE USUARIO
    edit: (req, res)=>{

        Users.findByPk(req.params.id)
        .then(user =>{
            if( req.session.userLogged.roles_id === 1){
                return res.render('users/userEdit', {
                    headTitle: 'Free Food - Editar usuario',
                    stylesheet: 'styles_forms.css',
                    usuario: user,
                })
            }
    
            res.render('users/userEdit', {
                headTitle: 'Free Food - Editar usuario',
                stylesheet: 'styles_forms.css',
                usuario: user,
            })
        })
    },
    //ACTUALIZA INFORMACION DE USUARIO
    update: (req, res) => {
        let errors = validationResult(req)
        if( !errors.isEmpty() ){
            return res.render( 'users/userEdit', {
                headTitle: 'Free Food - Editar usuario',
                stylesheet: 'styles_forms.css',
                errors: errors.mapped(),
                oldData: req.body,
            })
        }
        let hashedPassword = bcryptjs.hashSync(req.body.password, 10)
        let data = {
            username:    req.body.username,
            image:       '',
            first_name:  req.body.first_name,
            last_name:   req.body.last_name,
            address:     req.body.address,
            phone:       req.body.phone,
            password:    hashedPassword,
        }

        if(req.file){
            data.image = req.file.filename;
        }else{
            delete data.image
        }

        Users.update(data, 
            {where: {
                id: req.params.id,
            }
        })
        .then(()=>{
            res.redirect(`/user/${req.params.id}`)
        })
    },
    //ELIMINA UN USUARIO
    delete: (req, res) => {
        let id = req.params.id
        Users.destroy({
            where:{
                id: id,
            },
            force: true
        });
        res.redirect('/user/login')
    },
    //DESLOGUEA AL USUARIO
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie( 'userEmail' );
        return res.redirect('/')
    }
}