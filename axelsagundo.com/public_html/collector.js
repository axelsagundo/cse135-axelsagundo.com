const endpoint = "https://axelsagundo.com/api"

function generateUUID() {
    const hexDigits = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      uuid += hexDigits[randomIndex];
    }  
    uuid = uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-4' + uuid.substr(13, 3) + '-' + hexDigits[Math.floor(Math.random() * 4) + 8] + uuid.substr(17, 3) + '-' + uuid.substr(20);
    return uuid;
}

function setDocumentCookie(cookieID){
    document.cookie = cookieID;
    console.log("document cookie: " + document.cookie);
}

setDocumentCookie(generateUUID());

function gatherStaticData() { //function that gathers the student STATIC data 

    let usrStaticData = {
        userSessionID: document.cookie,
        userAgent: window.navigator.userAgent,
        usrLang: window.navigator.language,
        usrCookiesEnabled: window.navigator.cookieEnabled,
        javascriptEnabled: true,
        imagesEnabled: true,
        cssEnabled: true,
        screenW: window.screen.width,
        screenH: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        usrNetworkConnectionType: navigator.connection ? navigator.connection.effectiveType : navigator.onLine
    };

    return usrStaticData;
}

function gatherPerformanceData() { //function that gathers the student PERFORMANCE data 
    let timing = window.performance.timing;
    let starttime = timing.navigationStart;
    let endtime = timing.loadEventEnd;
    let userTime = endtime - starttime;
    timing = JSON.stringify(timing);

    let usrPerformanceData = {
        userSessionID: document.cookie,
        timingObject: timing,
        startTime: starttime,
        endTime: endtime,
        totalTime: userTime
    };

    return usrPerformanceData;
}

function sendStaticData(){ //sends STATIC data to ECHO endpoint
    let userStaticData = JSON.stringify(gatherStaticData()); 


    console.log("about to POST static data");
    fetch(endpoint + "/static", {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userStaticData})
        .then(res => res.json())
        .then(res => console.log(res));

    
}

function sendPerformanceData() { //sends PERFORMANCE data to ECHO endpoint
    let usrPerformanceData = JSON.stringify(gatherPerformanceData());
    // console.log(usrPerformanceData);
    // console.log("waiting for response")

    console.log("about to POST performance data");
    fetch(endpoint + "/performance", {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: usrPerformanceData})
        .then(res => res.json())
        .then(res => console.log(res));    
}

/* 
---------------------------------------------------ACTIVITY DATA STUFF BELOW-------------------------------------------------------------------------------------
*/

let idleTimeOccured = false;
let lastKnownIdleTimeDate; 
let timeStart;
let time;
let hasSentData = false;


function startIdleTimer(){
    //timeStart = new Date().getTime();
    time = setTimeout(function(){
        // let timeEnd = new Date().getTime();
        lastKnownIdleTimeDate = new Date().getTime();
        idleTimeOccured = true;
        console.log("You've become Idle");

    }, 2000);
}

function resetTimer(){
    
    if(idleTimeOccured == true){
        let timeNow = new Date().getTime();
        //let calc = timeNow - lastKnownIdleTimeDate;
        //console.log("milliseconds timed out for: " + calc + " . " + calc/1000 + "(secs)");
        let idletimedata = {
            start: lastKnownIdleTimeDate,
            end: timeNow,
            duration: timeNow - lastKnownIdleTimeDate
        }
        console.log(idletimedata);
        console.log("aka, you were idle for " + idletimedata.duration/1000 + " secs")
        userActivityData.idleTimes.push(idletimedata);
        idleTimeOccured = false;
    }

    clearTimeout(time);
    startIdleTimer();
    
}


let userActivityData = {
    userSessionID: document.cookie,
    errors: [],
    mousePositions: [],
    mouseClicks:[],
    mouseScrolls: [],
    keyDown: [],
    keyUp: [],
    idleTimes: [],
    pageEnter: new Date(),
    pageExit: "null",
    pageOn: window.location.href
}



function getWindowError(){
    window.onerror = (message, filename, line_no, col_no, error) => {
        // let timestamp = new Date(Date.now()).toString();
        userActivityData.errors.push({
            message: message,
            filename: filename,
            line_no: line_no,
            col_no: col_no,
            error: error
        });
    };
}


