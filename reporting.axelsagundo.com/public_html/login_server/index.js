// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const local = require('./strategies/local');
// const path = require('path');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'issac',
//     password: 'issac123',
//     database: 'HW3'
// })

// const usersRoute = require('./routes/users');
// const authRoute = require('./routes/auth');
// const store = new session.MemoryStore();
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true})); 

// app.use(session({
// 	secret: 'secret',
// 	cookie: {maxAge: null},
// 	resave: true,
// 	saveUninitialized: false,
// 	store
// }));

// app.use((req, res, next) => {
// 	//console.log(store);
// 	console.log(`${req.method} - ${req.url}`);
// 	next();
// });

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/users', usersRoute);
// app.use('/auth', authRoute);

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get("/", (req, res) => {


// 	const performanceQuery = new Promise((resolve, reject) => {
// 		connection.query("SELECT * FROM Performance", function (err, result) {
// 			if (err) reject(err);
// 			let performance_data = result;
// 			let loadTimes = performance_data.map(packet => packet.LoadTime).filter(loadTime => loadTime !== null);
// 			let sessionIDs = performance_data.map(packet => packet.SessionID).filter(sessionID => sessionID !== null);
// 			resolve({ loadTimes, sessionIDs });
// 		});
// 	});

// 	const staticQuery = new Promise((resolve, reject) => {
// 		connection.query("SELECT * FROM Static", function (err, result) {
// 			if (err) reject(err);
// 			console.log(result)
// 			let static_data = result;
// 			let screenHs = static_data.map(packet => packet.ScreenH).filter(screenH => screenH !== null);
// 			let screenWs = static_data.map(packet => packet.ScreenW).filter(screenW => screenW !== null);
// 			resolve({ screenHs, screenWs });
// 		});
// 	});

// 	const activityQuery = new Promise((resolve, reject) => {
// 		connection.query("SELECT SessionID, mouseClicks FROM Activity", function (err, result) {
// 			if (err) reject(err);
// 			let activity_data = result;
// 			resolve( {activity_data} );
// 		});
// 	});


// 	if (req.user && req.user.admin == 1){
// 		Promise.all([performanceQuery, staticQuery, activityQuery])
// 			.then(([{ loadTimes, sessionIDs }, { screenHs, screenWs }, {activity_data}]) => {
// 				res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs, activity_data });
// 				// res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs }d);
// 			})
// 			.catch(err => {
// 				// Handle error here
// 				console.error(err);
// 			});
// 		} 
// 		else 
// 		{
// 			// res.sendFile(path.join(__dirname, '/reportboard_b.php'));
// 			res.send("hello ur gonna get dashboard b");
// 		}
// });


// app.listen(3001, () => {
// 	console.log('Server running on port 3001');
// });


const express = require('express');
const session = require('express-session');
const passport = require('passport');
const local = require('./strategies/local');
const path = require('path');
// const db = require('/database.js');


const mysql = require('mysql');


const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'issac',
	password: 'issac123',
	database: 'HW3'
})

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const store = new session.MemoryStore();
const app = express();

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));


app.use(session({
	secret: 'secret',
	cookie: {maxAge: null},
	resave: true,
	saveUninitialized: false,
	store
}));


app.use((req, res, next) => {
	console.log(`${req.method} - ${req.url}`);
	next();
});


app.use(passport.initialize());
app.use(passport.session());


app.use('/users', usersRoute);
app.use('/auth', authRoute);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {

	if (req.user){
		if (req.user.admin == 1){

			const performanceQuery = new Promise((resolve, reject) => {

				connection.query("SELECT * FROM Performance", function (err, result) {
				if (err) reject(err);
				let performance_data = result;
				let loadTimes = performance_data.map(packet => packet.LoadTime).filter(loadTime => loadTime !== null);
				let sessionIDs = performance_data.map(packet => packet.SessionID).filter(sessionID => sessionID !== null);
				resolve({ loadTimes, sessionIDs });
				});
			});

			const staticQuery = new Promise((resolve, reject) => {
				connection.query("SELECT * FROM Static", function (err, result) {
				if (err) reject(err);
				console.log(result)
				let static_data = result;
				let screenHs = static_data.map(packet => packet.ScreenH).filter(screenH => screenH !== null);
				let screenWs = static_data.map(packet => packet.ScreenW).filter(screenW => screenW !== null);
				resolve({ screenHs, screenWs });
				});
			});

			const activityQuery = new Promise((resolve, reject) => {
				connection.query("SELECT SessionID, mouseClicks FROM Activity", function (err, result) {
				if (err) reject(err);
				let activity_data = result;
				resolve( {activity_data} );
				});
			});


			Promise.all([performanceQuery, staticQuery, activityQuery])
			.then(([{ loadTimes, sessionIDs }, { screenHs, screenWs }, {activity_data}]) => {
			res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs, activity_data });
			// res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs }d);
			})
			.catch(err => {
			// Handle error here
			console.error(err);
			});


		} else {


			const performanceQuery = new Promise((resolve, reject) => {

				connection.query("SELECT * FROM Performance", function (err, result) {
				if (err) reject(err);
				let performance_data = result;
				let loadTimes = performance_data.map(packet => packet.LoadTime).filter(loadTime => loadTime !== null);
				let sessionIDs = performance_data.map(packet => packet.SessionID).filter(sessionID => sessionID !== null);
				resolve({ loadTimes, sessionIDs });
				});
			});

			const staticQuery = new Promise((resolve, reject) => {
				connection.query("SELECT * FROM Static", function (err, result) {
				if (err) reject(err);
				console.log(result)
				let static_data = result;
				let screenHs = static_data.map(packet => packet.ScreenH).filter(screenH => screenH !== null);
				let screenWs = static_data.map(packet => packet.ScreenW).filter(screenW => screenW !== null);
				resolve({ screenHs, screenWs });
				});
			});

			const activityQuery = new Promise((resolve, reject) => {
				connection.query("SELECT SessionID, mouseClicks FROM Activity", function (err, result) {
				if (err) reject(err);
				let activity_data = result;
				resolve( {activity_data} );
				});
			});


			Promise.all([performanceQuery, staticQuery, activityQuery])
			.then(([{ loadTimes, sessionIDs }, { screenHs, screenWs }, {activity_data}]) => {
			res.render('dashboard2', { loadTimes, sessionIDs, screenHs, screenWs, activity_data });
			// res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs }d);
			})
			.catch(err => {
			// Handle error here
			console.error(err);
			});


			//res.render('dashboard1', { loadTimes, sessionIDs, screenHs, screenWs, activity_data });
		}

	} else {
	res.status(403).json({'msg': 'not authorized'});
	}
})

app.listen(3001, () => {
console.log('Server running on port 3001');
});



