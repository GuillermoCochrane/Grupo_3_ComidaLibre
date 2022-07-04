const fs = require('fs');
const path = require('path');
const allProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../productos.json'), 'utf-8'));

const productsController = {
    producto: (req, res) => {
        res.render('products', {
            headTitle: 'Free Food - Productos',
            stylesheet: 'styles_products.css',
            productList: allProducts,
        });
    },
    category: (req, res) => {
        let category = req.params.idCategory;
        let productCategory = allProducts.filter((products) => {
            return products.idCat == category;
        });

        res.render('products', {
            headTitle: 'Free Food - Categoría',
            stylesheet: 'styles_products.css',
            productList: productCategory,
        });
    },
    detail: (req, res) => {
        let id = req.params.idProduct;
        let product = allProducts.find((product) => {
            return product.id == id;
        });
        let category = req.params.idCategory;
        let productRel = allProducts.filter((products) => {
            return (products.idCat == category && products.reco == true);
        });

        res.render('productDetail', {
            headTitle: 'Free Food - Detalle de producto',
            stylesheet: 'styles_productDetail.css',
            product: product,
            productRel: productRel, 
        });
    },
}

module.exports = productsController;