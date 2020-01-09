const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  salary: String,
  hours: String,
  education: String,
  people: Boolean
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
