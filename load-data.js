require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const db = new PouchDB(
	`${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const beers = [
	{
		_id: 'beer_belgian_ale_munkle_brugge_city_brune',
		type: 'beer',
		style: 'Belgian Ale',
		name: 'Munkle Brugge City Brune',
		abv: 6.2
	},
	{
		_id: 'beer_blonde_ale_freehouse_follys_pride',
		type: 'beer',
		style: 'Blonde Ale',
		name: 'Freehouse Follys Pride',
		abv: 5.5
	},
	{
		_id: 'beer_ipa_coast_hop_art',
		type: 'beer',
		style: 'IPA',
		name: 'COAST HopArt',
		abv: 7.7
	},
	{
		_id: 'beer_ipa_palmetto_huger_street',
		type: 'beer',
		style: 'IPA',
		name: 'Palmetto Huger Street',
		abv: 7.2
	},
	{
		_id: 'beer_lager_lo-fi_lager',
		type: 'beer',
		style: 'Lager',
		name: 'Lo-Fi Lager',
		abv: 5.5
	},
	{
		_id: 'beer_pale_ale_revelry_poke_the_bear',
		type: 'beer',
		style: 'Pale Ale',
		name: 'Revelry Poke The Bear',
		abv: 5.5
	},
	{
		_id: 'beer_porter_holy_city_pluff_mud',
		type: 'beer',
		style: 'Porter',
		name: 'Holy City Pluff Mud',
		abv: 5.5
	},
	{
		_id: 'beer_witbier_westbrook_white_thai',
		type: 'beer',
		style: 'Witbier',
		name: 'Westbrook White Thai',
		abv: 5
	},
	{
		_id: 'beer_zwickelbier_charles_towne_fermentoryralf',
		type: 'beer',
		style: 'Zwickelbier',
		name: 'Charles Towne Fermentory Ralf',
		abv: 4.5
	}
]

db.bulkDocs(beers, function(err, result) {
	if (err) {
		console.log('ERROR', err)
		return
	}
	console.log('success', result)
})
