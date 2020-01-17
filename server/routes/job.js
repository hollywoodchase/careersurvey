const express = require('express')
const router = express.Router()
const Job = require('../database/models/job')
const passport = require('../passport')



router.post('/api/jobs', (req, res) => {
    Job.findAll({}, (err, response) => {
        res.json(response);
    })
});

router.get('/:id', (req, res) => {
    Job.findAll({
        questionShift: q1,
        questionIncome: q2,
        questionTech: q3,
        questionHealth: q4,
        questionEducation: { type: String, required: true },
        questionPeople: { type: Boolean, required: true },
        questionSubject: { type: String, required: true },
        questionBuild: { type: String, required: true },
        questionPriority: { type: String, required: true },
        questionWhere: { type: String, required: true },
        questionEnvironment: { type: Boolean, required: true },
        questionHands: { type: Boolean, required: true }
    })
});



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

// module.exports = router