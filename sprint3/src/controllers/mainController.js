const mainController = {
    home: (req,res)=>{
        res.render('index')
    },
    log: (req,res)=>{
        res.render('login')
    },
    reg: (req,res)=>{
        res.render('register')
    },
    cart: (req,res)=>{
        res.render('productCart')
    },
    notFound: (req,res)=>{
        res.render('notFound')
    }
}

module.exports = mainController;