const router = require('express').Router()

const activitiesController = require('../controllers/activities')

module.exports = (db) => {
    router.post('/', activitiesController.activityCountry(db) ),
    router.delete('/delete/:id', activitiesController.deleteAct(db) ),
    router.patch('/update', activitiesController.updateAct(db))

    return router
}