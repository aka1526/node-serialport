//const SerialPort = require('serialport').SerialPort;
//const SerialPort = require('serialport');

//var SerialPort = require('serialport'); // original fork (v5)
//var port = new SerialPort('COM1');

//var SerialPort = require('serialport').SerialPort; // omega2 port (at v3)
//var port = new SerialPort('COM3');
/*
// TEST ALL PORT //
console.log("Listing SerialPort");
SerialPort.list()
    .then(ports => {
        ports.forEach(function(port) {
            //console.log('%s / %s / %s', port.path, port.pnpId, port.manufacturer);
            console.log("Port :", port);
        });
    });*/

/*

SerialPort.list()
    .then(ports => {
        if (ports.length === 0) {
            console.error('No port detected')
            process.exit(2)
        }
        ports.forEach(function(port) {
                //console.log('%s / %s / %s', port.path, port.pnpId, port.manufacturer);
                console.log("Port :", port);
            },
            err => {
                console.error('Error listing ports', err)
            });
    });*/

const path = require('path');

var SerialPort = require('serialport').SerialPort;; // original fork (v5)
//var myport = new SerialPort('COM3');

/*
var port = new SerialPort("COM3", {
    baudrate: 9600,
    // parser: serialport.parsers.readline("\n")
});*/
const portname = 'COM3';
const Readline = SerialPort.parsers.Readline;
const myPort = new SerialPort({
    path: portname,
    baudRate: 9600,
    parser: new Readline("\n")
});

myport.open("open", function() {
    console.log("Puerto serie abierto");
});

myport.on("data", function(datos) {

    console.log(datos);
});

/*
io.sockets.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
    });

    socket.on('disconnected', function() {
        console.log('disconnected');
    });
});

var clearData = "";
var readData = "";

serialPort.on('open', function() {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log(data);
        readData += data.toString();
        io.sockets.emit('message', data);
    });
});*/