// Running version 1.0.0 //
sessionStorage.clear();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const socket = io("https://main-testing-server.onrender.com");
let  currentChat = null;
let  chatHistory = {};
let  username ;
let  cu = new Set();
let  uniqueCode;
let  storage = {};
let  group = {};
let  token;
let  masterKey;
let  currentcc;
let  groupss = new Set();
let  locked = new Set();
const bio = localStorage.getItem('bio');

if(bio === '400'){
  document.getElementById('chatlock').style.display = 'none';
  document.getElementById('chatunlock').style.display = 'none';
}

setTimeout(()=>{loadChatHistory()}, 3000);

const thing = localStorage.getItem('grouptemphis');
if(thing){
  group = JSON.parse(thing);
}
// Function to add a message to the chat history
function addToChatHistory(user, message, timestamp, sent) {
  if (!chatHistory[user]) {
    chatHistory[user] = [];
  }
  encrypt(message , masterKey).then((stuff)=>{
    chatHistory[user].push({
      text: stuff,
      timestamp: timestamp,
      sent: sent,
      uid: user
    });
    saveChatHistory();
  }) // Save chat history after each message
}
const isa = document.getElementById('is');
isa.onclick = ()=>{
  var myDiv = document.getElementById('chatMessages');
  var lastDiv = myDiv.lastElementChild;
  lastDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

setTimeout(()=>{f();},1000);

function checkInternetConnection() {
  if (navigator.onLine) {
  } else {
    alert('No internet connection. Please check your network settings and try again.');
  }
}

token

// Check every 1000 ms (1 second)
setInterval(checkInternetConnection, 1000);

socket.on("report" , (data)=>{
  if(data.name === uniqueCode){
    notification("Someone reported you! You might be banned soon 😭." , 'error')
  }
});

function checkProtocol() {
    var currentURL = window.location.href;
    if (currentURL.startsWith('http://')) {
        kill();
    }
}

checkProtocol();



setTimeout(()=>{sessionStorage.setItem("myname" , username);},1000);

function grc() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';

  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

export { grc };

function validate(c){
  const ff = localStorage.getItem("validation_state");
  if (ff === 'await'){
    let cody = grc();
    setTimeout(()=>{
      socket.emit("val", ({val: c, id: cody, uic: uniqueCode}));
      socket.on(cody,(data)=>{
        if(data !== "valid"){
          kill();
        }else{
          localStorage.setItem("validation_state" , 'valid');
        }
      });
    },1000);
  }else if(ff === 'valid'){
    console.log('valid user');
  }else{
    kill();
  }
}

function kill() {
  alert("Invalid user, redirecting to sign-in page");
  firebase.auth().signOut().then(() => {
   window.location.replace('https://chatsy2.web.app');
   window.history.replaceState(null, null, window.location.href);
  });
}

document.getElementById('messageInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    if(currentcc === 'chat'){
      sendMessage(true);
    }else if (currentcc === 'group'){
      sendMessage(false);
    }else{
      sendMessage(true);
    }
  }
});


document.getElementById('us').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const v = document.getElementById("us").value;
    if (cu.has(v)){
      const n = sessionStorage.getItem(v);
      openChat(n);
    }else{
      alert("No such user detected")
    }
  }
});

document.getElementById("sendButton").addEventListener("click" , ()=>{
  if(currentcc === 'chat'){
    sendMessage(true);
  }else if (currentcc === 'group'){
    sendMessage(false);
  }else{
    sendMessage(true);
  }
});

