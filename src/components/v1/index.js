'use strict'

const router = require('express').Router()

const search = require('./youtube')
router.use('/youtube', search.controller)

module.exports = router