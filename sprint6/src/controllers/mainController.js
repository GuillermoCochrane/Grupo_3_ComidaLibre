const Product = require('../models/Product')

module.exports = {
    //VISTA DEL HOME
    home: (req,res) => {
        // Recorre el array de allProducts y separa los productos que están en recomendados a un array diferente
        let recomendation = [];
        let noRecomendation = [];
        Product.getData().forEach((product)=>{
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
    //VISTA DEL CARRITO
    cart: (req,res) => {
        if( req.cookies.cart ) {
            let count = 0
            for (i = 0; i < req.cookies.cart.length; i++) {
                count = count + req.cookies.cart[i].price
            }
          
            //shipping = numero fijo
            return res.render('cart', {
                headTitle: 'Free Food - Carrito de compras',
                stylesheet: 'styles_car.css',
                productList: req.cookies.cart,
                subtotal: count.toFixed(2),
                shipping: 50,
                total: (count + 50).toFixed(2)
            })
        }
        
        return res.render('cart', {
            headTitle: 'Free Food - Carrito de compras',
            stylesheet: 'styles_car.css',
        })
    },
    //AGREGA PRODUCTOS AL CARRITO
    cartAdd: (req, res) => {
        if( req.session.cart ) {
            let productToCart = Product.findById( req.params.id )

            for (i = 0; i < req.body.quantity; i++) {
                req.session.cart.push(productToCart)
            }
            res.cookie( 'cart', req.session.cart, { maxAge: 60000*5 })

        } else {
            req.session.cart = []
            let productToCart = Product.findById( req.params.id )

            for (i = 0; i < req.body.quantity; i++) {
                req.session.cart.push(productToCart)
            }
            res.cookie( 'cart', req.session.cart, { maxAge: 60000*5 })
        }
        return res.redirect('/cart')

    },
    //ELIMINA PRODUCTOS DEL CARRITO
    cartDelete: (req, res) => {
        if( req.params.id && req.session.cart.length > 1) {
            for(let i=0; i<req.session.cart.length; i++){
                if( req.session.cart[i].id == req.params.id ) {
                    req.session.cart.splice(i, 1)
                }
                break;
            }
            res.cookie( 'cart', req.session.cart, { maxAge: 60000*5 })
            return res.redirect('/cart')
        }
        
        delete req.session.cart
        res.clearCookie( 'cart' );
        return res.redirect('/cart')
    },
    //FUNCIONALIDAD DE LA BARRA DE BUSQUEDA
    search: (req, res) => {
		let busqueda = req.query.searchBar;
		let resultado = [];
        let allProducts = Product.getData();
        if(busqueda){
            for (let i=0; i< allProducts.length; i++){
                if ((allProducts[i].name.toUpperCase()).includes(busqueda.toUpperCase()) || 
                    (allProducts[i].status.toUpperCase()).includes(busqueda.toUpperCase()) || 
                    (allProducts[i].idCat.toUpperCase()).includes(busqueda.toUpperCase())){
                    resultado.push(allProducts[i]);
                }
            };
        } else {
            return res.redirect('/')
        }
		
		let cantidad = resultado.length;

		res.render('products/products',{
            headTitle: 'Free Food - Resultados de Búsqueda',
            stylesheet: 'styles_products.css',
			productList: resultado,
			cantidad: cantidad,
            }
        );
	},
}