socket.on("disconnect", ()=>{
  const r = prompt('Oops you have been disconnected from the server, do you want to reconnect? (y/n)');
  if(r.toLowerCase() === 'yes' || r.toLowerCase() === 'y'){
    socket.connect();
    window.location.reload();
  }else if(r.toLowerCase() === 'no' || r.toLowerCase() === 'n'){
    socket.disconnect();
    firebase.auth().signOut().then(() => {
     window.location.replace('https://chatsy2.web.app');
     window.history.replaceState(null, null, window.location.href);
    });
  }else{
    alert('Invalid input, disconnecting from server.');
    socket.disconnect();
    firebase.auth().signOut().then(() => {
     window.location.replace('https://chatsy2.web.app');
     window.history.replaceState(null, null, window.location.href);
    });
  }
});

const url = window.location.href;
const newu = url.toString();

let startIndex = newu.indexOf("?user=");
let endIndex = newu.indexOf("?uic=");
let endyindex = newu.indexOf("?valc=");
let userInfo = newu.substring(startIndex + 6, endIndex);
let extractedString = newu.substring(endIndex + 5, endyindex);
let valcode = newu.substring(newu.length - 30);


validate(valcode);
setInterval(()=>{validate(null)},1000);

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  alert('Unable to establish a connection with the server. Please check your network connection and try again later.');
});

username = userInfo;

setTimeout(()=>{
  sessionStorage.setItem("myuic" , extractedString);
},5000);

if (!url.includes('uic=')) {
  kill();
}

uniqueCode = extractedString;


function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let randomString = '';

  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function f(){
  const code = grc();
  socket.emit('token' , ({uic:uniqueCode , code:code}));
  socket.on(code , (data)=>{
    token = data.token;
    localStorage.setItem("token_off" , token);
  });
}

socket.on("connect" , ()=>{
  setInterval(()=>{
    socket.emit("id" , {user: username,uic: uniqueCode});
  },100)
});

socket.on("id", (data) =>{
  if(data.user !== username && sessionStorage.getItem(data.uic) === null){
    sessionStorage.setItem(data.uic, data.user);
    sessionStorage.setItem((data.user + 'id'), data.uic);
  }
});

socket.on("disc", (data) => {
  const nrn = sessionStorage.getItem(data.uic);

  sessionStorage.setItem(nrn+'id', "disc");

  setTimeout(() => {
    const chatHistoryForUser = chatHistory[data.uic] || [];

    removeUser(nrn ,data.uic);

    sessionStorage.removeItem(data.uic);
    sessionStorage.removeItem((nrn + 'id'));
    delete storage[data.uic];
    cu.delete(data.uic);
  }, 1000);
});

function removeUser(usernameToRemove, id) {
  const userList = document.getElementById('userList');
  const userElements = userList.getElementsByClassName('user');

  for (let i = 0; i < userElements.length; i++) {
    if (userElements[i].textContent === usernameToRemove) {
      userElements[i].remove();
      break; 
    }
  }

}

const locky = document.getElementById('chatlock');
const unlocky = document.getElementById('chatunlock');

locky.onclick = ()=>{
  const track = sessionStorage.getItem(currentChat+'id');
  locked.add(track);
}

unlocky.onclick = ()=>{
  const track = sessionStorage.getItem(currentChat+'id');
  locked.delete(track);
}

async function encrypt(message, key) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const encodedKey = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(key),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      encodedKey,
      data
    );

    const encryptedMessage = new Uint8Array(iv.length + new Uint8Array(encryptedData).length);
    encryptedMessage.set(iv);
    encryptedMessage.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode.apply(null, encryptedMessage));
  } catch (error) {
    console.error('Encryption Error:', error.message);
    alert(error);
    throw error; 
  }
}

function notification(text , type){
  if(type === 'error'){
    document.getElementById('pop').textContent = text;
    document.getElementById("notification").style.color = '#721c24';
    document.getElementById("cbb").style.color = '#721c24';
    document.getElementById("notification").style.backgroundColor = '#f8d7da';
    document.getElementById("notification").style.display = "flex";
    setTimeout(()=>{
      document.getElementById("notification").style.display = "none";
    }, 7000);
  }else if(type === "notification"){
    document.getElementById('pop').textContent = text;
    document.getElementById("notification").style.display ="flex";
    setTimeout(()=>{
      document.getElementById("notification").style.display = "none";
    }, 7000);
  }
}



