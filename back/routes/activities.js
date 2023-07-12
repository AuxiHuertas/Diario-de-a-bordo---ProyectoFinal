const router = require('express').Router()

const activitiesController = require('../controllers/activities')

module.exports = (db) => {
    router.post('/', activitiesController.activityCountry(db) )


    return router
}