# Youtube Finder

This project is a express.js RestAPI
for search youtube videos info.

## Pre requirements configurations

- you need to have a Google API KEY for Youtube DATA API V3.
- Rename the file ".env_Example" to ".env" and replace the variables inside

## Pre requirements run time
- Nodejs 18+ 

or

- Docker and/or Docker Compose


## Install Dependencies
this is necesary just on NodeJS

```bash
# install dependencies
npm install
```

## How to test
This project use Jest and supertest for testing

```bash
npm run test
```

## How to run
#### NodeJS
```bash
# Start Server
npm run start 

# Start Development Server
npm run devStart 
```

#### Docker
```bash
# Create the image
docker build -t youtubefinder . 

# Run a container with the new image and expose on 3000 port
docker run --rm -p 3000:3000 youtubefinder
```

#### Docker Compose
```bash
docker compose up

# or

docker-compose up
```

## Documentation

#### Rest API

Rest API have one endpoint `/api/youtube`
can recive the url params `search`
and it returns 10 videos with information

```bash
curl --location 'http://localhost:3000/api/youtube?search=muse'

{
    "msg": "ok",
    "count": 10,
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
        },
        ...
    ]
}


```

```bash
curl --location 'http://localhost:3000/api/youtube?search='

{
    "msg": "Bad Request: search is required"
}
```

```bash
curl --location 'http://localhost:3000/api/youtube'

{
    "msg": "Bad Request: search is required"
}
```

```bash
curl --location 'http://localhost:3000/api/youtube?search=%20

{
    "msg": "Bad Request: search can't be empty"
}
```

#### Web page

if you go to localhost:3000/ 
you see this
![image1](/doc/image1.png?raw=true "image1")

you can search for everything
![image2](/doc/image2.png?raw=true "image2")

get the result
![image3](/doc/image3.png?raw=true "image3")

Enjoy!!!