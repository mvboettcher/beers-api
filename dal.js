require('dotenv').config()
const { merge } = require('ramda')
const PouchDB = require('pouchdb-core')
const pkGen = require('./lib/pk-gen')

PouchDB.plugin(require('pouchdb-adapter-http'))

const db = new PouchDB(
	`${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const getBeer = (id, callback) => db.get(id, callback)



const dal = {
	getBeer
}

module.exports = dal
