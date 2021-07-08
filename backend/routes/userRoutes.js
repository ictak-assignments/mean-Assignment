const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserData = require("../model/user");
const { verifyToken } = require("../middleware");

router.post('/login', function (req, res) {
    console.log(req.body);
    const { username,password } = req.body
    if (username == 'admin' && password == '1234') {
        req.session.role = 'admin';
        console.log("admin login success")
        const payload = { subject: username + password, admin:true }
        const token = jwt.sign(payload, 'secretKey')
        res.send({ status: true, token, role: req.session.role });

    } else {
        UserData.findOne({ username: username, password: password }, function (err, user) {
            if (err) {
                res.send({ status: false, data: 'you havenot registered' });
            }
            else if (user) {
                console.log("an user loginned")
                req.session.role = 'user';
                const payload = { subject: username + password,admin:false}
                const token = jwt.sign(payload, 'secretKey')
                res.send({ status: true, token, role: req.session.role })
            } else {
                res.send({ status: false, data: 'NOT FOUND' });
            }
        });
    }
});

//************************ register route **********************************************/
router.post('/register', function (req, res) {
    console.log(req.body.user)
    const user = new UserData(req.body.user)
    user.save().then(function (data) {
        res.send(true);
    }).catch(function (error) {
        res.send(false);
    })
});

module.exports = router;


//***************************************************************************** */
// router.post("/login", (req, res) => {
//   const username = "admin";
//   const password = "1234";

//   if (!username) {
//     res.status(401).send("Invalid username");
//   } else if (password !== req.body.password && username != req.body.username) {
//     res.status(401).send("Invalid password");
//   } else {
//     const payload = { subject: username + password };
//     const token = jwt.sign(payload, "secretKey");
//     res.status(200).send({ token });
//   }
// });
//*********************************************************************************//
