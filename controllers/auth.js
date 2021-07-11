
const mysql=require("mysql");
var express = require('express');
var router = express.Router();
var db=mysql.createConnection({
    host:process.env.DTABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

});
// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration');
});
// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm  
     }

var sql='SELECT * FROM users WHERE email_address =?';
db.query(sql, [inputData.email] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.email+ "was already exist";
 }else if(inputData.passwordConfirm != inputData.password){
    var msg ="Password & Confirm Password is not Matched";
 }else{
     
    // save users data into database
    var sql = 'INSERT INTO registration SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('registration-form',{alertMsg:msg});
})
     

});
module.exports = router;
