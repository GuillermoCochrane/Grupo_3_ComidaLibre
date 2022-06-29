const productsController = {
    producto: (req,res)=>{
        res.render('products')
    },
    detail: (req,res)=>{
        res.render('productDetail')
    },
}

module.exports = productsController;