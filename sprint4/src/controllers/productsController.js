const fs = require('fs');
const path = require('path');
const allProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

const productsController = {
    //LISTADO PRODUCTOS
    producto: (req, res) => {
        res.render('products', {
            headTitle: 'Free Food - Productos',
            stylesheet: 'styles_products.css',
            productList: allProducts,
        });
    },
    //LISTADO POR CATEGORIA
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
    //MUSTRA FORMULARIO DE CREACION
    create: (req,res)=>{
        res.render('productCreate', {
            headTitle: 'Free Food - Crear Producto',
            stylesheet: 'styles_forms.css'
        })
    },
    //AGRAGA UN PRODUCTO AL LISTADO
    add: (req, res, next) => {
        if(!req.file) {
			const error = new Error ("Por favor seleccionar un archivo válido")
			error.httpStatusCode=400
			return next(error)
		} else {
            let newProduct = {
                id: allProducts.length+2,
                idCat: req.body.idCat,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                img: req.file.filename,
                status: req.body.status,
                discountAmount: req.body.discount
            };
            allProducts.push(newProduct);
            fs.writeFileSync((path.join(__dirname, '../data/products.json')), JSON.stringify(allProducts));
        };
        
        res.redirect('/products');
    },
    //MUSTRA FORMULARIO DE EDICION DE PRODUCTO
    edit: (req,res)=>{
        res.render('productEdit', {
            headTitle: 'Free Food - Editar Producto',
            stylesheet: 'styles_forms.css',
            producto: allProducts.find(item => item.id == req.params.idProduct)
        })
    },
    //ACTUALISA INFORMACION DE UN PRODUCTO
    update: (req, res, next) => {
        if(!req.file) {
			const error = new Error ("Por favor seleccionar un archivo válido")
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
            fs.writeFileSync((path.join(__dirname, '../data/products.json')), JSON.stringify(allProducts)); 
        };
        res.redirect('/products');
    },
    //BORRA UN PRODUCTO DE LA LISTA
    delete: (req, res) => {
        let itemToDelete = allProducts.indexOf(allProducts.find(item => item.id == req.params.idProduct))
		allProducts.splice(itemToDelete, 1)
        fs.writeFileSync((path.join(__dirname, '../data/products.json')), JSON.stringify(allProducts));

        res.redirect('/products');
    }

}

module.exports = productsController;