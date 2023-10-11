// simple Express.js RESTful API
'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import pkg from 'uuid';
const {v4: uuidv4} = pkg;
import pkg2 from 'body-parser';
const { json } = pkg2;

// initialize the port & app
const
  port = 3000,
  app = express();


// const mysql = require('mysql');

import mysql from 'mysql';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'issac',
    password: 'issac123',
    database: 'HW3'
})


connection.connect(function(error){
    if (error) throw error;
    console.log("Connected!!! Let's see what we have in our Performance & Static Tables");
});

// route for the root. I think i will send a fetch request 
// to axelsagundo.com/api when the user requests axelsagundo.com 
// and send a UUID. From there I will set that UUID as the cookie session

app.use(express.json());
app.use(cookieParser());

app.get('/', function (request, response) {

  console.log("request for the root document.");
});

// all the routes we are going to use

function getcookie(req) {
  var cookie = req.headers.cookie;
  return cookie.split('; ');
}

app
  .route("/static")  
  .get((request, response) => {
    /* --------------------------------------- GET STATIC --------------------------------------- */
   
     let sqlQuery = "SELECT * FROM Static";
     connection.query(sqlQuery, function (error, result) {

      if (error) throw error;
      response.set('Content-Type', 'application/json');
      response.json(result);
     });

  })
  .post((request, response) => {

    /* --------------------------------------- POST TO STATIC --------------------------------------- */

    let myjsonobj = request.body
    //console.log("Object that we will insert to Static table: " + JSON.stringify(myjsonobj));

    console.log("recieved a POST to api/static")
    
    let sqlQuery = "INSERT INTO Static (SessionID, UserAgentString, UserLang, Cookies, Javascript, Images, CSS, ScreenW, ScreenH, WindowW, WindowH, Network) VALUES (?)";

    connection.query(sqlQuery,[Object.values(myjsonobj)], function (err, result) {
      if (err) throw err;
      console.log("Succesfully sent POST to Static Table");
    });
    
    // the response to the client. simply echoing 
    response.set('Content-Type', 'application/json');
    response.send(request.body); 
  })

app
  .route("/static/:userID")
  .get((request, response) => {
    /* --------------------------------------- GET ID IN STATIC --------------------------------------- */
    let idrequest = request.params.userID;

    let sqlQuery = `SELECT * FROM Static WHERE sessionID = "${idrequest}"`;

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        response.set('Content-Type', 'text/plain');
        response.send("sorry, something went wrong.")

      } else {
        response.set('Content-Type', 'application/json');
        response.json(result);
      }
    });
  })
  .put((request, response) => {
      /* --------------------------------------- PUT ID IN STATIC --------------------------------------- */

      let idrequest = request.params.userID;

      let data = [request.body.UserAgentString, request.body.UserLang, request.body.Cookies, request.body.Javascript, request.body.Images, request.body['CSS'], request.body.ScreenW, request.body.ScreenH, request.body.WindowW, request.body.WindowH, request.body.Network, idrequest];
        
      let sqlQuery = "UPDATE Static SET UserAgentString = ?, UserLang = ?, Cookies = ?, Javascript = ?, Images = ?, CSS = ?, ScreenW = ?, ScreenH = ?, WindowW = ?, WindowH = ?, Network = ? WHERE sessionID = ?";
      
      connection.query(sqlQuery, data, function (error, result){
        if(error){
          throw error;
        } else {
          response.send(result);
        }
      });
  })
  .delete((request, response) => {
       /* --------------------------------------- DELETE ID IN STATIC --------------------------------------- */
       let idrequest = request.params.userID;
       let sqlQuery = `DELETE FROM Static WHERE sessionID = "${idrequest}"`;
   
       connection.query(sqlQuery, function (error, result){
         if(error){
           throw error;
         } else {
           response.send(result)
         }
       });
  })

