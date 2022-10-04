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
      let response = {
        data: allProducts
      }
      res.json(response)
    })
    .catch(errors => console.log(errors))
  },
  oneProduct: (req, res) => {

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