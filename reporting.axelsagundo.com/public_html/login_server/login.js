// document.getElementById('loginForm').addEventListener('submit', function (event) {
//     event.preventDefault(); 

//     const credentialType = document.getElementById('credentialType').value;
//     const credential = document.getElementById('credential').value;
//     const password = document.getElementById('password').value;

//     console.log(credentialType);
//     console.log(credential);
//     console.log(password);
//     // if credentialType
//     // credential.addEventListener()
// });


function logSubmit(event) {
    log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
    event.preventDefault();
  }
  
  const form = document.getElementById("loginForm");
  const log = document.getElementById("log");
  form.addEventListener("submit", logSubmit);
