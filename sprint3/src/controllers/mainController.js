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

//Agregó FC
    add: (req,res)=>{
        res.render('create', {
            headTitle: 'Free Food - Crear Producto',
            stylesheet: 'styles_register.css'
        
        })
    }  
//

}

module.exports = mainController;