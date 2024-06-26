# WebSocketServer

## How to configure inital project:

Run in terminal:

### `npm init -y`

this will create a package JSON file and will fill with packages required

### `npm i mongodb`

this is optional and is replaced now by mongoose

### `npm install websocket`

websocket support from node.js

### `npm install dotenv`

npm module to support .env files

### `npm install mongoose`

mongo db framework, easy to create models and save info in db

### `npm install bcryptjs`

Optimized bcrypt in JavaScript with zero dependencies

### `npm install body-parser`

Parse incoming request bodies in a middleware before your handlers

### `npm install jsonwebtoken`

An implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519)

### `npm test`

## Current Project Restore/ install using packege.json

Open: WebSocketServer folder in terminal and run:

### `npm install`

### `npm start`

check logs and updated on remote client IP for host IP and PORT

###### `.env file`

create a .env file with content in src/

```
PORT=8080 // or any port you have to share
MONGO_MEDIC_ID="eogMongoUser" // get on mongo user name from connection string
MONGO_PASSWORD="eogMongoPassword" // get on mongo password name from connection string
MONGO_CONNECTION_STRING="@eogcluster.biutuwq.mongodb.net/?retryWrites=true&w=majority" // main connection string, get if from mongo collection connect
TOKEN_SECRET="someSecret"
```
