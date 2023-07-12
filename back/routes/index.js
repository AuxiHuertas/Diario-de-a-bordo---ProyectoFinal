const router = require ('express').Router()
const authRoutes = require ('./auth')
const userRoutes = require ('./users')
const marketRoutes = require ('./market')

module.exports = (db) => {
    router.use('/auth', authRoutes(db))
    router.use('/users', userRoutes())
    router.use('/market', marketRoutes(db))

    return router
}