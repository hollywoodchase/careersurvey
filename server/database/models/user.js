const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	shift: { type: String },
	income: { type: String },
	tech: { type: Boolean },
	health: { type: String },
	oralCare: { type: String },
	education: { type: String },
	people: { type: Boolean},
	subject: { type: String },
	build: { type: String },
	priority: { type: String },
	where: { type: String },
	environment: { type: Boolean},
	hands: { type: Boolean }
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');

		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User