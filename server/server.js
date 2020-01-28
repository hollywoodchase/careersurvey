const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user')
const surveyComplete = require('./routes/job');
const mongoose = require("mongoose");
const path = require('path');

// Connect to Mongo DB
mongoose.connect(
	process.env.MONGODB_URI ||
	"mongodb://careersurvey:careersurvey1@ds247377.mlab.com:47377/heroku_rrr8brd0"
  );


// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "build")));
}

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)
app.use('/api', surveyComplete)

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
