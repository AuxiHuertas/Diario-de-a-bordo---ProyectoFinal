const router = require('express').Router()

const imgsControllers = require('../controllers/imgs')


module.exports = (db) => {
    router.post('/',imgsControllers.imgsCountry(db) )
    router.delete('/delete',imgsControllers.deleteImgs(db))


    return router
}