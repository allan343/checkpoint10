require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
//const validateBearerToken = require('./validate-bearer-token')
//const errorHandler = require('./error-handler')
const bookmarksRouter = require('./bookmark-router')
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(bookmarksRouter)

app.get('/', (req, res) => {
       res.send('Hello, world!')
     })
    

     app.use(function errorHandler(error, req, res, next) {
           let response
           if (NODE_ENV === 'production') {
             response = { error: { message: 'server error' } }
           } else {
             console.error(error)
             response = { message: error.message, error }
           }
           res.status(500).json(response)
         })

app.use(cors())

app.listen(8080, () => {
  console.log(`Server listening at http://localhost:8080`)
})

module.exports = app