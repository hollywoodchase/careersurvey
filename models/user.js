const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  shift: { type: String, required: true },
  income: { type: String, required: true },
  tech: { type: Boolean, required: true },
  health: { type: String, required: true },
  education: { type: String, required: true },
  people: { type: Boolean, required: true },
  subject: { type: String, required: true },
  build: { type: String, required: true },
  priority: { type: String, required: true },
  where: { type: String, required: true },
  environment: { type: Boolean, required: true },
  hands: { type: Boolean, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
