const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'asdf1234',
    database : 'faceRecognition-db'
  }
});

app.use(express.json());
app.use(cors());

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${ process.env.PORT || 3000 }`)
})

