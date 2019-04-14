'use strict';

//api route 
var express = require("express");
var router = express.Router();

//database
var db = require("./../scripts/database");
var qry = require("./../.config/database.query")

//token
var tokenService = require("./../token/tokenService");


//api/login
router.post("/login", function (req, res) {
    console.log(req.body.userEmail,req.body.userPassword);
    db.query(qry.login, [req.body.userEmail, req.body.userPassword], function (err, result) {
        if (err)
            throw err;
        if (result.length > 0) {
            tokenService.createUserToken(result[0].username, result[0].email,
                function (newtoken) {
                    res.end(newtoken);
                });
            }
        res.end();
    });
});

//api/signup
router.post("/signup", function (req, res) {
    console.log(req.body);
    db.query(qry.signUp, [req.body.userName, req.body.userEmail, req.body.userPassword, req.body.phoneno], function (err, result) {
        if (err)
            throw err;

        if (result.length > 0)
            tokenService.createUserToken(result[0].username, result[0].email,
                function (newtoken) {
                    res.end(newtoken);
                })
        res.end();
    });
});


//api/colleges
router.get("")
module.exports = router;