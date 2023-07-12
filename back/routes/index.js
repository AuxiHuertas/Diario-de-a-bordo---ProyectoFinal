const router = require ('express').Router()
const authRoutes = require ('./auth')
const userRoutes = require ('./users')
const marketRoutes = require ('./market')
const activitiesRoutes = require('./activities')

module.exports = (db) => {
    router.use('/auth', authRoutes(db))
    router.use('/users', userRoutes())
    router.use('/market', marketRoutes(db))
    router.use('/activities',activitiesRoutes(db) )

    return router
}