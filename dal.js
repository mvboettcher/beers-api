require('dotenv').config()
const { merge, map } = require('ramda')
const PouchDB = require('pouchdb-core')
const pkGen = require('./lib/pk-gen')

PouchDB.plugin(require('pouchdb-adapter-http'))

const db = new PouchDB(
	`${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const getBeer = (id, callback) => db.get(id, callback)

const addBeer = (beer, callback) => {
	const modifiedBeer = merge(beer, {
		type: 'beer',
		_id: pkGen('beer', '_', `${beer.style} ${beer.name}`)
	})
	db.put(modifiedBeer, callback)
}

const listBeers = cb =>
	listDocs({ include_docs: true, startkey: 'beer_', endkey: 'beer_\ufff0' }, cb)

const listDocs = (options, cb) =>
	db.allDocs(options, function(err, result) {
		if (err) cb(err)
		cb(null, map(row => row.doc, result.rows))
	})

const dal = {
	getBeer,
	addBeer,
	listBeers
}

module.exports = dal
