'use strict'

const axios = require('axios')

const YouTubeURL = 'https://www.googleapis.com/youtube/v3/search?'

const search = async (query) => {
  const url = `${YouTubeURL}part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=10&type=video`
  const response = await axios.get(url)
  return response.data
}

exports = module.exports = {
  search
}