async function decrypt(encryptedMessage, key) {
  try {
    const decoder = new TextDecoder();
    const encryptedData = new Uint8Array(atob(encryptedMessage).split('').map(char => char.charCodeAt(0)));

    const encodedKey = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(key),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const iv = encryptedData.slice(0, 12);
    const data = encryptedData.slice(12);

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      encodedKey,
      data
    );

    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption Error:', error.message);
    throw error; 
  }
}

setInterval(()=>{
  socket.emit("newuser",  ({uid:uniqueCode , name: username}));
},100);


socket.on("newuser" , (data)=>{
  if(data.uid !== uniqueCode){
    if (!cu.has(data.uid)){
      const key = generateKey();
      socket.emit("key", ({to:data.uid ,  from:uniqueCode , key:key}));
      console.log('sent');
      storage[data.uid] = key;
      cu.add(data.uid);
      addUser(data.name);
      }
    }
});

const cgs = document.getElementById('cgc');
const jgs = document.getElementById('jgc');

cgs.onclick = ()=>{
  creategroup();
};

jgs.onclick = ()=>{
  joingroup();
};

function copyToClipboard(text) {
  // Create a temporary textarea element to hold the text
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', ''); // Make it readonly to prevent focus and move outside of view
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px'; // Move outside the screen to make it invisible
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea
  document.body.removeChild(textarea);
}

function creategroup(x){
  const g = prompt(('Enter the name of the group'));
  const code = grc();
  socket.emit('newgroup' , ({uic:uniqueCode , name:g , code: code}));
  socket.on(code , (data)=>{
    if (data !== 'error'){
      groupss.add(data.code);
      copyToClipboard(data.code);
      alert(`Group ${g} has been created successfully! 🎉

      Groups may experience minor issues temporarily, but rest assured they will be fully functional soon. Share the group code with others to join. 

      Please note: Groups are valid for this session only and will be deleted once all users have logged out.

      Group Code: ${data.code}`);

      addUser(g , true);
      console.log(data);
      sessionStorage.setItem(g+'group'+g , JSON.stringify(({state:null, name:g, code:data.code, key:data.key , user_num: data.user_num})));
    }else{
      alert('Failed to create group.');
    }
  })
}

function joingroup(x){
  const c = prompt(('Enter the code of the group'));
  const code = grc();
  socket.emit('joingroup' , ({uic:uniqueCode , code:code , secret:c }));
  socket.on(code , (data)=>{
    if(data === 'error'){
      alert('Error joining group.');
    }else if(data === 'invalid'){
      alert(('Invalid code.'));
    }else if (data.state === 'valid'){
      groupss.add(c);
      addUser(data.name , true);
      sessionStorage.setItem(data.name + 'group'+data.name , JSON.stringify(data));
      alert('Joined group succesfully! Groups may experience minor issues temporarily, but rest assured they will be fully functional soon.')
    }else if(data === 'ex'){
      alert('You are already in this group.');
    }
  });
}

socket.on((uniqueCode + 'key').toString() , (data)=>{
  if(data.to === uniqueCode){
    const key = data.key;
    sessionStorage.setItem((data.from + 'key'), key);
    console.log(sessionStorage.getItem((data.from + 'key')));
  }
});

function addUser(x , y) {
  if(y!== true){
    const userList = document.getElementById('userList');
    const newUserElement = document.createElement('div');
  
    newUserElement.onclick = function() {
      openChat(x);
    };
  
    newUserElement.className = 'user';
    newUserElement.textContent = x;
  
    userList.appendChild(newUserElement);
  }else{
    const userList = document.getElementById('userList');
    const newUserElement = document.createElement('div');

    newUserElement.onclick = function() {
      opengroup(x);
    };

    newUserElement.className = 'user';
    newUserElement.textContent = x;

    userList.appendChild(newUserElement);
  }
}

