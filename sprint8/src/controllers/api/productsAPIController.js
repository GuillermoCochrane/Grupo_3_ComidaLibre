const db = require("../../database/models")

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
  }
}