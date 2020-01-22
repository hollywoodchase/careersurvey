const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  rank: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  projectedJobs: { type: String, required: true },
  medianSalary: { type: String, required: true },
  hourlyWage: { type: String, required: true },
  rent: { type: String, required: true },
  link: { type: String, required: true },
  questionShift: { type: String, required: true, default: "9 AM - 5 PM" },
  questionIncome: { type: String, required: true, default: "Vacation Home" },
  questionTech: { type: String, required: true, default: "3-5" },
  questionHealth: { type: String, required: true, default: "Would be willing to work with sick people and blood" },
  questionOralCare: { type: String, required: true, default: "No" },
  questionEducation: { type: String, required: true, default: "4 years of college" },
  questionPeople: { type: String, required: true, default: "I am willing to talk to anyone" },
  questionSubject: { type: String, required: true, default: "Technology/Shop" },
  questionBuild: { type: String, required: true, default: "Yes, and I like to figure it out on my own" },
  questionPriority: { type: String, required: true, default: "Making the most money" },
  questionWhere: { type: String, required: true, default: "A government or medical facility" },
  questionEnvironment: { type: String, required: true, default: "Who cares? The world is ending" },
  questionHands: { type: String, required: true, default: "Yes, I am very hands on" }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;