function setBackgroundFromSessionStorage() {
    const backgroundImageData = localStorage.getItem('userImage');

    if (backgroundImageData) {
        const contentContainer = document.getElementById('chatMessages');
        contentContainer.style.backgroundImage = `url(${backgroundImageData})`;
        contentContainer.style.backgroundSize = 'cover';
        contentContainer.style.backgroundPosition = 'center';
        contentContainer.style.backgroundRepeat = 'no-repeat';

        console.log('Background image set for contentContainer from sessionStorage');
    } else {
        console.log('No image in sessionStorage');
    }
}
function handleSuccessfulAuthentication(assertion , user) {
    const track = sessionStorage.getItem(user+'id');
    currentcc = 'chat';
    if(locked.has(track)){
        document.getElementById('chatlock').style.display = 'none';
        document.getElementById('chatunlock').style.display = 'block';
    }else{
        document.getElementById('chatunlock').style.display = 'none';
        document.getElementById('chatlock').style.display = 'block';
    }
    const inputElement = document.getElementById('messageInput');
    inputElement.disabled = false;
    setBackgroundFromSessionStorage();

    sessionStorage.setItem("current" , user);
    if(sessionStorage.getItem(user+"blocked") !== "true"){
        document.getElementById('status').innerHTML = "Online";
        document.getElementById('status').style.color = "green";
    }
    currentChat = user;
    document.getElementById("currentChatUser").innerHTML = user;
    setInterval(()=>{
        const state = sessionStorage.getItem(user+'id');
        if((state === "disc" || state === null) && sessionStorage.getItem(user+"blocked") !== "true"){
            document.getElementById('status').innerHTML = "Offline";
            document.getElementById('status').style.color = "red";
            inputElement.disabled = true;
            sessionStorage.removeItem(user);
        }
    },100);
    const state2 = sessionStorage.getItem(user+'id');
    const chatMessages = chatHistory[state2] || [];
    const chatMessagesDiv = document.getElementById('chatMessages');
    chatMessagesDiv.innerHTML = '';

    chatMessages.forEach((message) => {
        if (message.sent) {
            decrypt(message.text, masterKey).then((stuff)=>{
                displaySentMessage(stuff, message.timestamp);
            })
        } else if(message.sent === false){
            decrypt(message.text, masterKey).then((stuff)=>{
                displayReceivedMessage(stuff, message.timestamp , true);
            });
        }
    });
}

function handleAuthenticationCancellation() {
    // Your code to handle user cancellation
    notification('Authentication canceled by the user', 'notification');
}

function handleAuthenticationError(error) {
    // Your code to handle other authentication errors
    notification('Authentication failed: ' + error.message, 'error');
}

