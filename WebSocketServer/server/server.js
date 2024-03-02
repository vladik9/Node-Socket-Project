
const { PORT, getCurrentTimeFormat, checkIfDatabaseIsReady } = require('../utils/utils');
const { saveEogData } = require('../eog/eogController');
const { databaseIsReady } = require('../db/mongoose');

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {

  console.log("\n##########################################");
  console.log(getCurrentTimeFormat() + ' Received request for ' + request.url);
  console.log("##########################################\n");

  response.writeHead(404);
  response.end();
});
//starting the server
server.listen(PORT, function () {
  console.log("\n##########################################");
  console.log(getCurrentTimeFormat() + ' server listen on port:' + PORT);
  console.log("##########################################\n");
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function (request) {
  console.log(request);
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log("\n##########################################");
    console.log(getCurrentTimeFormat() + ' Connection from origin ' + request.origin + ' rejected.');
    console.log("##########################################\n");
    return;
  }

  var connection = request.accept(null, request.origin);

  console.log("\n##########################################");
  console.log(getCurrentTimeFormat() + ' Connection accepted.');
  console.log("##########################################\n");

  connection.on('message', function (message) {
    //check if message.type is utf8 or binary, we prefer 1 one
    if (message.type === 'utf8') {
      console.log("###########:DATA RECEIVED utf8:###########");
      console.log('Received Message: ' + message.utf8Data);
      console.log("##########################################\n");

      //this will save data using controller in db
      saveEogData(message.utf8Data);

      //this resend the received message, instead of we can
      // connection.sendUTF(message.utf8Data);

      //send a custom message from server to client
      //this is bidirectional connection message sent and could be disabled
      // console.log("##############:DATA SEND:#################");
      // connection.sendUTF("server says hello");
      // console.log("##########################################\n");

    }
    else if (message.type === 'binary') {
      console.log("##########:DATA RECEIVED binary:##########");
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      console.log("##########################################\n");

      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', function (reasonCode, description) {
    console.log(getCurrentTimeFormat() + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});