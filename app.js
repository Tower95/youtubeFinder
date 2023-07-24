'use strict'

const express = require('express');
const app = express();

// Load env variables.
require('dotenv').config();
console.log(`The env settings is: ${process.env.TEST_ENV ? 'Correct' : 'Failes:\nDid you create a .env file?'}`);


exports = module.exports = app;