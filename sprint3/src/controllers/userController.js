const userController = {
    profile: (req,res)=>{
        res.render('user')
    },
    log: (req,res)=>{
        res.render('login')
    },
    reg: (req,res)=>{
        res.render('register')
    },
}

module.exports = userController;