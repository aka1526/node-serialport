// app.js
const express = require("express")
const path = require('path')
const _dirname = path.resolve();
const app = express();
require('./rs232')

app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(_dirname, 'node_modules/@fortawesome/fontawesome-free/css')))



app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/popper.js/dist')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/@fortawesome/fontawesome-free/js')))
app.use('/webfonts', express.static(path.join(_dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});