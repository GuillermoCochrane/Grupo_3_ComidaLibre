const db = require("../../database/models")

module.exports = {
  allProducts: (req, res) => {
    db.Product.findAll({
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
      ]
    })
    .then(allProducts => {
      let responseArray = []
      for(let product of allProducts) {
        let resObj = {
          id: product.id,
          name: product.name,
          description: product.description,
          relacionPrincipal: product.product_category,
          detail: `http://localhost:3000/api/products/${product.id}` 
        }
        responseArray.push(resObj)
      }
      let response = {
        count: allProducts.length,
        // countByCategory: 
        products: responseArray
      }
      res.json(response)
    })
    .catch(errors => console.log(errors))
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