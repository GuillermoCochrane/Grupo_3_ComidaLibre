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
            stylesheet: 'styles_log.css'
        })
    },
    reg: (req,res)=>{
        res.render('register', {
            headTitle: 'Free Food - Registro',
            stylesheet: 'styles_register.css'
        })
    },
}

module.exports = userController;