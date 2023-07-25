'use strict'
const { describe, expect, test } = require('@jest/globals')
const youtube = require('./youtube')
const axios = require('axios')

jest.mock('axios')

describe('Testing Youtube Services', () => {

  test('Succesfully case', () => {

    const data = {
      "kind": "youtube#searchListResponse",
      "etag": "A0AdwVLTEfAKvlTihh1m-Tv5tpg",
      "nextPageToken": "CAoQAA",
      "regionCode": "MX",
      "pageInfo": {
        "totalResults": 1000000,
        "resultsPerPage": 10
      },
      "items": [
        {
          "kind": "youtube#searchResult",
          "etag": "mJCC1KDs9J0WqCdO4nC1oqxmGaw",
          "id": {
            "kind": "youtube#video",
            "videoId": "u9oTaiDam5o"
          },
          "snippet": {
            "publishedAt": "2022-08-18T04:00:09Z",
            "channelId": "UCRHhB1EVy0kfISY6_IOauxg",
            "title": "PUN Ft. DAVII - MUSE [Official MV]",
            "description": "This is my baby ไม่ต้องบอกก็รู้ว่าฉันโชคดี https://bfan.link/MUSE-PUN Executive Producer : F.HERO Producer : TRILOGY Lyrics ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/u9oTaiDam5o/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/u9oTaiDam5o/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/u9oTaiDam5o/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "High Cloud Entertainment",
            "liveBroadcastContent": "none",
            "publishTime": "2022-08-18T04:00:09Z"
          }
        }
      ]
    }

    axios.get.mockResolvedValue({ data })

    return youtube.search('mouse').then(response => {
      expect(response).toEqual(data)
    })

  })
})