let intervalId;

//let currentPosition = {x: 0, y: 0};

function getMousePosition(){
    window.addEventListener('mousemove', resetTimer);
    // let currentPosition = {x: 0, y: 0};
    let m_pos_x, m_pos_y;
    window.onmousemove = function(e) { m_pos_x = e.pageX; m_pos_y = e.pageY; }
    // setInterval(function() { console.log("x= " + m_pos_x + "y = " + m_pos_y); },3000);

    
    intervalId = setInterval(function() { userActivityData.mousePositions.push({x:m_pos_x, y:m_pos_y}) } , 1000);
    

    // window.addEventListener('mousemove', function (event) {
    //     currentPosition = {x: event.clientX, y: event.clientY};
    // });

    // intervalId = setInterval(function () {
    //     userActivityData.mousePositions.push(currentPosition);
    // }, 1000);

    // if (!intervalId) {
    //        intervalId = setInterval(function () {
    //            userActivityData.mousePositions.push(currentPosition);
    //        }, 1000);
    // }

    // window.addEventListener('mouseout', function () {
    //     clearInterval(intervalId);
    //     intervalId = null;
    // });    

    //setInterval(function () {
    //     userActivityData.mousePositions.push(currentPosition);
    // }, 1000);
}

function getMouseClick(){
    window.addEventListener('click', function(event) {
        userActivityData.mouseClicks.push({
            x: event.clientX,
            y: event.clientY,
            button: event.button
        });
    });

    window.addEventListener('click', resetTimer);
}

function getMouseScroll(){
    window.addEventListener('scroll', function(){
        userActivityData.mouseScrolls.push({
            x: window.scrollX,
            y: window.scrollY
        });
    });
    window.addEventListener('scroll', resetTimer);
}

let keyDownStr = "";
function getKeyDown(){    
    window.addEventListener('keydown', function (event) {
        keyDownStr += event.key;
    });
    window.addEventListener('keyup', resetTimer);
}

let keyUpStr = "";
function getKeyUp(){    
    window.addEventListener('keyup', function (event) {
        keyUpStr += event.key;
    });

    window.addEventListener('keyup', resetTimer);
}

function sendActivityData(){

    if (hasSentData == false){
        console.log("Sending a POST to /api/activity");

        userActivityData.keyDown = keyDownStr;
        userActivityData.keyUp = keyUpStr;
        fetch(endpoint + '/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userActivityData)
        });
        hasSentData = true;
    } else {
        console.log("Sending PUT to api/activity");
        console.log(JSON.stringify(userActivityData));
        let myCookie = document.cookie;
        userActivityData.keyDown = keyDownStr;
        userActivityData.keyUp = keyUpStr;
        fetch(endpoint + '/activity/' + myCookie, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userActivityData)
        });
    }
    idleTimeOccured = false;
    keyDownStr= "";
    keyUpStr = "";

    userActivityData = {
        userSessionID: document.cookie,
        errors: [],
        mousePositions: [],
        mouseClicks:[],
        mouseScrolls: [],
        keyDown: [],
        keyUp: [],
        idleTimes: [],
        pageEnter: new Date(),
        pageExit: null,
        pageOn: window.location.href
    }    
}



/* 
----------------------------------------------------------------------------------------------------------------------------------------
*/

// CALLING STATIC AND PERFORMANCE SEND FUNCTIONS AFTER LOAD. 
window.addEventListener('load', function() {
    let mybtn = document.getElementById("hellobtn");
    mybtn.addEventListener("click", function(){
        userActivityData.keyDown = keyDownStr;
        userActivityData.keyUp = keyUpStr;

        console.log(userActivityData);
    });
    setTimeout(function() {
        sendStaticData();
        sendPerformanceData();
    }, 0);
});


getWindowError();
getKeyDown();
getKeyUp();
getMousePosition();
getMouseClick();
getMouseScroll();


window.addEventListener('beforeunload', function () {
    confirm("You leaving?!");
    userActivityData.pageExit = new Date();
    sendActivityData();
    //hasSentData = false;
});


setInterval(function () {
    sendActivityData();}, 45000);







