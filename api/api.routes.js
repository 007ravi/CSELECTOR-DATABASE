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
    db.query(qry.login, [req.body.userEmail, req.body.userPassword], function (err, result) {
        if (err)
            throw err;

        if (result.length > 0)
            tokenService.createUserToken(result[0].userId, result[0].account_accountNumber,
                function (newtoken) {
                    res.end(newtoken);
                })
        res.end();
    });
});


module.exports = router;