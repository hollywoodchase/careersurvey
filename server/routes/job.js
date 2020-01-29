const express = require('express')
const router = express.Router()
const Job = require('../database/models/job')
const User = require('../database/models/user')
const passport = require('../passport')
let finalResult = {};

router.post('/surveyComplete', (req, res) => {
    //Updates the userDB with the answers they provided on the survey
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
            priority: req.body.result[8].answertext,
            where: req.body.result[9].answertext,
            environment: req.body.result[10].answertext,
            hands: req.body.result[11].answertext
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
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
        } else if (res === "Who cares? The world is ending" || res === "Yes, but it’s too late, the damage is done" || res === "Yes, I try to make a difference in small ways") {
            result[i].environment = 'false';
        } else if (res === "Yes, the future of our planet is important and we need to make big changes now") {
            result[i].environment = 'true';
        } else if (res === "Yes, I am very hands on" || res === "I will if I have to, but I'd rather not") {
            result[i].hands = 'true';
        } else if (res === "No, I'd rather not work with my hands" || res === "Absolutely not") {
            result[i].hands = 'false';
        }
        // console.log(req.body.result);
        finalResult = req.body.result;
    }
});
router.get('/jobs', (req, res) => {
    if (finalResult[4].oralCare === 'true') {
        console.log('ORALCARE');
        Job.find({
            questionOralCare: 'true'
        },
            (err, response) => {
                res.send(response);
                console.log('momomo4');
                console.log(response.length);
            })
    }
    else if (finalResult[10].environment === 'true') {
        console.log('ENVIRONMENT');
        Job.find({
            questionEnvironment: 'true'
        },
            (err, response) => {
                res.send(response);
                console.log('momomo11');
                console.log(response.length);
            })
    }
    else if (finalResult[8].priority === 'money') {
        console.log('MONEY');
        Job.find({
            questionPriority: 'money',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo9');
                console.log(response.length);
            })
    }
    else if (finalResult[8].priority === 'helpingLeastSchool') {
        console.log('HELPING/LEASTSCHOOL');
        Job.find({
            questionPriority: 'helpingLeastSchool',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo9');
                console.log(response.length);
            })
    }
    else if (finalResult[1].income === 'boatVacation') {
        console.log('BOAT/VACATION');
        Job.find({
            questionIncome: 'boatVacation',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo1');
                console.log(response.length);
            })
    }
    else if (finalResult[5].educationNeeded === 'advanced') {
        console.log('ADVANCED');
        Job.find({
            questionEducationNeeded: 'advanced',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo5');
                console.log(response.length);
            })
    }
    else if (finalResult[9].where === 'office') {
        console.log('OFFICE');
        Job.find({
            questionWhere: 'office',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo10');
                console.log(response.length);
            })
    }
    else if (finalResult[7].subject === 'englishHistory') {
        console.log('ENGLISH/HISTORY');
        Job.find({
            questionSubject: 'englishHistory',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo9');
                console.log(response.length);
            })
    }
    else if (finalResult[7].subject === 'techShop' && finalResult[11].hands === 'true') {
        console.log('TECH/SHOP and HANDS');
        Job.find({
            questionHands: 'true',
            questionSubject: 'techShop',
            questionOralCare: 'false',
        },
            (err, response) => {
                res.send(response);
                console.log('momomo711');
                console.log(response.length);
            })
    }
    else {
        Job.find({
            questionShift: finalResult[0].shift,
            questionIncome: finalResult[1].income,
            questionTech: finalResult[2].tech,
            questionHealth: finalResult[3].health,
            questionOralCare: 'false',
            questionEducation: finalResult[5].education,
            questionPeople: finalResult[6].people,
            questionSubject: finalResult[7].subject,
            questionPriority: finalResult[8].priority,
            questionWhere: finalResult[9].where,
            questionHands: finalResult[11].hands
        }, (err, response) => {
            res.send(response);
        })
    }
});


router.post('/saved', (req, res) => {
    console.log('PRINT REQ BODY');

    User.update({
        _id: req.user._id
    }, {
        $addToSet: {
            jobs: req.body.notes
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

//DELETE ROUTE

router.delete('/delete/:id', (req, res) => {
    let jobDelete = req.params.id
    console.log("THIS WILL BE DELETED " + jobDelete);

    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $pull: { jobs: jobDelete }

    }, { new: true, useFindAndModify: false,
    }
    ).then(function (result) {
        console.log(result)
        res.json(result);
        
    }).catch(err => {
        console.log(err);
    })
});



router.get('/saved', (req, res) => {
    User.find({
        _id: req.user._id
    })
        .populate('jobs')
        .then(function (result) {
            res.send(result[0].jobs);
            console.log(result[0].jobs);

        }).catch(function (err) {
            console.log(err);
        });
})
module.exports = router