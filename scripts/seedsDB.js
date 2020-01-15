const mongoose = require("mongoose");
const db = require("../models");
const jobs = require('../jobs.json');

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/joblist"
);



db.Job
  .remove({})
  .then(() => db.Job.collection.insertMany(jobs))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
