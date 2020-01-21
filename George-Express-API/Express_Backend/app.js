var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://@localhost:27017/dojo';

mongo.connect(url, (err) => {
    console.log('Connected to database!')
})

app.get('/data', (req, res) => {
    mongo.connect(url, (err, db) => {
        var collection = db.collection('ninja');
        collection.find({}).toArray((x, results) => {
            res.send(results);
        })
    })
})

app.post('/data', (req, res) => {
    mongo.connect(url, (err, db) => {
        var collection = db.collection('ninja');
        //a simple if/else to check if email already exists in db
        collection.findOne({ name: req.body.name }, function (err, user) {
            if (err) {
                //handle error here
            }

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                res.send(false);
            } else {
                var something = {
                    name: req.body.name,
                    age: req.body.age,
                    password: req.body.password
                }
                collection.insert(something, (x, results) => {
                    // res.send(results);
                    res.send(true);
                })
            }
        });
    })
})

app.listen(3210, () => {
    console.log('Server active @port 3210!');
})