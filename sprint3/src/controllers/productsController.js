const products= require('./products') //agregado temporalmente por guille hasta que eset disponible la base de datos

const productsController = {
    producto: (req,res)=>{
        res.render('products', {
            headTitle: 'Free Food - Productos',
            stylesheet: 'styles_productDetail.css',
        })
    },
    category: (req,res)=>{
        res.render('products', {
            headTitle: 'Free Food - Categoria',
            stylesheet: 'styles_productDetail.css',
        })
    },
    detail: (req,res)=>{
        res.render('productDetail', {
            headTitle: 'Free Food - Detalle de producto',
            stylesheet: 'styles_productDetail.css',
        })
    },
    //Agregó FC
    add: (req,res)=>{
        res.render('create', {
            headTitle: 'Free Food - Crear Producto',
            stylesheet: 'styles_register.css'
        })
    },
    //Agrego Guille
    edit: (req,res)=>{
        res.render('productEdit', {
            headTitle: 'Free Food - Editar Producto',
            stylesheet: 'styles_register.css',
            products: products,
        })
    },
}

module.exports = productsController;