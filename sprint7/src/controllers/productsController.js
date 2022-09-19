const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  //LISTADO PRODUCTOS
  producto: async (req, res) => {
    let allProducts
    let paramI
    let paramO
    let paramP
    let productCount = await db.Product.count();
    let pages = Math.ceil(productCount/15)
    if(req.query.p && req.query.p > 0 && req.query.p <= pages){
      paramP = req.query.p
      if(req.query.i === 'name' || req.query.i === 'discount' || req.query.i === 'price'){
        paramI = req.query.i
        if(req.query.o === 'ASC' || req.query.o === 'DESC') {
          paramO = req.query.o
          allProducts = await db.Product.findAll({
            include: ["product_category", "product_status"],
            order: [[paramI , paramO]],
            offset: (15 * (paramP-1)),
            limit: 15,
            raw: true,
            nest: true,
          });
        } else {
          allProducts = await db.Product.findAll({
            include: ["product_category", "product_status"],
            order: [[paramI]],
            offset: (15 * (paramP-1)),
            limit: 15,
            raw: true,
            nest: true,
          });
        }
      } else {
        allProducts = await db.Product.findAll({
          include: ["product_category", "product_status"],
          offset: (15 * (paramP-1)),
          limit: 15,
          raw: true,
          nest: true,
        });
      }
    } else {
      allProducts = await db.Product.findAll({
        include: ["product_category", "product_status"],
        limit: 15,
        raw: true,
        nest: true,
      });
    }
    return res.render("products/products", {
      headTitle: "Free Food - Productos",
      stylesheet: "styles_products.css",
      productList: allProducts,
      productCount: productCount,
      pages: pages
    });
  },
  //LISTADO POR CATEGORÍA
  category: async (req, res) => {
    let productCount = await db.Product.count();
    let pages = Math.ceil(productCount/15)
    let categoryId = req.params.idCategory;
    let productList = await db.Product.findAll({
      include: ["product_category", "product_status"],
      where: { categories_id: categoryId },
      raw: true,
      nest: true,
    });
    return res.render("products/products", {
      headTitle: "Free Food - Categoría",
      stylesheet: "styles_products.css",
      productList: productList,
      productCount: productCount,
      pages: pages
    });
  },
  //DETALLES DE PRODUCTO
  detail: async (req, res) => {
    let categoryId = req.params.idCategory;
    let productId = req.params.idProduct;
    let allProducts = await db.Product.findAll();
    let relatedProducts = await db.Product.findAll({
      where: {
        categories_id: categoryId,
        statuses_id: 3,
      },
    });
    let product = await db.Product.findOne({ where: { id: productId } });
    return res.render("products/productDetail", {
      headTitle: "Free Food - Detalle de producto",
      stylesheet: "styles_productDetail.css",
      product: product,
      productRel: relatedProducts,
      productList: allProducts,
    });
  },
  //FORMULARIO DE CREACIÓN
  create: (req, res) => {
    return res.render("products/productCreate", {
      headTitle: "Free Food - Crear Producto",
      stylesheet: "styles_forms.css",
    });
  },
  //AGREGA UN PRODUCTO AL LISTADO
  store: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("products/productCreate", {
        headTitle: "Free Food - Crear Producto",
        stylesheet: "styles_forms.css",
        errors: errors.mapped(),
      });
    }
    let data = { ...req.body };
    let newProduct = {};
    if (req.file) {
      newProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        discount: data.discount,
        categories_id: data.idCat,
        statuses_id: data.status,
        image: req.file.filename,
      };
      db.Product.create(newProduct);
    } else {
      newProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        discount: data.discount,
        categories_id: data.idCat,
        statuses_id: data.status,
      };
      db.Product.create(newProduct);
    }
    return res.redirect("/products");
  },
  //FORMULARIO DE EDICIÓN DE PRODUCTO
  edit: async (req, res) => {
    let productId = req.params.idProduct;
    let productToEdit = await db.Product.findOne({ where: { id: productId } });
    return res.render("products/productEdit", {
      headTitle: "Free Food - Editar Producto",
      stylesheet: "styles_forms.css",
      producto: productToEdit,
    });
  },
  //ACTUALIZA INFORMACIÓN DE UN PRODUCTO
  update: async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let oldData = req.body
      let productId = req.params.idProduct;
      let product = await db.Product.findOne({
        where: { id: productId },
        raw: true,
      });
      return res.render("products/productEdit", {
        headTitle: "Free Food - Editar Producto",
        stylesheet: "styles_forms.css",
        oldData: oldData,
        errors: errors.mapped(),
        producto: product
      });
    }
    let data = { ...req.body };
    let productId = req.params.idProduct;
    let updatedProduct;
    if (req.file) {
      updatedProduct = {
        name: data.name,
        price: data.price,
        image: req.file.filename,
        description: data.description,
        discount: data.discount,
        categories_id: data.idCat,
        statuses_id: data.status,
      };
      db.Product.update(updatedProduct, { where: { id: productId } });
    } else {
      updatedProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        discount: data.discount,
        categories_id: data.idCat,
        statuses_id: data.status,
      };
      db.Product.update(updatedProduct, { where: { id: productId } });
    }
    return res.redirect("/products");
  },
  //ELIMINA UN PRODUCTO DE LA LISTA
  delete: (req, res) => {
    let productId = req.params.idProduct;
    db.Product.destroy({ where: { id: productId } });
    return res.redirect("/products");
  },
};
