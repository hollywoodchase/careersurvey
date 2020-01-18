const express = require('express')
const router = express.Router()
const Job = require('../database/models/job')
const User = require('../database/models/user')
const passport = require('../passport')



router.post('/jobs', (req, res) => {
    Job.findAll({}, (err, response) => {
        res.json(response);
    })
});

router.post('/surveyComplete', (req, res) => {

    // console.log(req.body.result[0].answertext);
    User.update({
        shift: req.body.result[0].answertext,
        income: req.body.result[1].answertext,
        tech: req.body.result[2].answertext,
        health: req.body.result[3].answertext,
        oralCare: req.body.result[4].answertext,
        educationNeeded: req.body.result[5].answertext,
        people: req.body.result[6].answertext,
        subject: req.body.result[7].answertext,
        build: req.body.result[8].answertext,
        priority: req.body.result[9].answertext,
        where: req.body.result[10].answertext,
        environment: req.body.result[11].answertext,
        hands: req.body.result[12].answertext
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
    // console.log(req.body.result);

    //update user to have survey results

    // define categories in an array 
    // loop over categories to find matches
    //set matches to an object
    //post object to database

    let result = req.body.result;
    for (let i = 0; i < result.length; i++) {
        let res = result[i].answertext;
        if (res === '6 AM - 2 PM' || res === '9 AM - 5 PM') {
            result[i].shift = 'daytime';
        } else if (res === '6 PM - 2 AM' || res === 'Whenever I want') {
            result[i].shift = 'varies';
        } else if (res === 'Car') {
            result[i].income = 'car';
        } else if (res === 'House') {
            result[i].income = 'house';
        } else if (res === 'Boat') {
            result[i].income = 'boat';
        } else if (res === 'Car') {
            result[i].income = 'car';
        } else if (res === 'Vacation Home') {
            result[i].income = 'vacation';
        } else if (res === '0' || res === '1-2') {
            result[i].tech = false;
        } else if (res === 'Totally grossed out' || res === "Don’t mind blood but don’t want to work with sick people") {
            result[i].health = false;
        } else if (res === 'No problem with sick people but don’t want to work with blood') {
            result[i].health = 'psych';
        } else if (res === 'Would be willing to work with sick people and blood') {
            result[i].health = true;
        } else if (res === 'Yes') {
            result[i].oralCare = true;
        } else if (res === 'No') {
            result[i].oralCare = false;
        } else if (res === 'High School') {
            result[i].educationNeeded = 'highSchool';
        } else if (res === '2 years of college') {
            result[i].educationNeeded = 'twoYears';
        } else if (res === '4 years of college') {
            result[i].educationNeeded = 'bachelors';
        } else if (res === 'More than 4 years of college') {
            result[i].educationNeeded = 'advanced';
        } else if (res === "I always keep to myself" || res === "If someone talks to me I will respond") {
            result[i].people = false;
        } else if (res === "If I have a specific purpose I don’t mind talking to a stranger" || res === "I am willing to talk to anyone") {
            result[i].people = true;
        } else if (res === 'Math') {
            result[i].subject = 'math';
        } else if (res === 'Science') {
            result[i].subject = 'science';
        } else if (res === 'Technology/Shop') {
            result[i].subject = 'techShop';
        } else if (res === 'English/History') {
            result[i].subject = 'englishHistory';
        } else if (res === 'Not really') {
            result[i].build = 'false';
        } else if (res === "Yes, using a computer") {
            result[i].build = 'tech';
        } else if (res === "Yes, when I am given specific instructions") {
            result[i].build = 'construction';
        } else if (res === "Yes, and I like to figure it out on my own") {
            result[i].build = 'engineer';
        } else if (res === 'Making the most money') {
            result[i].priority = 'money';
        } else if (res === "Going to school for the least amount of time") {
            result[i].priority = 'leastSchool';
        } else if (res === "Helping other people") {
            result[i].priority = 'helping';
        } else if (res === "Having a job that you like") {
            result[i].priority = 'jobLike';
        } else if (res === 'An office building') {
            result[i].where = 'office';
        } else if (res === "An outdoor workplace") {
            result[i].where = 'outdoors';
        } else if (res === "A government or medical facility") {
            result[i].where = 'govMedStore';
        } else if (res === "A different place every shift") {
            result[i].where = 'different';
        } else if (res === "Who cares? The world is ending" || res === "Yes, but it’s too late, the damage is done") {
            result[i].environment = false;
        } else if (res === "Yes, I try to make a difference in small ways" || res === "Yes, the future of our planet is important and we need to make big changes now") {
            result[i].environment = true;
        } else if (res === "Yes, I am very hands on" || res === "I will if I have to, but I'd rather not") {
            result[i].hands = true;
        } else if (res === "No, I'd rather not work with my hands" || res === "Absolutely not") {
            result[i].hands = false;
        }
        console.log(req.body.result);
    }


    // User.update({
    //     questionShift: survey.shift,
    //     questionIncome: q2,
    //     questionTech: q3,
    //     questionHealth: q4,
    //     questionEducation: q5,
    //     questionPeople: q6,
    //     questionSubject: q7,
    //     questionBuild: q8,
    //     questionPriority: q9,
    //     questionWhere: q10,
    //     questionEnvironment: q11,
    //     questionHands: q12 
    // }, () => {

    // });


});

// router.get('/:id', (req, res) => {
//     Job.find({
//         questionShift: survey.shift,
//         questionIncome: q2,
//         questionTech: q3,
//         questionHealth: q4,
//         questionEducation: q5,
//         questionPeople: q6,
//         questionSubject: q7,
//         questionBuild: q8,
//         questionPriority: q9,
//         questionWhere: q10,
//         questionEnvironment: q11,
//         questionHands: q12
//     })
// });



// req.params.wantsTech or req.body


//     User.findOne({ username: username }, (err, user) => {
//         if (err) {
//             console.log('User.js post error: ', err)
//         } else if (user) {
//             res.json({
//                 error: `Sorry, there's already a user with the username: ${username}`
//             })
//         }
//         else {
//             const newUser = new User({
//                 username: username,
//                 password: password
//             })
//             newUser.save((err, savedUser) => {
//                 if (err) return res.json(err)
//                 res.json(savedUser)
//             })
//         }
//     })
// })

// router.post(
//     '/login',
//     function (req, res, next) {
//         console.log('routes/user.js, login, req.body: ');
//         console.log(req.body)
//         next()
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('logged in', req.user);
//         var userInfo = {
//             username: req.user.username
//         };
//         res.send(userInfo);
//     }
// )

// router.get('/', (req, res, next) => {
//     console.log('===== user!!======')
//     console.log(req.user)
//     if (req.user) {
//         res.json({ user: req.user })
//     } else {
//         res.json({ user: null })
//     }
// })

// router.post('/logout', (req, res) => {
//     if (req.user) {
//         req.logout()
//         res.send({ msg: 'logging out' })
//     } else {
//         res.send({ msg: 'no user to log out' })
//     }
// })

module.exports = router