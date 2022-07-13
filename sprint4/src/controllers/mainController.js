const fs = require('fs');
const path = require('path');
const productsController = require('./productsController');
const fileProducts = path.join(__dirname, '../data/products.json');
const allProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/products.json'), 'utf-8'));

const mainController = {
    home: (req,res)=>{
        // filter products by status = recommended
        let recommendedProducts = allProducts.filter(product => product.status === 'recomendado');
        // filter products by status = new
        let newProducts = allProducts.filter(product => product.status === 'novedad');
        // filter products by status = sale
        let saleProducts = allProducts.filter(product => product.status === 'mas vendido');

        // Choose 4 random products from recommendedProducts
        let randomRecommendedProducts = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = Math.floor(Math.random() * recommendedProducts.length);
            randomRecommendedProducts.push(recommendedProducts[randomIndex]);
            recommendedProducts.splice(randomIndex, 1);
        }
        // Choose 4 random products from newProducts
        let randomNewProducts = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = Math.floor(Math.random() * newProducts.length);
            randomNewProducts.push(newProducts[randomIndex]);
            newProducts.splice(randomIndex, 1);
        }
        // Choose 4 random products from saleProducts
        let randomSaleProducts = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = Math.floor(Math.random() * saleProducts.length);
            randomSaleProducts.push(saleProducts[randomIndex]);
            saleProducts.splice(randomIndex, 1);
        }

        
        res.render('index', {
            headTitle: 'Bienvenidos a Free Food',
            stylesheet: '',
            productList: [randomRecommendedProducts, randomNewProducts, randomSaleProducts],
        })
    },
    cart: (req,res)=>{
        const arrayList = [];
        // Funcion para generar el array de productos
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * allProducts.length);
            arrayList.push(allProducts[random]);
            allProducts.splice(random, 1);
            
        }
        
        res.render('productCart', {
            headTitle: 'Free Food - Carrito de compras',
            stylesheet: 'styles_car.css',
            productList: arrayList,
        })
    },
    notFound: (req,res)=>{
        res.render('notFound')
    },
}

module.exports = mainController;