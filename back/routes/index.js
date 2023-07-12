const router = require ('express').Router()
const authRoutes = require ('./auth')
const userRoutes = require ('./users')
const marketRoutes = require ('./market')
const activitiesRoutes = require('./activities')
const imgsRoutes = require ('./imgs')

module.exports = (db) => {
    router.use('/auth', authRoutes(db))
    router.use('/users', userRoutes(db))
    router.use('/market', marketRoutes(db))
    router.use('/activities',activitiesRoutes(db) )
    router.use('/imgs', imgsRoutes (db))

    return router
}