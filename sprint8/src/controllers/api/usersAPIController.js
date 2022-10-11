const db = require("../../database/models")

module.exports = {
  users: async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let allUsers
    try {
      if (isNaN(page)) {
        if (page !== 'all') {
          throw error = { response: 'invalid query' }
        } else {
          allUsers = await db.User.findAndCountAll({
            attributes: { exclude: ['password', 'roles_id'] },
          })
        }
      } else {
        allUsers = await db.User.findAndCountAll({
          attributes: { exclude: ['password', 'roles_id'] },
          offset: (10 * (page - 1)),
          limit: 10
        })
      }
    } catch (error) {
      return res.json(error)
    }

    let responseArray = []
    for(let user of allUsers.rows) {
      let resObj = {
        id: user.id,
        username: user.username,
        email: user.email,
        detail: `http://localhost:3000/api/users/${user.id}` 
      }
      responseArray.push(resObj)
    }
    let response
    if (responseArray.length === 0) {
      response = {
        msg: 'no more users'
      }
    } else {
      response = {
        count: allUsers.count,
        users: responseArray
      }
    }

    return res.json(response)
  },
  oneUser: (req, res) => {
    db.User.findOne({
      attributes: { exclude: ['password', 'roles_id'] },
      where: { id: req.params.id },
      raw: true
    })
    .then(user => {
      let response
      if(user) {
        response = {
          ...user,
          imgURL: `http://localhost:3000/images/avatar/${user.image}`
        }
      } else {
        response = {
          msg: 'user not found'
        }
      }
      res.json(response)
    })
  },
  lastUser: (req, res) => {
    db.User.findOne({
      attributes: { exclude: ['password', 'roles_id'] },
      order: [["id","DESC"]],
      raw: true
    })
    .then(data => {
      let response = {
        ...data,
        imageURL: `http://localhost:3000/images/avatar/${data.image}`
      }
      res.json(response)
    })
    .catch(error => res.json(error))
  },

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
  },
  
  allUsersTable: (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    db.User.findAndCountAll({
      attributes: { exclude: ['password', 'roles_id'] },
    })
    .then(allUsers => {
      let responseArray = []
      for(let user of allUsers.rows) {
        let resObj = {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          address: user.address,
        }
        responseArray.push(resObj)
      }
      let response
      if (responseArray.length === 0) {
        response = {
          msg: 'no more users'
        }
      } else {
        response = {
          count: allUsers.count,
          users: responseArray
        }
      }

      res.json(response)
    })
    .catch(errors => console.log(errors))
  },
}