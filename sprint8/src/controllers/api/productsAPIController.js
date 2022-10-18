const db = require("../../database/models")
const { validationResult } = require('express-validator')

module.exports = {
  products: async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let allProducts
    try {
      if (isNaN(page)) {
        if (page !== 'all') {
          throw error = { response: 'invalid query' }
        } else {
          allProducts = await db.Product.findAndCountAll({
            include: [
              "product_category", 
              "product_status", 
              {
                model: db.User,
                as: "products_users",
                attributes: { exclude: ['password', 'roles_id']}
              },
              {
                model: db.User,
                as: "products_cart",
                attributes: { exclude: ['password', 'roles_id']}
              } 
            ],
            distinct: true,
          })
        }
      } else {
        allProducts = await db.Product.findAndCountAll({
          include: [
            "product_category", 
            "product_status", 
            {
              model: db.User,
              as: "products_users",
              attributes: { exclude: ['password', 'roles_id']}
            },
            {
              model: db.User,
              as: "products_cart",
              attributes: { exclude: ['password', 'roles_id']}
            } 
          ],
          distinct: true,
          offset: (10 * (page - 1)),
          limit: 10
        })
      }
    } catch (error) {
      return res.json(error)
    }

    let allCategories = await db.Category.findAll({
      include: ["category_products"]
    })
    let allStatus = await db.Status.findAll({
      include: ["status_products"]
    })
    let responseArray = []
    for(let product of allProducts.rows) {
      let resObj = {
        id: product.id,
        name: product.name,
        description: product.description,
        mainRelation: product.product_category,
        imgURL: `http://localhost:3000/images/products/${product.image}`,
        detail: `http://localhost:3000/api/products/${product.id}` 
      }
      responseArray.push(resObj)
    }
    let countByCategory = []
    for(let category of allCategories) {
      countByCategory.push({
        id: category.id,
        name: category.category,
        count: category.category_products.length
      })
    }
    let countByStatus = []
    for(let status of allStatus) {
      countByStatus.push({
        id: status.id,
        name: status.status,
        count: status.status_products.length
      })
    }
    let response
    if (responseArray.length === 0) {
      response = {
        msg: 'no more products'
      }
    } else {
      response = {
        count: allProducts.count,
        countByCategory: countByCategory,
        countByStatus: countByStatus,
        products: responseArray
      }
    }
    return res.json(response)
  },
  oneProduct: (req, res) => {
    db.Product.findOne({
      include: [
        "product_category", 
        "product_status", 
        {
          model: db.User,
          as: "products_users",
          attributes: { exclude: ['password', 'roles_id']}
        },
        {
          model: db.User,
          as: "products_cart",
          attributes: { exclude: ['password', 'roles_id']}
        } 
      ],
      where: { id: req.params.id }
    })
    .then(product => {
      let response
      if(product) {
        response = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          discount: product.discount,
          imgURL: `http://localhost:3000/images/products/${product.image}`,
          relaciones: [
            product.product_category, 
            product.product_status, 
            product.products_users,
            product.products_cart 
          ],
        }
      } else {
        response = {
          msg: 'product not found'
        }
      }
      res.json(response)
    })
    .catch(errors => console.log(errors))
  },
  sales: (req, res) => {
    db.Sale.findAndCountAll({
      include: ["sale_details"],
      distinct: true,
      order: [["created_at","DESC"]],
      limit: 5
    })
    .then(allSales => {
      let response
      if (allSales.count === 0) {
        response = {
          msg: "no hay ventas registradas"
        }
      } else {
        response = {
          total: allSales.count,
          lastSales: allSales.rows
        }
      }
      res.json(response)
    })
    .catch(errors => console.log(errors))
  },
  lastProduct: (req, res) => {
    db.Product.findOne({
      include: [
        "product_category", 
        "product_status", 
        {
          model: db.User,
          as: "products_users",
          attributes: { exclude: ['password', 'roles_id']}
        },
        {
          model: db.User,
          as: "products_cart",
          attributes: { exclude: ['password', 'roles_id']}
        } 
      ],
      order: [["id","DESC"]],
    })
    .then(data => {
      let response = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        discount: data.discount,
        imgURL: `http://localhost:3000/images/products/${data.image}`,
        relaciones: [
          data.product_category, 
          data.product_status, 
          data.products_users,
          data.products_cart 
        ],
      }
      res.json(response)
    })
    .catch(error => res.json(error))
  },

  findByName: (req, res) => {
    db.Product.findOne({
      where: { name: req.params.productname }
    })
    .then(product => {
      let response
      if (product) {
        response = {
          found: true,
          data: product
        }
      } else {
        response = { found: false }
      }
      res.json(response)
    })
    .catch( errors => res.json(errors) )
  },

  //testing
  create: async(req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw {errors: errors.mapped()}
      } else {
        let body = { ...req.body };
        let newProduct = {};
        if (req.file) {
          newProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
            discount: body.discount,
            categories_id: body.idCat,
            statuses_id: body.status,
            image: req.file.filename,
          }
        } else {
          newProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
            discount: body.discount,
            categories_id: body.idCat,
            statuses_id: body.status,
          };
        };
        let data = await db.Product.create(newProduct)
        if (data) {
          let response = {
            meta: {
              status: 200,
              msg: 'Producto creado'
            },
            data: data
          }
          return res.json(response)
        } else {
          throw errors = {response : 'error al crear producto'}
        }
      }
    } catch (error) {
      return res.json(error)
    }
  },
  edit: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw {errors: errors.mapped()}
      } else {
        let body = { ...req.body };
        let productId = req.params.idProduct;
        let updatedProduct;
        if (req.file) {
          updatedProduct = {
            name: body.name,
            price: body.price,
            image: req.file.filename,
            description: body.description,
            discount: body.discount,
            categories_id: body.idCat,
            statuses_id: body.status,
          } 
        } else {
          updatedProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
            discount: body.discount,
            categories_id: body.idCat,
            statuses_id: body.status,
          };
        };
        let data = await db.Product.update(updatedProduct, { where: { id: productId } })
        if (data) {
          let response = {
            meta: {
              status: 200,
              msg: 'Producto actualizado'
            },
            data: data
          }
          return res.json(response)
        }
      } 
    } catch (error) {
      return res.json(error)
    }
  },
  delete: (req, res) => {
    let productId = req.params.idProduct;
    db.Cart.destroy({ where: { products_id: productId }, force: true });
    db.Favourite.destroy({ where: { products_id: productId }, force: true });
    db.SaleDetail.destroy({ where: { products_id: productId }, force: true });
    db.Product.destroy({ where: { id: productId }, force: true })
      .then(data => {
        if (data === 1) {
          let response = {
            meta: {
              status: 200,
              msg: 'Producto borrado'
            },
            data: data
          }
          return res.json(response)
        } else {
          let response = {
            meta: {
              status: 200,
              msg: 'Id producto no encontrado'
            },
            data: data
          }
          return res.json(response)
        }
      })
      .catch(errors => res.json(errors));
  }
}