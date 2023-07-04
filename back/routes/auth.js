const router = require('express').Router()
const { authorizer,fieldsValidator } = require('../middelwares')

const authControllers = require('../controllers/auth')

const signupValidator = fieldsValidator('email', 'username', 'password')
const signinValidator = fieldsValidator('email', 'password')


module.exports = (db) => {
    router.post('/signup',fieldsValidator, authControllers.signup(db))
    router.post('/signin',fieldsValidator, authControllers.signin(db))
    router.post('/signout',authorizer,  authControllers.signout(db))

    return router
}