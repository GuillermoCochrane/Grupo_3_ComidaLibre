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
    }
    //
}

module.exports = productsController;