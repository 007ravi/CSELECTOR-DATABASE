//read public and private key
var fs = require("fs");
var privateKEY = fs.readFileSync("./token/private.key", "utf8");
var publicKEY = fs.readFileSync("./token/public.key", "utf8");

//token
var jwt = require("jsonwebtoken");

//config
var userConfig = require("./../.config/user.config"); //provide authentication to user

var tokenService = new function () {

  this.createUserToken = function (username,email, callback) {

    userConfig.payload["username"] = username;
    userConfig.payload["email"] = email;

    var token = jwt.sign(
      userConfig.payload,
      privateKEY,
      userConfig.signToken
    );

    callback(token);
  };

  this.verifyUserToken = function (token, callback) {
    jwt.verify(token, publicKEY, userConfig.verifyToken, callback);
  };
}();

module.exports = tokenService;