const express = require('express')
const router = express.Router()
const Employee = require('../models/Employees')
const Restaurant = require('../models/Restaurants')
const passport = require('../passport')
const db = require("../models");

module.exports = {
	getUser: function (req, res, next) {
		console.log('===== user!!======')
		console.log(req.user)
		if (req.user) {
			return res.json({ user: req.user })
		} else {
			return res.json({ user: null })
		}
	},

	logout: function (req, res) {
		console.log(req.user)
		if (req.user) {
			req.session.destroy()
			res.clearCookie('connect.sid') // clean up!
			return res.json({ msg: 'OK' })
		} else {
			return res.json({ msg: 'no user to log out!' })
		}
	},
	signup: function (req, res) {
		const { restaurant, firstName, lastName, email, password } = req.body
		console.log(req.body);
		// ADD VALIDATION
		db.Restaurants.findOne({ email: email }, (err, userMatch) => {
			if (userMatch) {
				return res.json({
					error: `Sorry, already a user with the email: ${email}`
				})
			}
			else {
				const newRestaurant = new Restaurant({
					name: restaurant,
					email: email,
				})
				newRestaurant.save((err, saveRestaurant) => {
					if (err) return res.json(err)
					console.log("????????????")
					console.log(saveRestaurant);
					console.log("????????????")
					db.Employees.create({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
						restaurantName: saveRestaurant.name,
						restaurantId: saveRestaurant._id,
						isAdmin: true
					}).then(newEmployee => res.json(newEmployee))
						.catch(err => res.status(422).json(err));
					// return res.json(saveRestaurant)
				})
			}
		})
	}
}

