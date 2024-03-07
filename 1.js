sessionStorage.clear();
localStorage.clear();
// Get the user-agent string
const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (isIOS) {
    localStorage.setItem('device' , 'true')
} else {
    localStorage.setItem('device' , 'false')
}



const auth = firebase.auth();
showLoadingSpinner();
const cts = document.getElementById('cts');
const socket = io("https://main-testing-server.onrender.com");
socket.on('connect' , ()=>{
  hideLoadingSpinner();
  //cts.parentNode.textContent="";
});
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
function showLoadingSpinner() {
  document.getElementById("loading-container").style.display = "flex";
}



// Function to hide the loading spinner
function hideLoadingSpinner() {
  document.getElementById("loading-container").style.display = "none";
}

const provider = new firebase.auth.GoogleAuthProvider();
const gb = document.getElementById("gb");
const s = document.getElementById("signin");
const el = gb.offsetWidth;
s.onclick = () => {
  event.preventDefault();
  enter();
};
s.style.width = el + "px";
const pass = document.getElementById("password");
const emailInput = document.getElementById("email");
emailInput.addEventListener('input', validateEmail);

const h = document.querySelector("hr");
let ev;
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
function checkmail(m){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(m)) {
      return false;
  } else {
      return true;
  }
}
function wpass(){
  
}
gb.onclick = () => auth.signInWithPopup(provider);
emailInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    enter();
  }
});
pass.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    enter();
  }
});
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('validation_state' , 'await');
      if (user.emailVerified) {
        const uid = user.uid;
        const code = grc();
        localStorage.setItem('myuic' , uid);
        socket.emit('logged_in' , ({uid: uid , date: new Date() , type:'Email and password'}));
        socket.emit("redirect-request" , ({uid: uid , c: code}));
        socket.on(code , (data)=>{
          if(data === 'logged'){
            firebase.auth().signOut();
            hideLoadingSpinner();
            alert('It seems like you are currently logged in on another device. Please logout from said device and try again.If you dont have access to said device, please visit the remote logout page.');;
          }else{
            hideLoadingSpinner();
            localStorage.setItem('bio' , data.bio.toString());
            window.location.href = "chat.html" + '?user=' + user.displayName.replace(/ /g, '_') + '?uic=' + uid + '?valc=' + data.vc;
          }
        });
      }else{
        firebase.auth().signOut();
        hideLoadingSpinner();
        alert("You have to verify your email before logging in.");
      }
    })
    .catch((error) => {
      hideLoadingSpinner();
      const f = localStorage.getItem('fail');
      localStorage.setItem("fail" , f + 1 );
      if ((f+1) >= 6){
        alert('The email you have used has been disabled due to too many incorrect entries. Please visit our support page and provide details on the issue.');
        socket.emit('lock' , (emailInput.value));
      }else{
        socket.emit('failed_entry' , ({attempted_email: emailInput.value , date: new Date()}));
        emailInput.value = '';
        if(error.code = 'auth/wrong-password'){
          if(error.message === 'The password is invalid or the user does not have a password.'){
            wpass();
            alert('Wrong password!');
          }else {
            alert(error.message);
          }
        }else if(error.code === 'auth/user-not-found'){
          alert("Your account doesn\'t exist. Please sign up.");
        }
        }
    });
}
function enter() {
  showLoadingSpinner();
  const e = emailInput.value;
  const p = pass.value;
  const gg = true;
  if(gg === true){
    if (e !== '' && p !== ''){
      if(ev !== true){
        login(e, p);
        pass.value = '';
      }else{
        hideLoadingSpinner();
        alert("Please enter a valid email address");
      }
    }else{
      hideLoadingSpinner();
      alert("Your email or passoword has not been filled out");
    }
  }else{
    hideLoadingSpinner();
    alert('You have to read and agree to the terms and conditions.');
  }
}
function grc() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

auth.onAuthStateChanged(async (user) => {
  try{
    if (user) {
      const isGoogleSignIn = user.providerData.some(provider => provider.providerId === 'google.com');
      if (isGoogleSignIn) {
        localStorage.setItem('user_data_firebase', JSON.stringify(user));
        const uid = user.uid;
        localStorage.setItem('validation_state', 'await');
        const code = grc();
        localStorage.setItem('myuic', uid);
        socket.emit('logged_in', ({ uid: uid, date: new Date(), type: 'Google sign in' }));
        socket.emit("redirect-request", ({ uid: uid, c: code }));
        socket.on(code, (data) => {
          if (data === 'logged') {
            firebase.auth().signOut();
            alert('It seems like you are currently logged in on another device. Please logout from said device and try again.');
          } else {
            const dd = 'n';
            if (dd.toLowerCase() === 'n') {
              console.log(data);
              localStorage.setItem('bio', data.bio.toString());
              window.location.href = "chat.html" + '?user=' + user.displayName.replace(/ /g, '_') + '?uic=' + uid + '?valc=' + data.vc;
            } else if (dd.toLowerCase() === 'y') {
              const newn = prompt('New display name? No spaces, use - or _.');
              if (newn !== '') {
                window.location.href = "chat.html" + '?user=' + newn + '?uic=' + uid + '?valc=' + data.vc;
              } else {
                auth.signOut();
                window.location.reload();
              }
            } else {
              alert(data.bio);
              localStorage.setItem('bio', data.bio);
              window.location.href = "chat.html" + '?user=' + user.displayName.replace(/ /g, '_') + '?uic=' + uid + '?valc=' + data.vc;
            }
          }
        });

        // Check if the user's account is disabled or suspended
        const userRecord = await admin.auth().getUser(uid);
        if (userRecord.disabled) {
          alert('Your account is suspended or disabled. Please contact support for assistance.');
        }
      }
    }
  }catch(e){
    console.log(e);
  }
});

function sendPasswordResetEmail(x) {
  const email = x;
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent to ' + email);
    })
    .catch((error) => {
      alert(error.message);
    });
}
const fpe = document.getElementById('fpe');
fpe.onclick = () => {
  const email = prompt('Enter your email address:');
  const r = sendPasswordResetEmail(email);
};