var express = require('express');
var router = express.Router();
var User = require('../models/user-model');

// GET/retrieves all users
router.get('/', function (req, res, next) {
	User.find().exec()
	.then(function(users) {
		res.status(200).json(users)
	})
	.then(null, next);
});

// GET/retrieves one user
router.get('/:userId', function (req, res, next) {
	User.findById(req.params.userId).exec()
	.then(function (user) {
		res.status(200).json(user);
	})
	.then(null, next);
});

// POST/CREATE new user
router.post('/', function (req, res, next) {
    User.create(req.body)
    .then(function (user) {
    	user.id = Math.random
        res.status(201).send(user);
    })
    .then(null, next);
});

// PUT/UPDATE existing user
router.put('/:userId', function (req, res, next) {
	// filter out email and password from update
	var updateThese = [];
	Object.keys(req.body).forEach(function (key) {
		if (key !== 'email' && key !== 'password') {
			updateThese.push(key);
		};
	})
	
	User.findById(req.params.userId)
	.then(function (user) {

		// helper function that updates nested properties in req.body
		var nestedUpdate = function (update) {
			Object.keys(req.body[update]).forEach(function (n) {
				user[update][n] = req.body[update][n];
			})
		}

		for (var i = 0; i < updateThese.length; i++) {
			var update = updateThese[i];
			if (update === 'name' || update === 'dob') {
				nestedUpdate(update);
			}
			else {
				user[update] = req.body[update];
			}
		}
		// saves updated user
		user.save();
		res.send(user);
	})
	.then(null, next);
});

// DELETE/removes a user
router.delete('/:userId', function (req, res, next) {
	User.remove({ _id: req.params.userId })
	.then(function () {
		res.sendStatus(204);
	})
	.then(null, next);
})

module.exports = router;