app
  .route("/performance")
  .get((request, response) => {
    /* --------------------------------------- GET PERFORMANCE --------------------------------------- */
    let sqlQuery = "SELECT * FROM Performance";

    connection.query(sqlQuery, function (error, result) {
      if (error) throw error;

      response.set('Content-Type', 'application/json');
      response.json(result);

    });
  })
  .post((request, response) => {

    /* --------------------------------------- POST TO PERFORMANCE --------------------------------------- */

   
    console.log("Recieved a POST to /api/performance");
  
    let myjsonobj = request.body //the JSON object recieved from the client.

    // console.log("Object that we will insert to Performance table: " + JSON.stringify(myjsonobj));
  
    var sqlQuery = "INSERT INTO Performance (SessionID, timing, start, end, loadTime) VALUES (?)"; 

    connection.query(sqlQuery, [Object.values(myjsonobj)], function (err, result) {
      if (err) throw err;
      console.log("Succesfully sent POST to Performance Table");
    });

    // connection.query("SELECT * FROM Performance", function (err, result, fields) {
    //   if (err) throw err;
    //   console.log(result);
    // });
 
    response.set('Content-Type', 'application/json');
    response.send(request.body); 

  })

app
  .route("/performance/:userID")
  .get((request, response) => {
    /* --------------------------------------- GET ID IN PERFORMANCE --------------------------------------- */
  
    let idrequest = request.params.userID;

    let sqlQuery = `SELECT * FROM Performance WHERE sessionID = "${idrequest}"`;

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        response.set('Content-Type', 'text/plain');
        response.send("sorry, something went wrong.")

      } else {
        response.set('Content-Type', 'application/json');
        response.json(result);
      }
    });
  })
  .put((request, response) => {

    /* --------------------------------------- PUT ID IN PERFORMANCE --------------------------------------- */

    let idrequest = request.params.userID;

    // let data = [request.body.timing, request.body.start, request.body.end, request.body.loadTime, idrequest];
    let data = [request.body.timing, request.body.start, request.body.end, request.body.loadTime, idrequest];

    // let timingobjstr = request.

    let sqlQuery = "UPDATE Performance SET timing = ?, start = ?, end = ?, loadTime = ? WHERE sessionID = ?";
    
    connection.query(sqlQuery, data, function (error, result){
      if(error){
        error.send('error');
      } else {
        response.send(result)
      }
    });
  })
  .delete((request, response) => {
    /* --------------------------------------- DELETE ID IN PERFORMANCE --------------------------------------- */
    let idrequest = request.params.userID;
    let sqlQuery = `DELETE FROM Performance WHERE sessionID = "${idrequest}"`;

    connection.query(sqlQuery, function (error, result){
      if(error){
        throw error;
      } else {
        response.send(result)
      }
    });
  })

app
  .route("/activity")
  .get((request, response) => {
    let sqlQuery = "SELECT * FROM Activity";

    connection.query(sqlQuery, function (error, result) {

      if (error) throw error;
      response.set('Content-Type', 'application/json');
      response.json(result);

     });
  })
  .post((request, response) => {
    // console.log("activity/POST");
    // console.log(request.body);
    // console.log(JSON.stringify(request.body));

    // let sqlQuery = "INSERT INTO Activity (SessionID, Errors, mousePositions, mouseClicks, mouseScrolls, keyDown, keyUp, idleTimes, pageEnter, pageExit, pageOn) VALUES (?)";
    let sqlQuery = "INSERT INTO Activity (SessionID, Errors, mousePositions, mouseClicks, mouseScrolls, keyDown, keyUp, idleTimes, pageEnter, pageExit, pageOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  
    // let myjsonobj = request.body
    let userSessionID = request.body['userSessionID'];
    // console.log(userSessionID);
    let usrErrors = JSON.stringify(request.body['errors']);
    // console.log(usrErrors);
    let mousePositions = JSON.stringify(request.body['mousePositions']);
    // console.log(mousePositions);
    let mouseClicks = JSON.stringify(request.body['mouseClicks']);
    // console.log(mouseClicks);
    let mouseScrolls = JSON.stringify(request.body['mouseScrolls']);
    // console.log(mouseScrolls);
    //let keyDown = JSON.stringify(request.body['keyDown']);
    let keyDown = request.body['keyDown'];
    // console.log(keyDown);
    // let keyUp = JSON.stringify(request.body['keyUp']);
    let keyUp = JSON.stringify(request.body['keyUp']);
    // console.log(keyUp);
    let idleTimes = JSON.stringify(request.body['idleTimes']);
    // console.log(idleTimes);
    let pageEnter = request.body['pageEnter'];
    // console.log(pageEnter);
    let pageExit = request.body['pageExit'];
    // console.log(pageExit);
    let pageOn = request.body['pageOn'];
    // console.log(pageOn);


    let inserts = [userSessionID, usrErrors , mousePositions , mouseClicks , mouseScrolls , keyDown , keyUp, idleTimes, pageEnter, pageExit, pageOn];

    console.log(inserts);

    // console.log(usrErrors);
    // console.log(mousePositions);

    connection.query(sqlQuery, inserts, function (err, result) {
      if (err) throw err;
      console.log("Succesfully sent POST to ACTIVITY Table");
    });

    response.set('Content-Type', 'application/json');
    response.send(request.body); 
    
    // the response to the client. simply echoing 
    

    //response.send("hello");


  })

