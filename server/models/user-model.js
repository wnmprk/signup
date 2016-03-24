var mongoose = require('mongoose');

// npm package that auto-increments given property
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/gooroo");
autoIncrement.initialize(connection);

var userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String
    },
    dob: {
        day: Number,
        month: Number,
        year: Number
    }
});

// auto increments user id
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 3,
    incrementBy: 1
});

// first and last name should only contain letters
var onlyLetters = function(input) {
    return  /^[a-zA-Z]+$/i.test(input);
};

userSchema.path('name.first').validate(onlyLetters);
userSchema.path('name.last').validate(onlyLetters);

module.exports = mongoose.model('User', userSchema);