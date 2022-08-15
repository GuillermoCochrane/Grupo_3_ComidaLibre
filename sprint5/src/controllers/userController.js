const User = require('../models/User')
const { validationResult } = require('express-validator')

module.exports = {
    //LISTADO DE USUARIOS
    index: (req, res) => {
        res.render('users/userList',{
            headTitle: 'Free Food - Listado de usuarios',
            stylesheet: ' ',
            allUsers: User.getData()
        })
    },
    //PERFIL DE USUARIOS
    profile: (req, res)=>{
        return res.render('users/userProfile', {
            headTitle: 'Free Food - Perfil de Usuario',
            stylesheet: 'styles.css',
            user: User.findById(req.params.id)
        })
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

       let foundByEmail = User.findByEmail(req.body.emailUser)
       let foundByUsername = User.findByUsername(req.body.emailUser)

       if( foundByEmail ) {
            delete foundByEmail.password
            if( req.body.remember_user ) {
                res.cookie( 'userEmail', foundByEmail.email , { maxAge: 600000*6 })
            }
            req.session.userLogged = { ...foundByEmail }
            return res.redirect(`/user/${foundByEmail.id}`)

       } else {
            delete foundByUsername.password
            if( req.body.remember_user ) {
                res.cookie( 'userEmail', foundByUsername.email , { maxAge: 600000*6 })
            }
            req.session.userLogged = { ...foundByUsername }
            return res.redirect(`/user/${foundByUsername.id}`)
       }

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

        User.create(req.body)

        res.redirect('/')
    },
    //FORMULARIO DE EDICION DE USUARIO
    edit: (req, res)=>{

        if( req.session.userLogged.category === 'administrador'){
            return res.render('users/userEdit', {
                headTitle: 'Free Food - Editar usuario',
                stylesheet: 'styles_forms.css',
                usuario: User.findById(req.params.id)
            })
        }

		res.render('users/userEdit', {
            headTitle: 'Free Food - Editar usuario',
            stylesheet: 'styles_forms.css',
            usuario: User.findById(req.session.userLogged.id)
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
                oldData: User.findById(req.params.id)
            })
        }
        //return res.send(req.body)
        User.edit(req.params.id, req.body, req.file)

        res.redirect(`/user/${req.params.id}`)
    },
    //ELIMINA UN USUARIO
    delete: (req, res) => {
        User.delete(req.params.id)

        res.redirect('/user')
    },
    //DESLOGUEA AL USUARIO
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie( 'userEmail' );
        return res.redirect('/')
    }
}