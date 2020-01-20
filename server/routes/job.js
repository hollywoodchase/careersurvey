const express = require('express')
const router = express.Router()
const Job = require('../database/models/job')
const User = require('../database/models/user')
const passport = require('../passport')

let finalResult = {};

router.post('/surveyComplete', (req, res) => {

    // console.log('lalala1');
    // console.log(req.user._id);

    // console.log(req.body.result[0].answertext);
    User.update({
        _id: req.user._id
    }, {
        $set: {
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
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            // console.log(result);
        }
    });
    // console.log('hihihihi7');
    // console.log(req.user);


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
        } else if (res === 'Boat' || res === 'Vacation Home') {
            result[i].income = 'boatVacation';
        } else if (res === 'Car') {
            result[i].income = 'car';
        } else if (res === '0' || res === '1-2') {
            result[i].tech = false;
        } else if (res === '3-5' || res === '6-8') {
            result[i].tech = true;
        } else if (res === 'Totally grossed out' || res === 'No problem with sick people but don’t want to work with blood') {
            result[i].health = 'false';
        } else if (res === "Don’t mind blood but don’t want to work with sick people" || res === 'Would be willing to work with sick people and blood') {
            result[i].health = 'true';
        } else if (res === 'Yes') {
            result[i].oralCare = 'true';
        } else if (res === 'No') {
            result[i].oralCare = 'false';
        } else if (res === 'High School' || res === '2 years of college') {
            result[i].educationNeeded = 'twoYearsOrFewer';
        } else if (res === '4 years of college') {
            result[i].educationNeeded = 'bachelors';
        } else if (res === 'More than 4 years of college') {
            result[i].educationNeeded = 'advanced';
        } else if (res === "I always keep to myself" || res === "If someone talks to me I will respond") {
            result[i].people = 'false';
        } else if (res === "If I have a specific purpose I don’t mind talking to a stranger" || res === "I am willing to talk to anyone") {
            result[i].people = 'true';
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
        } else if (res === "Going to school for the least amount of time" || res === "Helping other people") {
            result[i].priority = 'helpingLeastSchool';
        } else if (res === "Having a job that you like") {
            result[i].priority = 'jobLike';
        } else if (res === 'An office building') {
            result[i].where = 'office';
        } else if (res === "An outdoor workplace" || res === "A different place every shift") {
            result[i].where = 'differentOutdoors';
        } else if (res === "A government or medical facility") {
            result[i].where = 'govMedStore';
        } else if (res === "Who cares? The world is ending" || res === "Yes, but it’s too late, the damage is done") {
            result[i].environment = 'false';
        } else if (res === "Yes, I try to make a difference in small ways" || res === "Yes, the future of our planet is important and we need to make big changes now") {
            result[i].environment = 'true';
        } else if (res === "Yes, I am very hands on" || res === "I will if I have to, but I'd rather not") {
            result[i].hands = 'true';
        } else if (res === "No, I'd rather not work with my hands" || res === "Absolutely not") {
            result[i].hands = 'false';
        }
        // console.log(req.body.result);
        finalResult = req.body.result;
    }


    // router.get('/:id', (req, res) => {
    //     Job.find({

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

});

router.get('/jobs', (req, res) => {
    if (finalResult[4].oralCare === 'true') {
        // console.log('yippie');
        Job.find({
            questionOralCare: 'true'
        },
            (err, response) => {
                res.send(response);
                console.log('momomo6');
                console.log(response);
            })
    } else if (finalResult[11].environment === 'true') {
        console.log('ENVIRONMENT');
        Job.find({
            questionEnvironment: 'true'
        },
            (err, response) => {
                res.send(response);
                console.log('momomo6');
                console.log(response);
            })
    } else {
        console.log("FALSE");
        Job.find({
            questionShift: finalResult[0].shift,
            questionIncome: finalResult[1].income,
            questionTech: finalResult[2].tech,
            questionHealth: finalResult[3].health,
            questionEducation: finalResult[5].education,
            questionPeople: finalResult[6].people,
            questionSubject: finalResult[7].subject,
            questionBuild: finalResult[8].build,
            questionPriority: finalResult[9].priority,
            questionWhere: finalResult[10].where,
            questionHands: finalResult[12].hands
        }, (err, response) => {
            res.send(response);
            console.log('momomo7');
            console.log(response);
        })
    }
});

module.exports = router