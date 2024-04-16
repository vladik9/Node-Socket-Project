'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

// Function to get the IP address of the server
function getIp() {
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
}


getIp();
console.log("\n##########################################");
for (const name of Object.keys(results)) {
  console.log(`IP address is : ${results[name].join(', ')}`);
}
console.log("##########################################");

