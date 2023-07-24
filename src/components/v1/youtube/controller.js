'use strict'
const router = require('express').Router()
const youtube = require('../../../services/youtube')


// GET /search
router.get('/', async (req, res) => {
  let payload = undefined
  try {
    const data = await youtube.search(req.query.search)
    payload = data
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ msg: 'Internal Server Error' })
    return
  }

  res.json({ msg: 'OK', payload })
});

module.exports = router;
