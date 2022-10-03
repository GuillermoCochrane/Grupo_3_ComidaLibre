const db = require("../../database/models")
const {Op} = require("sequelize")

module.exports = {
  search: (req, res) => {
    let searchKey = req.params.searchKey
    db.Product.findAll({
      include: ['product_category', 'product_status'],
      where: {
        [Op.or]: [
          {name: { [Op.like]: `%${searchKey}%` } }, 
          {'$product_category.category$': { [Op.like]: `%${searchKey}%` }},
          {'$product_status.status$': { [Op.like]: `%${searchKey}%` }}
        ]
      },
      limit: 7
    })
    .then(products => {
      let response
      if (products.length != 0) {
        response = {
          meta: {
            status: 200,
            length: products.length,
            msg: 'products found'
          },
          data: products
        }
      } else {
        response = {
          meta: {
            status: 204,
            length: products.length,
            msg: 'no products found'
          },
          data: products
        }
      }
      res.json(response)
    })
    .catch( errors => res.json(errors) )
  }
}