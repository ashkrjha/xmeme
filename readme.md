# XMEME By Ashutosh Kumar Jha

This is a simple CRUD API to post memes

Front-end link: https://xmeme-app.herokuapp.com/<br />
Back-end link:  https://xmeme-app.herokuapp.com/ (Both of them are same because ejs files being rendered in the app using nodejs)<br/>

Tech stack used:<br/>
    Front-end: EJS, CSS3, Bootstrap, JavaScript<br/>
    Back-end:  Nodejs, Express<br/>
    Database:  MySQL<br/>

## Installation
```bash
sudo apt-get update
```
```bash
sudo apt-get install nodejs
```
```bash
sudo apt-get install
```
## Run the app
```bash
node app.js
```
## Run the tests
```bash
./test_server.sh
```

# REST API

The REST API to the XMEME app is described below.

## Get list of memes

### Request

`GET /memes`

    curl --location --request GET 'http://localhost:8081/memes'

### Response

    HTTP/1.1 200 OK
    content-length: 291 
    content-type: application/json; charset=utf-8 

    [
        {
            "id": 3,
            "name": "Ash",
            "url": "https://i1.wp.com/livewire.thewire.in/wp-content/uploads/2018/04/DABeVz7UwAIwt8h.jpg?fit=1200%2C901&ssl=1",
            "caption": "Fortnight!"
        },
        {
            "id": 2,
            "name": "ashkrjha",
            "url": "https://i.pinimg.com/736x/e2/33/f4/e233f485018bc13d5426be473b5f4662.jpg",
            "caption": "Dank Maymay"
        }
    ]

## Create a new meme

### Request

`POST /memes`

    curl --location --request POST 'http://localhost:8081/memes' \

    --header 'Content-Type: application/json' \

    --data-raw '{

    "name": "ashok kumar",

    "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

    "caption": "This is a meme"

    }'

### Response

    HTTP/1.1 201 Created
    content-length: 9 
    content-type: application/json; charset=utf-8 

    {
        "id": 4
    }

## Create an existing meme

### Request

`POST /memes`

    curl --location --request POST 'http://localhost:8081/memes' \

    --header 'Content-Type: application/json' \

    --data-raw '{

    "name": "ashok kumar",

    "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

    "caption": "This is a meme"

    }'

### Response

    HTTP/1.1 409 
    content-length: 8 
    content-type: application/json; charset=utf-8 

    {"status":409,"reason":"Conflict"}

## Get a specific meme

### Request

`GET /memes/<id>`

    curl --location --request GET 'http://localhost:8081/memes/1'

### Response

    content-length: 130 
    content-type: application/json; charset=utf-8 

    {
        "id": 2,
        "name": "ashkrjha",
        "url": "https://i.pinimg.com/736x/e2/33/f4/e233f485018bc13d5426be473b5f4662.jpg",
        "caption": "Dank Maymay"
    }

## Get a non-existent Thing

### Request

`GET /memes/<id>`

    curl --location --request GET 'http://localhost:8081/memes/9999'

### Response

    HTTP/1.1 404 Not Found
    content-length: 9 
    content-type: text/plain; charset=utf-8 

    {"status":404,"reason":"Not found"}

## Update a meme's state

### Request

`PATCH /memes/<id>`

    curl --location --request PATCH 'http://localhost:8081/memes/1' \

    --header 'Content-Type: application/json' \

    --data-raw '{

    "url": "https://picsum.photos/536/354",

    "caption": "Lorem Ipsum Image"

    }'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Patch a non-existent meme

### Request

`PATCH /memes/<id>`

    curl --location --request PATCH 'http://localhost:8081/memes/9999' \

    --header 'Content-Type: application/json' \

    --data-raw '{

    "url": "https://picsum.photos/536/354",

    "caption": "Lorem Ipsum Image"

    }'

### Response

    HTTP/1.1 404 Not Found
    content-length: 9 
    content-type: text/plain; charset=utf-8 

    {"status":404,"reason":"Not found"}
