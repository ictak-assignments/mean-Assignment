const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserData = require("../model/user");
const { verifyToken } = require("../middleware");

router.post('/login', function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    if (username == 'admin' && password == '1234') {
        req.session.role = 'admin';
        console.log("admin login success")
        let payload = { subject: username + password, admin:true }
        let token = jwt.sign(payload, 'secretKey')
        res.send({ status: true, token, role: req.session.role });

    } else {
        UserData.findOne({ username: username, password: password }, function (err, user) {
            console.log(req.body, "mongodbcheck for user");
            if (err) {
                res.send({ status: false, data: 'Response error. No Internet' });
            }
            else if (user) {
                console.log("local user login success")
                req.session.role = 'user';
                let payload = { subject: username + password,admin:false}
                let token = jwt.sign(payload, 'secretKey')
                res.send({ status: true, token, role: req.session.role })
                console.log({ status: true, token, role: 'user' })
            } else {
                res.send({ status: false, data: 'NOT FOUND' });
            }
            console.log("user data", user)
        });
    }
});

//signup data insert to mongo db

router.post('/register', function (req, res) {
    console.log(req.body.user)
    let item = {

        username: req.body.user.username,
        password: req.body.user.password,
        email: req.body.user.email


    }

    let signup = UserData(item);
    signup.save().then(function (data) {
        res.send(true);
    }).catch(function (error) {
        res.send(false);
    })


});



//***************************************************************************** */
// router.post("/login", (req, res) => {
//   const username = "admin";
//   const password = "1234";

//   if (!username) {
//     res.status(401).send("Invalid username");
//   } else if (password !== req.body.password && username != req.body.username) {
//     res.status(401).send("Invalid password");
//   } else {
//     let payload = { subject: username + password };
//     let token = jwt.sign(payload, "secretKey");
//     res.status(200).send({ token });
//   }
// });
//*********************************************************************************//
module.exports = router;