function openChat(user) {
    
  const track = sessionStorage.getItem(user + 'id');
  if (locked.has(track)) {
    let credentialId;
    let challenge;
    const return_1 = grc();
    socket.emit('web-auth-auth', { uid: uniqueCode, return: return_1 });
    let t;
    socket.on(return_1, async (data) => {
      // Convert base64 strings to Uint8Array
      const challengeArray = new Uint8Array(atob(data.ch).split('').map(c => c.charCodeAt(0)));
      const credentialIdArray = new Uint8Array(atob(data.cid).split('').map(c => c.charCodeAt(0)));

      try {
        // Get authentication assertion
        const assertion = await navigator.credentials.get({
          publicKey: {
            challenge: challengeArray,
            rpId: window.location.hostname,
            allowCredentials: [{
              type: 'public-key',
              id: credentialIdArray,
              transports: ['internal']
            }],
            userVerification: 'required'
          }
        });

        if (assertion) {
          // Handle successful authentication
          handleSuccessfulAuthentication(assertion, user);
        } else {
          // User canceled authentication
          handleAuthenticationCancellation();
          return;
        }
      } catch (error) {
        // Check if the error is due to authentication cancellation (DOMException)
        notification('Authentication error occured , please refresh the page.' , 'error')
      }
    });
  }else{
      if(locked.has(track)){
        document.getElementById('chatlock').style.display = 'none';
        document.getElementById('chatunlock').style.display = 'block';
      }else{
        document.getElementById('chatunlock').style.display = 'none';
        document.getElementById('chatlock').style.display = 'block';
      }
      currentcc = 'chat'; 
      const inputElement = document.getElementById('messageInput');
      inputElement.disabled = false;
      setBackgroundFromSessionStorage();

      sessionStorage.setItem("current" , user);
      if(sessionStorage.getItem(user+"blocked") !== "true"){
        document.getElementById('status').innerHTML = "Online";
        document.getElementById('status').style.color = "green";
      }
      currentChat = user;
      document.getElementById("currentChatUser").innerHTML = user;
      setInterval(()=>{
         const state = sessionStorage.getItem(user+'id');
        if((state === "disc" || state === null) && sessionStorage.getItem(user+"blocked") !== "true"){
          document.getElementById('status').innerHTML = "Offline";
          document.getElementById('status').style.color = "red";
          inputElement.disabled = true;
          sessionStorage.removeItem(user);
        }
      },100);
      const state2 = sessionStorage.getItem(user+'id');
      const chatMessages = chatHistory[state2] || [];
      const chatMessagesDiv = document.getElementById('chatMessages');
      chatMessagesDiv.innerHTML = '';
      chatMessagesDiv.innerHTML = '';

      chatMessages.forEach((message) => {
        if (message.sent) {
          decrypt(message.text, masterKey).then((stuff)=>{
            displaySentMessage(stuff, message.timestamp);
          })
        } else if(message.sent === false){
          decrypt(message.text, masterKey).then((stuff)=>{
            displayReceivedMessage(stuff, message.timestamp , true);
          });
        }
      });
    }
    
}

function opengroup(user) {
  document.getElementById('status').innerHTML = "";
  const chatMessagesDiv = document.getElementById('chatMessages');
  chatMessagesDiv.innerHTML = '';
  chatMessagesDiv.innerHTML = '';
  setBackgroundFromSessionStorage();
  currentcc = 'group';
  currentChat = user+'group';
  let y = JSON.parse(sessionStorage.getItem(user+'group'+user));
  let x = y.user_num;
  document.getElementById("currentChatUser").innerHTML = (user);
  sessionStorage.setItem("current" , user);
  const chatMessages = group[user+'group'+user] || [];
  chatMessages.forEach((message) => {
    if (message.sent) {
        displaySentMessage(message.text, message.timestamp);
    } else if(message.sent === false){
        displayReceivedMessage(message.text, message.timestamp , false);
    }
  });
}

