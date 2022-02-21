const { SerialPort } = require('serialport')
require('dotenv').config()

var SERVER_PORT = 1337
var connections = new Array;
var Server = require('ws').Server
const wss = new Server({ port: SERVER_PORT })

// Web Server
var express = require("express");
const http_port = 8080;
const app = express();

console.log('Open SerialPort : ' + process.env.RS232_PORT)
const port = new SerialPort({
    path: process.env.RS232_PORT,
    baudRate: 9600,
    autoOpen: false,
})
port.open(function(err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on')
})

// Switches the port into "flowing mode"
port.on('data', function(data) {
    broadcast(data)
        // console.log('Data:', data)
})


// adding ws bridge
wss.on('connection', function connection(client) {
    console.log("connected to " + client._socket.remoteAddress + " on port " + SERVER_PORT)
    connections.push(client);
    client.on('message', function(data) {
        port.write(data)
        console.log('WS received : ' + data)
    })

    client.on('close', function() {
        console.log("connection closed");
        var position = connections.indexOf(client);
        connections.splice(position, 1);
    });

})


// Handling the get request
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Starting the server on the 80 port
app.listen(http_port, () => {
    console.log(`The application started
    successfully on port ${http_port}`);
});

function broadcast(data) {
    // console.log('broadcast: ' + data);
    for (myConnection in connections) {
        connections[myConnection].send(data + ' ');
        // connections[myConnection].send(JSON.stringify(data));
    }
}