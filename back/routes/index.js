const router = require ('express').Router()
const authRoutes = require ('./auth')
const userRoutes = require ('./users')

module.exports = (db) => {
    router.use('/auth', authRoutes(db))
    router.use('/users', userRoutes())

    return router
}