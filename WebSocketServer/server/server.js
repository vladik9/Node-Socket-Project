
const PORT = require('../utils/utils');

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {

  console.log("\n##########################################");
  console.log((new Date()) + ' Received request for ' + request.url);
  console.log("##########################################");

  response.writeHead(404);
  response.end();
});
//starting the server
server.listen(PORT, function () {

  console.log("\n##########################################");
  console.log((new Date()) + ' Server is listening on port: ' + PORT);
  console.log("##########################################");

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
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    console.log("##########################################");
    return;
  }

  var connection = request.accept(null, request.origin);

  console.log("\n##########################################");
  console.log((new Date()) + ' Connection accepted.');
  console.log("##########################################");


  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log("\n##########################################");
      console.log('Received Message: ' + message.utf8Data);
      console.log("##########################################");

      connection.sendUTF(message.utf8Data);
      //this resend the reseived message, instead of it i will
      //send a custom message.hello from nodejs
      console.log("\n##########################################");
      connection.sendUTF("Hello from node.js");
      console.log("##########################################");

    }
    else if (message.type === 'binary') {
      console.log("\n##########################################");
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      console.log("##########################################");

      connection.sendBytes(message.binaryData);
    }
  });



  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});