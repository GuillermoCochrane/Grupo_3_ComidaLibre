const db = require("../../database/models")

module.exports = {
  findByUsername: (req, res) => {
    db.User.findOne({
      attributes: {exclude: ['password']},
      where: { username: req.params.username }
    })
    .then(user => {
      let response
      if(user) {
        response = { 
          found: true,
          data: user 
        }
      } else {
        response = { found: false }
      };
      res.json(response)
    })
    .catch( errors => res.json(errors) )
  },

  findByEmail: (req, res) => {
    db.User.findOne({
      attributes: {exclude: ['password']},
      where: { email: req.params.email }
    })
    .then(user => {
      let response
      if(user) {
        response = { 
          found: true,
          data: user
        }
      } else {
        response = { found: false }
      };
      res.json(response)
    })
    .catch( errors => res.json(errors) )
  }
}