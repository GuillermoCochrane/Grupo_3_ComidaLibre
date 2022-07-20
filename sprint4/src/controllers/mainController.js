const fs = require('fs');
const path = require('path');
const productsController = require('./productsController');
const allProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

const mainController = {
    home: (req,res)=>{
        // Recorre el array de allProducts y separa los productos que están en recomendados a un array diferente
        let recomendation = [];
        let noRecomendation = [];
        allProducts.forEach((product)=>{
            if(product.status == 'recomendado'){
                recomendation.push(product);
            }else{
                noRecomendation.push(product);
            }
        }
        );
        //Escoge 4 productos aleatorios del array de recomendados
        let randomRecomendation = [];
        for(let i = 0; i < 4; i++){
            let random = Math.floor(Math.random() * recomendation.length);
            randomRecomendation.push(recomendation[random]);
            recomendation.splice(random, 1);
        }
        //Escoge 4 productos aleatorios del array de no recomendados
        let randomNoRecomendation = [];
        for(let i = 0; i < 4; i++){
            let random = Math.floor(Math.random() * noRecomendation.length);
            randomNoRecomendation.push(noRecomendation[random]);
            noRecomendation.splice(random, 1);
        }
        
        res.render('index', {
            headTitle: 'Bienvenidos a Free Food',
            stylesheet: '',
            productList: [randomRecomendation, randomNoRecomendation],
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