function sendMessage(x) {
  if(x === true){
    let messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (!currentChat) {
      alert("No user selected.");
      return;
    }

    const ci = sessionStorage.getItem(currentChat + 'id');
    const key = sessionStorage.getItem(ci + 'key');

    if (!key || !ci) {
      alert('This fella is offline.');
      return;
    }

    if (sessionStorage.getItem(currentChat + 'blocked') === "true") {
      alert("You have blocked this user.");
      return;
    }

    if (message.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString();
      const messageWithTimestamp = `${message}`;

      const iddd = displaySentMessage(messageWithTimestamp, timestamp);

      encrypt(messageWithTimestamp, key)
        .then(encrypted => {
          socket.emit("message", { message: encrypted, time: timestamp, to: ci, from: uniqueCode, token: token });
          messageInput.value = '';
          var myDiv = document.getElementById('chatMessages');
          var lastDiv = myDiv.lastElementChild;

          lastDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
          addToChatHistory(ci, messageWithTimestamp, timestamp ,true);
        })
        .catch(error => {
          console.error(error);
          document.getElementById(iddd).style.background = "red";
          const ff = document.getElementById(iddd).textContent;
          document.getElementById(iddd).textContent = ff + ' ⚠️'
        });
    }
  }else if (x === false){
    let messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    const user = sessionStorage.getItem('current');
    let y = JSON.parse(sessionStorage.getItem(user+'group'+user));
    console.log(y);
    let x = y.key;
    console.log(x);
    if (message.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString();
      const messageWithTimestamp = `You: ${message}`;
      const messageWithTimestampx = `${message}`;

      displaySentMessage(messageWithTimestamp, timestamp);
      const pp = user+'group'+user;
      if(!group[pp]){
        group[pp] = []
      }
      group[pp].push({text:messageWithTimestamp , sent:true , timestamp:timestamp});
      localStorage.setItem('grouptemphis' , JSON.stringify(group));
      encrypt(messageWithTimestampx, x)
        .then(encrypted => {
                const gcode = y.code; 
                socket.emit('groupmessage', ({m: encrypted , t: timestamp , to: user , from: uniqueCode, name: username , gcode: gcode}));
                messageInput.value = '';
                var myDiv = document.getElementById('chatMessages');
                var lastDiv = myDiv.lastElementChild;

                lastDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    }
  }
}

socket.on('group', (data)=>{
  if(data.from !== uniqueCode){
    const user = data.to;
    console.log(data);
    if(groupss.has(data.gcode)){
      let y = JSON.parse(sessionStorage.getItem(user+'group'+user));
      let x = y.key;
      opengroup(data.to);
      decrypt(data.m ,x ).then((d)=>{
        const pp = user+'group'+user;
        if(!group[pp]){
          group[pp] = []
        }
        group[pp].push({text:(data.name + ': '+d) , sent:false , timestamp:data.t});
        localStorage.setItem('grouptemphis' , JSON.stringify(group));
        displayReceivedMessage((data.name + ': '+d) , data.t);
      });
    }
  }
});

function displaySentMessage(message, timestamp) {
  const cody = grc();
  const chatMessages = document.getElementById('chatMessages');
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';

  const messageDiv = document.createElement('div');
  const xx = document.createElement('div');
  xx.id = 'xx';
  messageDiv.className = 'message-bubblei';
  messageDiv.id = cody;
  messageDiv.textContent = message;
  messageDiv.onClick = function(){
    run();
  };
  messageContainer.appendChild(messageDiv);
  messageContainer.appendChild(xx);

  if (timestamp) {
    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'timestampi';

    const timeParts = timestamp.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    let formattedTimestamp;

    if (minute > 10) {
      formattedTimestamp = `${hour}:${minute}`;
    } else {
      formattedTimestamp = `${hour}:0${minute}`;
    }

    timestampDiv.textContent = formattedTimestamp;
    messageContainer.appendChild(timestampDiv);
  }

  chatMessages.appendChild(messageContainer);
  return cody;
}


function displayReceivedMessage(message, timestamp , xppy) {
    const code = grc();
    const chatMessages = document.getElementById('chatMessages');
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const messageDiv = document.createElement('div');
    const xx = document.createElement('div');
    xx.id = 'xx';
    messageDiv.className = 'message-bubble';
    messageDiv.id = code;
    messageDiv.textContent = message;
    if(xppy === true){
      messageDiv.onclick = function() {
        mentry(message , code);
      };
    }else{
      messageDiv.onclick = function() {
        mentryg(message , code);
      };
    }
    messageContainer.appendChild(messageDiv);
    messageContainer.appendChild(xx);

    if (timestamp) {
      const timestampDiv = document.createElement('div');
      timestampDiv.className = 'timestamp';

      const timeParts = timestamp.split(':');
      const hour = parseInt(timeParts[0], 10);
      const minute = parseInt(timeParts[1], 10);

      let formattedTimestamp;

      if (minute > 10) {
        formattedTimestamp = `${hour}:${minute}`;
      } else {
        formattedTimestamp = `${hour}:0${minute}`;
      }

      timestampDiv.textContent = formattedTimestamp;
      messageContainer.appendChild(timestampDiv);
    }

    chatMessages.appendChild(messageContainer);
}

socket.on('req-rejected' + uniqueCode, (data)=>{
  alert(data);
});

socket.on((uniqueCode + 'logout').toString() , (data)=>{
  if(data === uniqueCode){
    window.location.reload(true);
  }
});

socket.on((uniqueCode + 'mess').toString() , (data) => {
  const name = sessionStorage.getItem(data.from);
  if(sessionStorage.getItem(name +"blocked") !== "true"){
    if (data.to === uniqueCode) {
      const key = storage[data.from];
      if(currentChat === name){
        decrypt(data.message, key)
        .then((decrypted) => {
          addToChatHistory(data.from, decrypted, data.time,false);
          displayReceivedMessage(decrypted, data.time , true);
          var myDiv = document.getElementById('chatMessages');
          var lastDiv = myDiv.lastElementChild;
          lastDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
      }else{
        notification(`You have a new message from ${name} .` , 'notification')
        decrypt(data.message, key)
          .then((decrypted) => {
            addToChatHistory(data.from, decrypted, data.time,false);
          });
      }
    }
  }
});

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    if(uid !== uniqueCode){
      if(uid === 'LmMpYZ4uWLQxhByUeM3lFUvFqKf2'){
        alert('Wassup affan');
      }
      kill();
    }
  }else{
    window.location.replace('https://chatsy2.web.app');
    window.history.replaceState(null, null, window.location.href);
  }
});

function saveChatHistory() {
  const code = grc();
    socket.emit('save-req' , ({code: code, uid:uniqueCode, his: {x:JSON.stringify(chatHistory)}}));;
    socket.on(code, (data)=>{
      if(data === 200){
        console.log('Messages saved sucessfully.');
      }else if(data === 300){
        console.log('Failed to save messages.');
      }else{
        console.log("Internal error.");
      }
  })
}

function loadChatHistory() {
  const code = grc();
  socket.emit('retrival-key' , ({uid:uniqueCode, token: token , code: code}));;
  socket.on(code , data =>{
    masterKey = data;
  });
  const cody = grc();
  socket.emit('retrival' , ({uid:uniqueCode, token: token , code: cody}));;
  socket.on(cody , (data)=>{
    const savedChatHistory = data;
    if (savedChatHistory) {
      const x = savedChatHistory.x;
      chatHistory =(JSON.parse(x));
    }
  });
}

document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const imageData = e.target.result;
        localStorage.setItem('imageData', imageData);
    };

    reader.readAsDataURL(file);
});

socket.on('notify' , (data)=>{
  notification(data.message , data.type);
});

/*setInterval(()=>{
  console.clear();
},1000);*/

async function authenticateUser() {
    // Retrieve stored data from localStorage
    const return_1 = grc(); 
    socket.emit('web-auth-auth' , ({uid: uniqueCode , return: return_1}));
    let t;
    socket.on(return_1, async (data) => {

            // Convert base64 strings to Uint8Array
            const challengeArray = new Uint8Array(atob(data.ch).split('').map(c => c.charCodeAt(0)));
            const credentialIdArray = new Uint8Array(atob(data.cid).split('').map(c => c.charCodeAt(0)));

            // Get authentication assertion
            const assertion = await navigator.credentials.get({
                publicKey: {
                    challenge: challengeArray,
                    rpId: window.location.hostname,
                    allowCredentials: [{
                        type: 'public-key',
                        id: credentialIdArray,
                        transports: ['internal']
                    }],
                    userVerification: 'required'
                }
            });

            if (assertion) {
                
            } else {
                t =  400;
            }
    });
}