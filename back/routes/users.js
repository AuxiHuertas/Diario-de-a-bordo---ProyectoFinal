const router = require('express').Router()
const { authorizer } = require('../middelwares')

const usersControllers = require('../controllers/users')

module.exports = (db) => {
    router.get('/', authorizer, usersControllers.getUser(db))


    return router
}