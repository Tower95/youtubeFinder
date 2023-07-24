'use strict'
const request = require('supertest');
const { describe, expect, test } = require('@jest/globals');
const axios = require('axios');
const app = require('./app')

jest.mock('axios');

describe('My youtube search', () => {

  test('Succesfully case', async () => {

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

    axios.get.mockResolvedValueOnce({ data });

    const response = await request(app).get('/api/youtube?search=muse');

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      {
        "msg": "ok",
        "count": 1,
        "results": [
          {
            "published_at": "2022-08-18T04:00:09Z",
            "id": "u9oTaiDam5o",
            "title": "PUN Ft. DAVII - MUSE [Official MV]",
            "description": "This is my baby ไม่ต้องบอกก็รู้ว่าฉันโชคดี https://bfan.link/MUSE-PUN Executive Producer : F.HERO Producer : TRILOGY Lyrics ...",
            "thumbnail": "https://i.ytimg.com/vi/u9oTaiDam5o/hqdefault.jpg",
            "extra": {
              "channelTitle": "High Cloud Entertainment",
              "directLink": "https://www.youtube.com/watch?v=u9oTaiDam5o"
            }
          }
        ]
      }
    );
  });

  test('Empty "search" case', async () => {

    const response = await request(app).get('/api/youtube?search=');

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual(
      {
        "msg": "Bad Request: search is required"
      }
    );
  });

  test('Without "search" case', async () => {

    const response = await request(app).get('/api/youtube');

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual(
      {
        "msg": "Bad Request: search is required"
      }
    );
  });

  test('Only Space "search" case', async () => {

    const response = await request(app).get('/api/youtube?search=%20');

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual(
      {
        "msg": "Bad Request: search can't be empty"
      }
    );
  });

  test('No results found case', async () => {

    const data = {
      "kind": "youtube#searchListResponse",
      "etag": "oWUC_JRA47cMh1uj_SPpaxUiRqk",
      "regionCode": "MX",
      "pageInfo": {
        "totalResults": 0,
        "resultsPerPage": 0
      },
      "items": []
    }

    axios.get.mockResolvedValueOnce({ data });

    const response = await request(app).get('/api/youtube?search=asdfopuaslidfujiolasdufoi');

    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual(
      {
        "msg": "No results found"
      }
    );
  });

  test('Service Faild case', async () => {

    axios.get.mockRejectedValueOnce(new Error('Testing Error'));

    const response = await request(app).get('/api/youtube?search=muse');


    expect(response.statusCode).toBe(500);

    expect(response.body).toEqual(
      {
        "msg": "Internal Server Error"
      }
    );
  });

});