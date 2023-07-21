const router = require('express').Router()
const imgsControllers = require('../controllers/imgs')
const multerCloudinary = require('../middelwares/multer')


module.exports = (db) => {
    router.post('/', multerCloudinary.single("image"), imgsControllers.imgsCountry(db) )
    router.delete('/delete',imgsControllers.deleteImgs(db))


    return router
}