const Product = require('../models/Product')
const { validationResult } = require('express-validator')

module.exports = {
    //LISTADO PRODUCTOS
    producto: (req, res) => {
        return res.render('products/products', {
            headTitle: 'Free Food - Productos',
            stylesheet: 'styles_products.css',
            productList: Product.getData(),
        });
    },
    //LISTADO POR CATEGORÍA
    category: (req, res) => {
        let category = req.params.idCategory;
        let productCategory = Product.getData().filter((products) => {
            return products.idCat == category;
        });

        return res.render('products/products', {
            headTitle: 'Free Food - Categoría',
            stylesheet: 'styles_products.css',
            productList: productCategory,
        });
    },
    //DETALLES DE PRODUCTO
    detail: (req, res) => {

        let category = req.params.idCategory;
        let productRel = Product.getData().filter((products) => {
            return (products.idCat == category && products.status == 'recomendado');
        });

        return res.render('products/productDetail', {
            headTitle: 'Free Food - Detalle de producto',
            stylesheet: 'styles_productDetail.css',
            product: Product.findById(req.params.idProduct),
            productRel: productRel,
            productList: Product.getData(),
            id: req.params.idProduct
        });
    },
    //FORMULARIO DE CREACIÓN
    create: (req,res)=>{
        return res.render('products/productCreate', {
            headTitle: 'Free Food - Crear Producto',
            stylesheet: 'styles_forms.css'
        })
    },
    //AGREGA UN PRODUCTO AL LISTADO
    store: (req, res) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.render('products/productCreate', {
                headTitle: 'Free Food - Crear Producto',
                stylesheet: 'styles_forms.css',
                errors: errors.mapped()
            })
        }
            
        Product.create(req.body, req.file)
        
        return res.redirect('/products');
    },
    //FORMULARIO DE EDICIÓN DE PRODUCTO
    edit: (req,res)=>{
        return res.render('products/productEdit', {
            headTitle: 'Free Food - Editar Producto',
            stylesheet: 'styles_forms.css',
            producto: Product.findById(req.params.idProduct)
        })
    },
    //ACTUALIZA INFORMACIÓN DE UN PRODUCTO
    update: (req, res) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.render('products/productEdit', {
                headTitle: 'Free Food - Editar Producto',
                stylesheet: 'styles_forms.css',
                oldData: Product.findById(req.params.idProduct),
                errors: errors.mapped()
            })
        }
        
        Product.edit(req.params.idProduct, req.body, req.file)
        return res.redirect('/products');
    },
    //ELIMINA UN PRODUCTO DE LA LISTA
    delete: (req, res) => {
        Product.delete(req.params.idProduct)
        
        return res.redirect('/products');
    }
}
