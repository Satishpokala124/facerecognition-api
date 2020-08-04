const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '7138ad3181b0440daab2d3d12d8f49b2'
});

const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json("API call did not work"))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		if (entries.length) {
			res.json(entries[0])
		} else {
			res.status(400).json("Unable to get Entries")
		}
	})
}

module.exports = {
	handleImage,
	handleApiCall
}