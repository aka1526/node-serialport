const { SerialPort } = require('serialport')
require('dotenv').config()
    //const sqlite3 = require('sqlite3').verbose();
    //let db = new sqlite3.Database('./db/db_weight.sqlite3');
    //const db = require("./config/db");
const db = require("./config/db");
const Weight = require("./models/weight");

var SERVER_PORT = 1337
var connections = new Array;
var Server = require('ws').Server
const wss = new Server({ port: SERVER_PORT })


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

    setInterval(() => {
        client.on('message', function(data) {
            port.write(data)
            console.log('WS received : ' + data)
        })
    }, 3000)



    client.on('close', function() {
        console.log("connection closed");
        var position = connections.indexOf(client);
        connections.splice(position, 1);
    });

})




function broadcast(data) {

    // console.log('broadcast: ' + data);

    let string = data + ' ';
    // splits every letter in string into an item in our array
    let newArray = string.split(' ');
    // console.log(newArray);

    //force: false  เพิ่มเรื่อย ะtrue ลบแล้วเพิ่ม
    //db.sync({ force: false }).then(function() {
    // Table created
    Weight.create({
        product_code: 'John',
        product_name: 'Hancock',
        mat_lot_no: 'Hancock',
        invoice_no: 'IV65-20147',
        total_weight: '125875',
        total_qty: '1200',
        total_weight_qty: '1100',
        total_weight_diff: '100',
        total_box: '1',
        total_box_weight: '1500',
    });
    //});


    //setInterval(() => {
    for (myConnection in connections) {
        connections[myConnection].send(data + ' ');
        // connections[myConnection].send(JSON.stringify(data));
    }
    //}, 3000)


}