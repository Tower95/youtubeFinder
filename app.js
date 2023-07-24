'use strict'
// Load express.
const express = require('express')
const app = express()

// Eneable cors
const cors = require('cors')
app.use(cors())

// Load env variables.
require('dotenv').config()

if (process.env.YOUTUBE_API_KEY === undefined) {
  console.log('YOUTUBE_API_KEY is not defined')
  console.log('Please set YOUTUBE_API_KEY environment variable on .env file')
  process.exit(1)
}

// Parse the body.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Load routes.
const v1 = require('./src/components/v1')
app.use('/api', v1)

exports = module.exports = app