const router = require('express').Router()

const imgsControllers = require('../controllers/imgs')

module.exports = (db) => {
    router.post('/',imgsControllers.imgsCountry(db) )


    return router
}