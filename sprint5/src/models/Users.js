//REQUIRE
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

module.exports = {
    //JSON DE USUARIOS
    fileName: path.join(__dirname, '../data/users.json'),

    //GUARDA LA INFORMACION DE USUARIOS EN UN ARRAY
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },
    //GENERA UN ID PARA NUEVOS USUARIOS
    genId: function () {
        let allUsers = this.getData();
        
        let lastUser = allUsers.pop();
        
        if(lastUser){
            return lastUser.id + 1;
        }else return 1;
    },
    //BUSCA UN USUARIO POR ID
    findById: function (id) {
        let allUsers = this.getData();
        return userFound = allUsers.find(user => user.id == id)   
    },
    //BUSCA UN USUARIO POR EMAIL
    findByEmail: function (email) {
        let allUsers = this.getData();

        return userFound = allUsers.find(user => user.email == email)
    },
    //BUSCA UN USUARIO POR NOMBRE DE USUARIO
    findByUsername: function (username) {
        let allUsers = this.getData();

        return userFound = allUsers.find(user => user.username == username)
    },
    //CREA Y GUARDA UN USUARIO EN JSON
    create: function (userData) {
        let allUsers = this.getData();
        
        let hashedPassword = bcryptjs.hashSync(userData.password, 10) 

        let newUser = {
            id: this.genId(),
            ...userData,
            rePassword: undefined,
            password: hashedPassword,
            category: 'usuario',
            image: 'default.png'
        }
        
        allUsers.push(newUser)
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        
        return true;
    },
    //ACTUALIZA Y GUARDA UN USUARIO EN JSON
    edit: function (id, userData, userFile) {
        let allUsers = this.getData();

        let userFound = this.findById(id);

        let hashedPassword
        if(userData.password != ''){
            hashedPassword = bcryptjs.hashSync(userData.password, 10)
        }

        let updatedUser
        if(userFile && hashedPassword){
            updatedUser = {
                ...userFound,
                ...userData,
                rePassword: undefined,
                password: hashedPassword,
                image: userFile.filename
            }
        } else if (userFile && !hashedPassword){
            updatedUser = {
                ...userFound,
                ...userData,
                rePassword: undefined,
                password: userFound.password,
                image: userFile.filename
            }
        } else if (hashedPassword && !userFile){
            updatedUser = {
                ...userFound,
                ...userData,
                rePassword: undefined,
                password: hashedPassword,
            }
        } else {
            updatedUser = {
                ...userFound,
                ...userData,
                rePassword: undefined,
                password: userFound.password
            }
        }

        allUsers.splice(id-1, 1, updatedUser)
        
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        
        return true;
    },
    //ELIMINA UN USUARIO DEL JSON
    delete: function (id) {
        let allUsers = this.getData();

        let finalUsers = allUsers.filter(user => user.id != id)
        
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
}