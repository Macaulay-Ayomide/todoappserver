require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dailytodoRoute = require('./controller/tododaily')
const todoRoute = require('./controller/todo')
const userRoute = require('./controller/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

// Middleware Configuration
mongoose.set('strictQuery', false)

logger.info('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(bodyParser.json())
// Use morgan middleware with the "tiny" configuration
app.use(morgan('tiny'))
app.use(middleware.requestLogger)
app.use('/api/users', userRoute)
app.use('/api/todo', todoRoute)
app.use('/api/dailytodo', dailytodoRoute)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
