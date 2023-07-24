'use strict'
const router = require('express').Router()
const youtube = require('../../../services/youtube/youtube')


// GET /search
router.get('/', async (req, res) => {

  if (!req.query.search) {
    res.status(400)
    res.json({ msg: 'Bad Request: search is required' })
    return
  }

  let yt_search_keyword = req.query.search.trim()

  if (yt_search_keyword.length === 0) {
    res.status(400)
    res.json({ msg: 'Bad Request: search can\'t be empty' })
    return
  }

  let youtubeResponse = undefined
  try {
    youtubeResponse = await youtube.search(yt_search_keyword)
    console.log(JSON.stringify(youtubeResponse, null, 2))
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ msg: 'Internal Server Error' })
    return
  }

  if (youtubeResponse === undefined || youtubeResponse.items.length === 0) {
    res.status(404)
    res.json({ msg: 'No results found' })
    return
  }

  let payload = youtubeResponse.items.map(item => {
    return {
      published_at: item.snippet.publishedAt,
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      extra: {
        channelTitle: item.snippet.channelTitle,
        directLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }
    }
  })

  res.json({
    msg: 'ok',
    count: payload.length,
    results: payload,
  })
});

module.exports = router;
