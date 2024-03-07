const b = document.getElementById("signup");
let ev;
b.addEventListener("click",()=> check());

function showLoadingSpinner() {
  document.getElementById('loading-container').style.display = 'flex';
}

function hideLoadingSpinner() {
  document.getElementById('loading-container').style.display = 'none';
}
const pass = document.getElementById('password');
function isPasswordStrong(password) {
    
    const result = zxcvbn(password);

    return result.score >= 3;
}
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', validateEmail);

emailInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    check();
  }
});

pass.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    check();
  }
});

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.focus();
        ev = true;
    } else {
        emailError.textContent = '';
        ev = false;
    }
}

function check(){
  showLoadingSpinner();
  const e = document.getElementById("email");
  const p = document.getElementById("password");
  const d = document.getElementById("user");
  const gg = sessionStorage.getItem('cbs');
  if(gg === 'true'){
    if(e.value !== '' && p.value !== '' && d.value !== ''){
      const chack = isPasswordStrong(p.value);
      if (chack === true){
        adduser(e.value,p.value,d.value);
        e.value = '';
        p.value = '';
        d.value = '';
      }else{
        hideLoadingSpinner();
        alert('weak password5');
        p.value = '';
      }
    }
  }else{
    hideLoadingSpinner();
    alert('You have to read and agree to the terms and conditions.');
  }
}

const socket = io('https://main-testing-server.onrender.com');
function adduser(email, password, displayName) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.updateProfile({
        displayName: displayName
      }).then(() => {
        user.sendEmailVerification().then(() => {
          firebase.auth().signOut();
          hideLoadingSpinner();
          alert(displayName + ' signed up successfully! A verification email has been sent to your email. Please verify your email before logging in.');
          window.location.href = 'index.html';
        }).catch((error) => {
          hideLoadingSpinner();
          console.error('Error sending email verification:', error);
        });
      }).catch((error) => {
        hideLoadingSpinner();
        console.error('Error updating display name:', error);
      });
    })
    .catch((error) => {
      hideLoadingSpinner();
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-up error:', errorCode, errorMessage);
    });
}
