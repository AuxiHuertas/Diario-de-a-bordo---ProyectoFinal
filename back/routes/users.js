const router = require('express').Router()
const { authorizer } = require('../middelwares')

const usersControllers = require('../controllers/users')

module.exports = () => {
    router.get('/', authorizer, usersControllers.getUser())


    return router
}