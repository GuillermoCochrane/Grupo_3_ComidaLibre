const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userController = {
    profile: (req,res)=>{
        res.render('user', {
            headTitle: 'Free Food - Perfil de Usuario',
            stylesheet: 'styles_forms.css'
        })
    },

    log: (req,res)=>{
        res.render('login', {
            headTitle: 'Free Food - Ingresar',
            stylesheet: 'styles_log.css',
            info: '',
            userLog: '',
        })
    },

    validate: (req,res)=>{
        // res.send('datos validados')
        let data = req.body;
        let userSelected =  users.find(user => {
			return user.username == data.username;
		});
        if(userSelected == undefined){
            res.render('login', {
                headTitle: 'Free Food - Ingresar',
                stylesheet: 'styles_log.css',
                info: 'Ingrese un Usuario Valido',
                userLog: '',
            })
        }else if(userSelected.password != data.password){
            res.render('login', {
                headTitle: 'Free Food - Ingresar',
                stylesheet: 'styles_log.css',
                info: 'Contraseña Incorrecta',
                userLog: userSelected.username,
            })
        }else{
            let id = userSelected.id
            res.redirect("/user/edit/" + id)
        }
    },

    reg: (req,res)=>{
        res.render('register', {
            headTitle: 'Free Food - Registro',
            stylesheet: 'styles_register.css'
        })
    },

    create: (req,res)=>{
        let datos = req.body;
		let idNuevo = users.length+1;
		let usuarioNuevo = {
			id: idNuevo,
			firstName: '',
            lastName: '',
            address: '',
			email: datos.email,
            phone: '',
            username: datos.username,
            password: datos.password,
			category: '',
			image: '¡¡¡Olvidó cargar la imagen!!!'
		};
        users.push(usuarioNuevo);
        let jsonUsers = JSON.stringify(users);
        fs.writeFileSync(userFilePath,jsonUsers);
        res.redirect("/user/edit/" + idNuevo)		
    },

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

        let jsonUsers = JSON.stringify(users);
		fs.writeFileSync(userFilePath,jsonUsers);
		res.redirect("/user/edit/" + id)
    },
}

module.exports = userController;