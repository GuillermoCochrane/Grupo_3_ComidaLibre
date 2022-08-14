const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { localsName } = require('ejs');
const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const cookieParser = require('cookie-parser');

const userController = {
    //PERFIL DEL USUARIO
    profile: (req,res)=>{
        let userLogged = (req.session.login) ? req.session.login : null;
        res.render('user', {
            headTitle: 'Free Food - Perfil de Usuario',
            stylesheet: 'styles_forms.css',
            user: userLogged,
        })
    },
    //FORMULARIO DE LOGIN
    log: (req,res)=>{
        res.render('login', {
            headTitle: 'Free Food - Ingresar',
            stylesheet: 'styles_log.css',
            info: '',
            userLog: '',
        })
    },
    //LOGIN DEL USUARIO
    validate: (req,res)=>{        

        const resultValidation = validationResult(req);
        
        if(!resultValidation.isEmpty()){
            res.render('login', {
                headTitle: 'Free Food - Ingresar',
                stylesheet: 'styles_log.css',
                errors: resultValidation.mapped(),
                userLog: req.body.username,
            })
        }
        let usertoLogin = User.findByUsername(req.body.username);
    
        console.log(usertoLogin);
        if(usertoLogin){
            if(bcryptjs.compareSync(req.body.password, usertoLogin.password)){
                req.session.login = usertoLogin;
                res.redirect('/user/');
            }
            else{
                res.render('login', {
                    headTitle: 'Free Food - Ingresar',
                    stylesheet: 'styles_log.css',
                    errors:{
                        login: {
                            msg: 'Contraseña incorrectos'
                        }
                    },
                    userLog: req.body.username,
                })
            }
        }
        else{
            res.render('login', {
                headTitle: 'Free Food - Ingresar',
                stylesheet: 'styles_log.css',
                errors: {
                    login: {
                        msg: 'Usuario no existe'
                    }
                },
                userLog: req.body.username,
            })
        }
    },
    //FORMULARIO DE REGISTRO
    reg: (req,res)=>{
        res.render('register', {
            headTitle: 'Free Food - Registro',
            stylesheet: 'styles_register.css'
        })
    },
    //REGISTRO DEL USUARIO
    create: (req, res) => {
        let datos = req.body;
		let newId = users.length+1;
        let encryptedPass = bcryptjs.hashSync(datos.password, 10);
        if(!req.file) {
			const error = new Error ("Por favor seleccioná un archivo válido")
			error.httpStatusCode=400
			return next(error)
		} else {
            let newUser = {
                id: newId,
                firstName: datos.firstName,
                lastName: datos.lastName,
                address: datos.address,
                email: datos.email,
                phone: datos.phone,
                username: datos.username,
                password: encryptedPass,
                category: 'usuario',
                image: req.file.filename
            };
            users.push(newUser);
            fs.writeFileSync(userFilePath, JSON.stringify(users, null, ' '));
        };

        res.redirect("/user/edit/" + newId);		
    },
    //FORMULARIO DE EDICIÓN
    edit: (req,res)=>{
        let userId = req.params.id;
		let userSelected =  users.find(user => {
			return user.id == userId;
		});

		res.render('userEdit', {
			usuario: userSelected,
            headTitle: 'Free Food - Perfil de Usuario',
            stylesheet: 'styles_register.css'
		})
    },
    //EDICIÓN DEL USUARIO    
    update: (req,res)=>{
        
		let id = req.params.id;
		let datos = req.body;
		let imagen = req.file;
		let originalImage = users[id-1].image;
		let datosUsuario ={
			firstName: datos.firstName,
			lastName: datos.lastName,
			address: datos.address,
			email: datos.email,
			phone: datos.phone,
            username: datos.username,
            password: datos.password,
            repeatPassword: '',
            category: datos.category,
			image: originalImage,           
		}
		if (imagen != undefined){
			datosUsuario.image = imagen.filename;
		}

        // if(datos.password!=datos.repeatPassword){
        //     datosUsuario.repeatPassword = 'Las contraseñas no coinciden';
        //     console.log('no coiniciden');
        //     return res.render('userEdit', {
        //         usuario: datosUsuario,
        //         headTitle: 'Free Food - Perfil de Usuario',
        //         stylesheet: 'styles_register.css'
        //         }
        //     )
        // }

		for(i=0; i<users.length; i++){
			if(users[i].id==id){
				users[i].firstName = datosUsuario.firstName;
				users[i].lastName = datosUsuario.lastName;
				users[i].address = datosUsuario.address;				
				users[i].email = datosUsuario.email;
                users[i].phone = datosUsuario.phone;
                users[i].username= datosUsuario.username
                users[i].password = datosUsuario.password;
                users[i].category = datosUsuario.category;
				users[i].image = datosUsuario.image;
			}
		}

        let jsonUsers = JSON.stringify(users, null, ' ');
		fs.writeFileSync(userFilePath,jsonUsers);
		res.redirect("/user/edit/" + id)
    },
}

module.exports = userController;