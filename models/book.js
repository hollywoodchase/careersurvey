const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  category: { type: String, required: true },
  salary: String,
  hours: String,
  education: String,
  tech: String,
  people: Boolean
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
