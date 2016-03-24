var bluebird = require('bluebird');
var mongoose = require('mongoose');
var UserModel = require('./server/models/user-model');
mongoose.connect('mongodb://localhost/gooroo');

var users = [
    {
        "id": 1,
        "email": "test1@beokay.com",
        "password": "1234567abc",
        "name": {
            "first": "John",
            "last": "Smith"
        },
        "dob": {
            "day": 1,
            "month": 1,
            "year": 1970
        }
    },
    {
        "id": 2,
        "email": "test2@beokay.com",
        "password": "098765abc",
        "name": {
            "first": "John",
            "last": "John"
        },
        "dob": {
            "day": 1,
            "month": 2,
            "year": 1980
        }
    }
];

// helper function that clears dbs
var wipeDB = function () {

    var models = [UserModel];

    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return bluebird.resolve();

};

// helper function that seeds dummy data
var seed = function () {

    UserModel.create(users, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Database seeded!');
        process.kill(0);
    });

};

// node seed.js command empties db and seeds dummy data
mongoose.connection.once('open', function () {
    wipeDB().then(seed);
});