require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
var cors = require('cors')
const {db, cors, options} = require('./configs')
const errors = require('./misc/errors')

const app = express()

app.use(cors(options))
app.use(express.json())
app.use(cookieParser())

const routes = require('./routes')

app.use(routes(db))


app.use((req, res, next) => {
    next(errors[404])
})

app.use(({ statusCode, error }, req, res, next) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    })
})

app.listen(
    process.env.PORT,
    () => console.info(`> listening at: ${process.env.PORT}`)
)