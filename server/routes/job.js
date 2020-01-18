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

    //     let result = req.body.result;
    // for (let i = 0; i < result.length; i++) {
    //     let res = result[i].answertext;
    //     if (res === '6 AM - 2 PM' || res === '9 AM - 5 PM') {
    //         result[i].shift = 'daytime';
    //     }
    //     console.log(req.body.result);
    // }


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