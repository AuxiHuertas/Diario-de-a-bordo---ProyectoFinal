const router = require('express').Router()

const locationControllers = require('../controllers/market')
const deleteControllers = require ('../controllers/market')

module.exports = (db) => {
    router.post('/', locationControllers.date(db) );
    router.delete('/delete',deleteControllers.delete (db) );

    return router
}