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
    questionShift: { type: String, required: true },
    questionIncome: { type: String, required: true },
    questionTech: { type: Boolean, required: true },
    questionHealth: { type: String, required: true },
    questionEducation: { type: String, required: true },
    questionPeople: { type: Boolean, required: true },
    questionSubject: { type: String, required: true },
    questionBuild: { type: String, required: true },
    questionPriority: { type: String, required: true },
    questionWhere: { type: String, required: true },
    questionEnvironment: { type: Boolean, required: true },
    questionHands: { type: Boolean, required: true }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
