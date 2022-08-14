const { all } = require('express/lib/application');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let allProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    //LISTADO PRODUCTOS
    producto: (req, res) => {
        res.render('products', {
            headTitle: 'Free Food - Productos',
            stylesheet: 'styles_products.css',
            productList: allProducts,
        });
    },
    //LISTADO POR CATEGORÍA
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
    //DETALLES DE PRODUCTO
    detail: (req, res) => {
        let id = req.params.idProduct;
        let product = allProducts.find((product) => {
            return product.id == id;
        });
        let category = req.params.idCategory;
        let productRel = allProducts.filter((products) => {
            return (products.idCat == category && products.status == 'recomendado');
        });

        res.render('productDetail', {
            headTitle: 'Free Food - Detalle de producto',
            stylesheet: 'styles_productDetail.css',
            product: product,
            productRel: productRel,
            productList: allProducts,
        });
    },
    //FORMULARIO DE CREACIÓN
    create: (req,res)=>{
        res.render('productCreate', {
            headTitle: 'Free Food - Crear Producto',
            stylesheet: 'styles_forms.css'
        })
    },
    //AGREGA UN PRODUCTO AL LISTADO
    store: (req, res, next) => {
        if(!req.file) {
			const error = new Error ("Por favor seleccioná un archivo válido")
			error.httpStatusCode=400
			return next(error)
		} else {
            let newProduct = {
                id: allProducts.length+1,
                idCat: req.body.idCat,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                img: req.file.filename,
                status: req.body.status,
                discountAmount: req.body.discount
            };
            allProducts.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' '));
        };
        
        res.redirect('/products');
    },
    //FORMULARIO DE EDICIÓN DE PRODUCTO
    edit: (req,res)=>{
        res.render('productEdit', {
            headTitle: 'Free Food - Editar Producto',
            stylesheet: 'styles_forms.css',
            producto: allProducts.find(item => item.id == req.params.idProduct)
        })
    },
    //ACTUALIZA INFORMACIÓN DE UN PRODUCTO
    update: (req, res, next) => {
        if(!req.file) {
			const error = new Error ("Por favor seleccioná un archivo válido")
			error.httpStatusCode=400
			return next(error)
		} else {
            for(item of allProducts){
                if(item.id == req.params.idProduct){
                    item.idCat = req.body.idCat
                    item.name = req.body.name
                    item.description = req.body.description
                    item.price = req.body.price
                    item.img = req.file.filename
                    item.status = req.body.status
                    item.discountAmount = req.body.discountAmount 
                }
            }
            fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' ')); 
        };
        res.redirect('/products');
    },
    //ELIMINA UN PRODUCTO DE LA LISTA
    delete: (req, res) => {
        let id = req.params.idProduct;
        let productsFilter = allProducts.filter((product) => {
            return product.id != id;
        });
        allProducts = productsFilter;
        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' '));
        
        res.redirect('/products');
    }
}

module.exports = productsController;