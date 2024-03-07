const set = document.getElementById('set');
set.onclick = ()=>{
  const user = localStorage.getItem('myuic');
  const dn = localStorage.getItem('dn');
  const displayName = dn; // Prompt for display name
  if (displayName) {
    navigator.credentials.create({
      publicKey: {
        userVerification: 'required',
        rp: { id: window.location.href , name: 'chatsy' },
        user: { id: new TextEncoder().encode(user), name: displayName, displayName: displayName }, // Use the provided display name
        challenge: new TextEncoder().encode('example_challenge'),
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      },
    }).then((credential) => {
      localStorage.setItem('id', credential.id); // Encode the ID
      socket.emit('register', { user: { id: credential.id, name: 'example_user', displayName: displayName } });
      alert('Biometrics setup successfully!');
    });
  }
};