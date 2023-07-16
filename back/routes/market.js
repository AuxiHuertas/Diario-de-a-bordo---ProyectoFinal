const router = require('express').Router()

const locationControllers = require('../controllers/market')
// const deleteControllers = require ('../controllers/market')

module.exports = (db) => {
    router.post('/', locationControllers.date(db) );
    router.delete('/delete',locationControllers.delete (db) );
    router.patch('/update', locationControllers.update(db))

    return router
}