app
  .route("/activity/:userID")
  .get((request, response) => {
    let idrequest = request.params.userID;

    // let sqlQuery = `SELECT * FROM Activity WHERE SessionID`
    let sqlQuery = `SELECT * FROM Activity WHERE SessionID = "${idrequest}"`;

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        response.set('Content-Type', 'text/plain');
        response.send("sorry, something went wrong.")

      } else {
        response.set('Content-Type', 'application/json');
        response.json(result);
      }
    });
  })
  .put((request, response) => {

    console.log("activity/PUT/:USERID");
    console.log(request.body);

    let userSessionID = request.body['userSessionID'];
    let usrErrors = JSON.stringify(request.body['errors']);
    let mousePositions = JSON.stringify(request.body['mousePositions']);
    let mouseClicks = JSON.stringify(request.body['mouseClicks']);
    let mouseScrolls = JSON.stringify(request.body['mouseScrolls']);
    let keyDown = request.body['keyDown'];
    let keyUp = request.body['keyUp'];
    let idleTimes = JSON.stringify(request.body['idleTimes']);
    let pageEnter = request.body['pageEnter'];
    let pageExit = request.body['pageExit'];
    let pageOn = request.body['pageOn'];

    
    let idrequest = request.params.userID;

    let inserts = [usrErrors , mousePositions , mouseClicks , mouseScrolls , keyDown , keyUp, idleTimes, pageEnter, pageExit, pageOn, idrequest];

    //let sqlQuery = "INSERT INTO Activity (SessionID, Errors, mousePositions, mouseClicks, mouseScrolls, keyDown, keyUp, idleTimes, pageEnter, pageExit, pageOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let sqlQuery = "UPDATE Activity SET Errors = ?, mousePositions = ?, mouseClicks = ?, mouseScrolls = ?, keyDown = ?, keyUp = ?, idleTimes = ?, pageEnter = ?, pageExit = ?, pageOn = ? WHERE SessionID = ?";
      
      connection.query(sqlQuery, inserts, function (error, result){
        if(error){
          throw error;
        } else {
          response.send(result);
        }
      });


    // response.send("hello");

  })
  .delete((request, response) => {
    let idrequest = request.params.userID;
    
    let sqlQuery = `DELETE FROM Activity WHERE SessionID = "${idrequest}"`;

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        response.set('Content-Type', 'text/plain');
        response.send("sorry, something went wrong.")

      } else {
        response.set('Content-Type', 'application/json');
        response.json(result);
      }
    });

  })

// app.post('/performance', function (request, response) {
//   //res.json(req.body);
//   //console.log(JSON.stringify([request.body])); 
//   //console.log(request.body.totalTime);
//   response.set('Content-Type', 'application/json');
//   response.send(request.body); 
// });

app.listen(port);


