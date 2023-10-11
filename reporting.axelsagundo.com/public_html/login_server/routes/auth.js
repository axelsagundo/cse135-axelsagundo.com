const {Router} = require('express');
const path = require('path');
const passport = require('passport');


const router = Router();

router.post('/', passport.authenticate('local'), (req, res) => {
    //res.redirect('dashboard.html');
    // res.redirect('https://reporting.axelsagundo.com/dashboard');
    // res.send('go to https://reporting.axelsagundo.com/dashboard');
    // console.log()
    res.sendFile(path.join(__dirname, '/goto.html'));


});


module.exports = router;
