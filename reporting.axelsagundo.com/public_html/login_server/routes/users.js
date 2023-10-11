const {Router} = require('express');
const db = require('../database');
const router = Router();
const CryptoJS = require("crypto-js");

// middleware
router.use((req, res, next) => {
    console.log("================================================");
    console.log('Requests made to /USERS ROUTE');
    next();
});



router.get('/', (req, res) =>{
    //console.log(req);
    //console.log(req.user);
    if (req.user && req.user.admin == 1){
        console.log("huh");
        console.log(req.user);
        console.log("huh");

        db.query("SELECT * FROM dashboard_users2", function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            console.log(JSON.stringify(result));
            res.json(result);
        });
        //res.status(200).json({'msg': 'success'});
    } else {
        console.log("here... sending not authorized to get all users");
        res.status(403).json({'msg': 'not authorized'});
    }

    //let results = await db.promise.query("SELECT * FROM USERS");

    // console.log(results);
    // res.send("jelo");
})


router.get('/users.html', (req, res) =>{
    if (req.user && req.user.admin == 1){
        // console.log(__dirname);
        // const htmlFile = path.resolve(__dirname, '/users.html'); // update the path to your html file
        // res.sendFile(htmlFile);
        // res.redirect('/users.html');
        res.sendFile(__dirname + '/users.html');
        
    } else {
        res.status(403).json({'msg': 'not authorized'});
    }
   
})



router.get('/:id', (req, res) =>{


    if (req.user && req.user.admin == 1){
        //console.log("HELLOOOOOOO");
        //console.log(req.params.id);

        let old_SQL_query = `SELECT * FROM dashboard_users WHERE username = '${req.params.id}'`;
        let sqlQuery = `SELECT  * FROM dashboard_users2 where id = '${req.params.id}'`;
        
        db.query( sqlQuery , function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            console.log(JSON.stringify(result));
            res.json(result);
        });
        //res.status(200).json({'msg': 'success'});
    } else {
        res.status(403).json({'msg': 'not authorized'});
    }

    //let results = await db.promise.query("SELECT * FROM USERS");

    // console.log(results);
    // res.send("jelo");
})



router.post('/', (req, res) => {

    if (req.user && req.user.admin == 1){
        const {username, password, admin} = req.body;
        if (admin == undefined || admin > 1 || admin < 0){
            admin = 0;
        }
        console.log(`i am about to encrypt ${username}'s password: ${password} and I will check if they are admin or not: ${admin}`);
        let cipherText = CryptoJS.AES.encrypt(password, 'omgurmomma').toString();


        if (username && password){
            let SQLquery = `INSERT INTO dashboard_users2 (username, password, admin) VALUES('${username}', '${cipherText}', '${admin}')` //modified for dashboard2
            db.query(SQLquery, function (err, result) {
                if (err) throw err;
                res.status(201).json({'msg': 'created user'});

            });
        } else {
            res.json({"msg":"wrong inputs"})
        }
    }
})


//PUT
router.put('/:id', (req, res) => { //post should only be used to modify EVERYTHING

    console.log("i am in the PUT");
    const user_id = req.params.id; 
    let patch_data = req.body;
    let user_raw_password = patch_data.password;
    let cipherText = CryptoJS.AES.encrypt(user_raw_password, 'omgurmomma').toString();

    patch_data.password = cipherText
    // console.log(patch_data);

    db.query("UPDATE dashboard_users2 SET ? where id = ?", [patch_data, user_id], (err) => {
        if (err) throw err
        res.status(200).json("done");        
    })
})

//PATCH
router.patch('/:id', (req, res) => {
    
    console.log("i am in the patch");
    console.log(req.user);
    const user_id = req.params.id;   
    let patch_data = req.body;

    // console.log(patch_data);
    // console.log("hello>" + patch_data.username);
    // console.log(patch_data.password == undefined);

    if (patch_data.password == undefined){
        db.query("UPDATE dashboard_users2 SET ? where id = ?", [patch_data, user_id], (err) => {
            if (err) throw err
            res.status(200).json("done");        
        });
    } else {
        let user_raw_password = patch_data.password;
        let cipherText = CryptoJS.AES.encrypt(user_raw_password, 'omgurmomma').toString();

        patch_data.password = cipherText
        // console.log(patch_data);

        db.query("UPDATE dashboard_users2 SET ? where id = ?", [patch_data, user_id], (err) => {
            if (err) throw err
            res.status(200).json("done");        
        });

    }


    


    

    // db.query(SQLquery, function (err, result) {
    //     if (err) throw err;
    //     res.status(201).json({'msg': 'created user'});

    // });
})

//DELETE
router.delete('/:id', (req, res) => {

    if (req.user && req.user.admin == 1){
        let sqlQuery = `DELETE FROM dashboard_users2 where id = '${req.params.id}'`;
        
        db.query( sqlQuery , function (err, result, fields) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            res.json(result);
        });
    } else {
        res.json({"msg": "not authroized "});
    }
})




// router.put('/', (req, res) => {
//     const {username, password, admin} = req.body;

//     let cipherText = CryptoJS.AES.encrypt(password, 'omgurmomma').toString();



//     if (username && password && admin){ //if username and password and admin exists. 
//         let SQLquery = `UPDATE dashboard_users SET username = '${username}', password = '${cipherText}', admin = '${admin}' WHERE username = `;
//         db.query(SQLquery, function (err, result, fields) {
//             if (err){
//                 res.send('fucc thers an error');
//                 throw err;
//             }
//         });

//         res.status(201).json({'msg': 'created user'});

     
//     }


// });


module.exports = router;