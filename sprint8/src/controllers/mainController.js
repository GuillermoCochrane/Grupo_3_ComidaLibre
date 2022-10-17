const db = require("../database/models");
const sequelize = require('sequelize')
const { Op } = require('sequelize') 

module.exports = {
  //VISTA DEL HOME
  home: async (req, res) => {
    let randomRecomended = await db.Product.findAll({
      include: ["product_category", "product_status"],
      where: { statuses_id: 3 },
      order: sequelize.literal('rand()'),
      limit: 4,
      raw: true,
      nest: true,
    });
    let randomMostSold = await db.Product.findAll({
      include: ["product_category", "product_status"],
      where: { statuses_id: 4 },
      order: sequelize.literal('rand()'),
      limit: 4,
      raw: true,
      nest: true,
    });
    return res.render("index", {
      headTitle: "Bienvenidos a Free Food",
      stylesheet: "",
      productList: [randomRecomended, randomMostSold],
    });
  },
  //VISTA DEL CARRITO
  cart: async (req, res) => {
    let userId = req.session.userLogged.id;
    let cartList = await db.Cart.findAll({
      include: ["cart_product"],
      where: { users_id: userId },
      raw: true,
      nest: true,
    });
    if (cartList.length > 0) {
      let subtotal = 0;
      let shipping = 50;
      for (let product of cartList) {
        let price = product.cart_product.price
        let discount = product.cart_product.discount
        let quantity = product.quantity
        let priceWithDiscount = (Number(price) - (discount / 100) * Number(price)) * quantity;
        subtotal = subtotal + priceWithDiscount;
      }
      let total = subtotal + shipping;
      //shipping = numero fijo
      return res.render("cart", {
        headTitle: "Free Food - Carrito de compras",
        stylesheet: "styles_car.css",
        productList: cartList,
        subtotal: subtotal.toFixed(2),
        shipping: shipping,
        total: total.toFixed(2),
      });
    } else {
      return res.render("cart", {
        headTitle: "Free Food - Carrito de compras",
        stylesheet: "styles_car.css",
      });
    }
  },
  //AGREGA PRODUCTOS AL CARRITO
  cartAdd: (req, res) => {
    let productId = req.params.idProduct;
    let userId = req.session.userLogged.id;
    let quantity = req.body.quantity;
    db.Cart.create({
      products_id: productId,
      users_id: userId,
      quantity: quantity,
    });
    return res.redirect("/cart");
  },
  //ELIMINA PRODUCTOS DEL CARRITO
  cartDeleteOne: (req, res) => {
    let productId = req.params.idProduct;
    let userId = req.session.userLogged.id;
    db.Cart.destroy({ where: { products_id: productId, users_id: userId } });
    return res.redirect("/cart");
  },
  cartDeleteAll: (req, res) => {
    let userId = req.session.userLogged.id;
    db.Cart.destroy({ where: { users_id: userId } });
    return res.redirect("/cart");
  },
  //FUNCIONALIDAD DE LA BARRA DE BUSQUEDA
  search: async (req, res) => {
    let searchKey = req.query.key;
    if(searchKey){
      let { rows, count } = await db.Product.findAndCountAll({
        include: ['product_category', 'product_status'],
        where: {
          [Op.or]: [
            {name: { [Op.like]: `%${searchKey}%` } }, 
            {'$product_category.category$': { [Op.like]: `%${searchKey}%` }},
            {'$product_status.status$': { [Op.like]: `%${searchKey}%` }}
          ]
        },
        raw: true,
        nest: true,
      });
      return res.render("products/products", {
        headTitle: "Free Food - Resultados de Búsqueda",
        stylesheet: "styles_products.css",
        productList: rows,
        searchKey: searchKey,
        productCount: count,
        pages: (count/10)
      });
    } else {
      return res.redirect('/')
    }
  },
  favAdd: (req, res) => {
    let productId = req.params.idProduct;
    let userId = req.session.userLogged.id;
    db.Favourite.create({
      products_id: productId,
      users_id: userId,
    });
    return res.redirect("/products");
  },
  favDelete: (req, res) => {
    let productId = req.params.idProduct;
    let userId = req.session.userLogged.id;
    db.Favourite.destroy({ where: { products_id: productId, users_id: userId }, force: true });
    return res.redirect("/products");
  },
  sale: async (req, res) => {
    let userId = req.session.userLogged.id;
    let cartList = await db.Cart.findAll({
      include: ["cart_product"],
      where: { users_id: userId },
      raw: true,
      nest: true,
    });
    if (cartList.length > 0) {
      await db.Sale.create({
        total: 0,
        users_id: userId,
        payment_method: 'debit'
      });
      let sale = await db.Sale.findOne({ 
        attributes: ['id'], 
        order: [['id', 'DESC']], 
        raw: true 
      })
      let subtotal = 0;
      let shipping = 50;
      for (let product of cartList) {
        let price = product.cart_product.price
        let discount = product.cart_product.discount
        let quantity = product.quantity
        let productId = product.cart_product.id
        let productPrice = (Number(price) - (discount / 100) * Number(price)) * quantity;
        subtotal = subtotal + productPrice;

        db.SaleDetail.create({
          sales_id: sale.id,
          products_id: productId,
          quantity: quantity,
          discount: discount,
          unit_price: Number(price),
          total: productPrice
        })
      }
      let total = subtotal + shipping;
      db.Sale.update({total: total}  , {where: {id: sale.id}} )
      db.Cart.destroy({ where: { users_id: userId } });
    } else {
      return res.redirect("/cart");
    }
    return res.redirect("/");
  },
};
