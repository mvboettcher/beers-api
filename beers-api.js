// *Task 6* - You choose the domain, such as automobiles, dogs, beers, running shoes, or video games.  Create your own database.  Fill the database up with documents. Create a new nodejs/express app.  Create the following endpoints:
//
//  - Create a thing
//  - Read a thing
//  - Update a thing
//  - Delete a thing (edited)

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const { getBeer } = require('./dal')
const NodeHTTPError = require('node-http-error')
const { } = require('ramda')
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
    if(err) {
      next(new NodeHTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(data)
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
