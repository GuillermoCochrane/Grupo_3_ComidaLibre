const mainController = {
    home: (req,res)=>{
        res.render('index')
    },
    cart: (req,res)=>{
        res.render('productCart')
    },
    notFound: (req,res)=>{
        res.render('notFound')
    }
}

module.exports = mainController;