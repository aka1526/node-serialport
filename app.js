// app.js
const express = require("express")
const path = require('path')
const _dirname = path.resolve();
const app = express();
const db = require("./config/db");
const { v4: uuidv4 } = require('uuid');
const Weight = require("./models/weight");
const { dateAdd } = require('dateadd');
const { Op } = require("sequelize");
var bodyParser = require("body-parser");


db.authenticate()
    .then((result) => {
        console.log("Connection established.");
    })
    .catch((error) => {
        console.log("Unable to connect to db: ", error);
    });

const seed = async() => {
    //await db.sync({ force: true });
    await db.sync();
};

seed();

require('./rs232')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(_dirname, 'node_modules/@fortawesome/fontawesome-free/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/popper.js/dist')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/@fortawesome/fontawesome-free/js')))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));

});

app.get("/getdata", (req, res) => {


    var date1 = new Date();
    var deleteDate = dateAdd('day', -30, date1);


    Weight.destroy({
        where: {
            createdAt: {
                [Op.lte]: deleteDate
            }
        },
    });
    Weight.findAll({
        order: [
            ['id', 'DESC']

        ],
        limit: 6
    }).then(notes => res.json({ "json": notes }));


});

app.post("/api/add/", (req, res, next) => {
    const str_uuid = uuidv4();
    console.log(str_uuid.replace(/-/g, ''))
    console.log(req.body.product_code);

    /* var errors=[]
     if (!req.body.password){
         errors.push("No password specified");
     }
     if (!req.body.email){
         errors.push("No email specified");
     }
     if (errors.length){
         res.status(400).json({"error":errors.join(",")});
         return;
     }
     var data = {
         name: req.body.name,
         email: req.body.email,
         password : md5(req.body.password)
     }
     var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
     var params =[data.name, data.email, data.password]
     db.run(sql, params, function (err, result) {
         if (err){
             res.status(400).json({"error": err.message})
             return;
         }
         res.json({
             "message": "success",
             "data": data,
             "id" : this.lastID
         })
     });*/
})

app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});