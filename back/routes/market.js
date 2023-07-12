const router = require('express').Router()

const locationControllers = require('../controllers/market')

module.exports = (db) => {
    router.post('/', locationControllers.date(db) )


    return router
}