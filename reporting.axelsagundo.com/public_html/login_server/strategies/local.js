const LocalStrategy = require('passport-local');
const passport = require('passport');
const db = require('../database');
var CryptoJS = require("crypto-js");

passport.serializeUser((user, done) => {
    console.log("this is the user below in local.js");
    console.log(user);
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    let oldSQLquery = `SELECT * FROM dashboard_users2 WHERE username = '${username}'`;

    db.query(oldSQLquery, function (err, result) { // 
        if (err) throw err;

        if (result[0]){
            done(null, result[0]);
         } else {
            done (null, false);
         }
    });
});
    
passport.use(new LocalStrategy((username, password, done) => {
    db.query(`SELECT * FROM dashboard_users2 WHERE username = '${username}'`, function (err, result) { //
        if (err) throw err;
        // console.log("-+--+--+--+--+--+--+--+--+--+--+--+--+--+-");
        // console.log(result[0]);
        // console.log(result);
        // console.log("-+--+--+--+--+--+--+--+--+--+--+--+--+--+-");
        // console.log(result.length);
        // console.log(result[0]);
        // console.log(result[0][0]);
        //console.log(result[0].username);
        if (result.length === 0){
            console.log(`There were no users found with the username: ${username} ` );
            done (null, false);
        } else {
            let passwordFromDB = result[0].password; //encrypted password
            //console.log(`i am about to encrypt ${username}'s password: ${password}`);
            let bytes = CryptoJS.AES.decrypt(passwordFromDB, 'omgurmomma'); // turn the encrypted pw to bytes
            let original_password = bytes.toString(CryptoJS.enc.Utf8); //get original password 
            //let cipherText = CryptoJS.AES.encrypt(password, 'omgurmomma').toString();
            //let bytes = CryptoJS.AES.decrypt(cipherText, 'omgurmomma');
            //let originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (original_password == password){ //check if the decrypted original password is the same as the password read from the user form. 
                done(null, result[0]);
            } else {
                done(null, false);
            }
        }
        //console.log("hello" + result[0].username);
      });
         
    }
))