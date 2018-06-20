//  - Create a thing
//  - Read a thing
//  - Update a thing
//  - Delete a thing (edited)

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const { getBeer, addBeer, listBeers } = require('./dal')
const NodeHTTPError = require('node-http-error')
const { not, isEmpty, propOr } = require('ramda')
const checkRequiredFields = require('./lib/check-required-fields')
const createMissingFieldsMsg = require('./lib/create-missing-field-msg')
const pkGen = require('./lib/pk-gen')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
	res.send(`Welcome to Max and Lauren's Beer API!`)
})

app.get('/beers/:beerID', function(req, res, next) {
	const beerID = req.params.beerID
	getBeer(beerID, function(err, data) {
		if (err) {
			next(new NodeHTTPError(err.status, err.message, err))
			return
		}
		res.status(200).send(data)
	})
})

app.get('/beers', function(req, res, next) {
	listBeers(function(err, data) {
		if (err) {
			next(new NodeHTTPError(err.status, err.message, err))
			return
		}

		res.status(200).send(data)
	})
})

app.post('/beers', function(req, res, next) {
	const newBeer = propOr({}, 'body', req)

	if (isEmpty(newBeer)) {
		next(new NodeHTTPError(400, 'missing beer from request body'))
		return
	}

	const missingFields = checkRequiredFields(['style', 'name', 'abv'], newBeer)

	if (not(isEmpty(missingFields))) {
		next(new NodeHTTPError(400, createMissingFieldsMsg(missingFields)))
		return
	}

	addBeer(newBeer, function(err, data) {
		if (err) {
			next(new NodeHTTPError(err.status, err.message, err))
			return
		}
		res.status(201).send(data)
	})
})

app.use(function(err, req, res, next) {
	console.log(
		'ERROR! ',
		'METHOD: ',
		req.method,
		' PATH',
		req.path,
		' error:',
		JSON.stringify(err)
	)
	res.status(err.status || 500)
	res.send(err)
})

app.listen(port, () => console.log('API is up', port))
