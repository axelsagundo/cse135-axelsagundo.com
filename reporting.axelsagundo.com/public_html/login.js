

// function logSubmit(event) {
//     log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
//     event.preventDefault();
//   }
  
function handleFormSubmission(event) {
    event.preventDefault();
    const credentialType = document.getElementById("credentialType");
    const credential = document.getElementById("credential");
    const password = document.getElementById("password");

    console.log(credentialType.value);
    console.log(credential.value);
    console.log(password.value);

}

window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById("loginForm");
    //const log = document.getElementById("log");
    form.addEventListener("submit", handleFormSubmission); 
    
    
});


  
