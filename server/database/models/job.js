const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  rank: { type: String, required: true },
  description: { type: String, required: true },
  educationNeeded: { type: String, required: true },
  image: { type: String, required: true },
  projectedJobs: { type: String, required: true },
  medianSalary: { type: String, required: true },
  hourlyWage: { type: String, required: true },
  rent: { type: String, required: true },
  link: { type: String, required: true },
  questionShift: { type: String, required: true },
  questionIncome: { type: String, required: true },
  questionTech: { type: String, required: true },
  questionOralCare: { type: String, required: true },
  questionHealth: { type: String, required: true },
  questionEducation: { type: String, required: true },
  questionPeople: { type: String, required: true },
  questionSubject: { type: String, required: true },
  questionBuild: { type: String, required: true },
  questionPriority: { type: String, required: true },
  questionWhere: { type: String, required: true },
  questionEnvironment: { type: String, required: true },
  questionHands: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;



