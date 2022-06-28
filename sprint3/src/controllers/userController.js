const userController = {
    profile: (req,res)=>{
        res.render('user')
    },
    h: (req,res)=>{
        res.render('login')
    },
}

module.exports = userController;