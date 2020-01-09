const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const jobSeed = [
  {
    title: "Software Developer",
    category: "STEM",
    salary: ">100000",
    hours: "Vary",
    education: "Bachelor's",
    people: false
  },
  {
    title: "Dentist",
    category: "Healthcare",
    salary: ">100000",
    hours: "Daytime",
    education: "Doctorate",
    people: true
  },
  {
    title: "Physician Assistant",
    category: "Healthcare",
    salary: ">100000",
    hours: "Vary",
    education: "Master's",
    people: true
  },
  {
    title: "Orthodontist",
    category: "Healthcare",
    salary: ">100000",
    hours: "Daytime",
    education: "Doctorate",
    people: true
  },
  {
    title: "Nurse Practicioner",
    category: "Healthcare",
    salary: ">100000",
    hours: "Vary",
    education: "Master's",
    people: true
  }
];

db.Job
  .remove({})
  .then(() => db.Job.collection.insertMany(jobSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
