const mainController = {
    home: (req,res)=>{
        res.render('index', {
            headTitle: 'Bienvenidos a Free Food',
            stylesheet: '',
        })
    },
    cart: (req,res)=>{
        res.render('productCart', {
            headTitle: 'Free Food - Carrito de compras',
            stylesheet: 'styles_car.css',
        })
    },
    notFound: (req,res)=>{
        res.render('notFound')
    },
}

module.exports = mainController;