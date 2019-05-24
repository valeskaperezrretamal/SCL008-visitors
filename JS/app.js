// Initialize Firebase
let config = {
    apiKey: "AIzaSyCAA-J2pejLUYEnMcJLzczIFn1kEV8ZK6Q",
    authDomain: "registro-de-visitas-d290f.firebaseapp.com",
    databaseURL: "https://registro-de-visitas-d290f.firebaseio.com",
    projectId: "registro-de-visitas-d290f",
    storageBucket: "registro-de-visitas-d290f.appspot.com",
    messagingSenderId: "885616363770",
    appId: "1:885616363770:web:bf36b5348b9bfc01"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

function registrar() { //funcion para registrar con variable email y contraseña en caso de ser admin

  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contraseña").value;

  //var dropDownSelecter = document.getElementById ("dropDownSelecter").value;
  //console.log (email);
  //console.log (contrasena);

  firebase.auth().createUserWithEmailAndPassword(email, contrasena) //se crea el usuario verificando  con correo electronico
      .then(function() {
          verificar()
      })

      .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // ...
          console.log(errorCode);
          console.log(errorMessage);
      });
}
//ingreso de Administrador verificado
function ingreso() {
  //se ingresa la contraseña, correo y se le da un valor, firebase cacha el error en caso de existir y regresa un console con el error
  let emailadministrador = document.getElementById("email").value;
  let contrasenaadministrador = document.getElementById("contraseña").value;

  firebase.auth().signInWithEmailAndPassword(emailadministrador, contrasenaadministrador)
      .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // ...
          console.log(errorCode);
          console.log(errorMessage);
      });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log("existe usuario activo")
          aparece(user);
          // User is signed in.
          let displayName = user.displayName;
          let email = user.email;
          console.log("***********");
          console.log(user.emailVerified)
          console.log("***********");

          let emailVerified = user.emailVerified;
          let photoURL = user.photoURL;
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          let providerData = user.providerData;
          // ...
      } else {
          // User is signed out.
          console.log("no existe usuario activo")
          // ...
      }
  });
}
observador();


//funcion cerrar de firebase le di funcionalidad y un console para comprobar lo que esta pasando
function cerrar() {
  firebase.auth().signOut()
      .then(function() {
          console.log("saliendo...")

      })
      .catch(function(error) {
          console.log(error)
      })
}

function verificar() {
  let user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("enviando correo...")
  }).catch(function(error) {
      // An error happened.
      console.log(error);
  });
}


//menu
function mymenu() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}

//camara
let player = document.getElementById('player');
let snapshotCanvas = document.getElementById('snapshot');
let whiskyButton = document.getElementById('whisky');

let handleSuccess = function(stream) {
  //se concede el permiso y nos da acceso correcto a video con reproduciòn continua
  player.srcObject = stream;
};

whiskyButton.addEventListener('click', function() {
  let context = snapshot.getContext('2d');
  //Aparece el cuadro de video al lienzo.
  context.drawImage(player, 0, 0, snapshotCanvas.width,
      snapshotCanvas.height);

  const imageData = context.getImageData(0, 0, snapshotCanvas.width, snapshotCanvas.height);
  console.log(imageData);

  const converToURL = snapshotCanvas.toDataURL("image/png");
  player.style.display = 'none';
  whiskyButton.style.display = 'none';
 


});
navigator.mediaDevices.getUserMedia({
      video: true
  })
  .then(handleSuccess);


// function subir(){  // Get a reference to the storage service, which is used to create references in your storage bucket


// //subir un archivo a Cloud Storage (configurcion de Firebase)
// // Create a root reference

// // Uint8Array
// var bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
// ref.put(bytes).then(function(snapshot) {
//   console.log('Uploaded an array!');
// });
  
  // const ref = firebase.storage().ref();
  // const file = $('#whisky').get(0).files[0];   const name = (+new Date()) + '-' + file.name;
  // const metadata = {
  //   contentType: file.type
  // };
  // const task = ref.child(name).put(file, metadata);
  // task
  //   .then(snapshot => snapshot.ref.getDownloadURL())
  //   .then((url) => {
  //     console.log(url);
  //     document.querySelector('#someImageTagID').src = url;
  //   })
  //   .catch(console.error);