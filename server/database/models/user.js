const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	shift: { type: String, required: true },
	income: { type: String, required: true },
	tech: { type: String, required: true },
	health: { type: String, required: true },
	oralCare: { type: String, required: true },
	education: { type: String, required: true },
	people: { type: String, required: true },
	subject: { type: String, required: true },
	build: { type: String, required: true },
	priority: { type: String, required: true },
	where: { type: String, required: true },
	environment: { type: String, required: true },
	hands: { type: String, required: true }
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