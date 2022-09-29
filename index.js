const express = require('express')
const mongoose = require('mongoose')
const port = 8001


mongoose.connect('mongodb://localhost:27017')
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log(`connnection succeeded`);
})

var app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/sign_up', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const passowrd = req.body.passowrd

    const newUser = {
        "name": name,
        "email": email,
        "password": passowrd
    }
    db.collection('data').insertOne(newUser, (err, collection) => {
        if (err) throw err
        console.log("Record inserted Succeesfully");
    })
    return res.redirect('singup_success.html');
})




app.get('/', (req, res) => {
    res.set({
        'Access-control-Allow-Origin': '*'
    })
    return res.redirect('index.html')
}).listen(port)

console.log(`server is listing on${port}`);