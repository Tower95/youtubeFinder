'use strict'
// Load express.
const express = require('express')
const app = express()

// Eneable cors
const cors = require('cors')
app.use(cors())

// Load env variables.
require('dotenv').config()
console.log(`The env settings is: ${process.env.TEST_ENV ? 'Correct' : 'Failes:\nDid you create a .env file?'}`)

// Parse the body.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Load routes.
const v1 = require('./src/components/v1')
app.use('/api', v1)


exports = module.exports = app