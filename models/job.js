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

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
