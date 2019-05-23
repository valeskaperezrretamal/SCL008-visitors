// Initialize Firebase
let Config = {
    apiKey: "AIzaSyCAA-J2pejLUYEnMcJLzczIFn1kEV8ZK6Q",
    authDomain: "registro-de-visitas-d290f.firebaseapp.com",
    databaseURL: "https://registro-de-visitas-d290f.firebaseio.com",
    projectId: "registro-de-visitas-d290f",
    storageBucket: "registro-de-visitas-d290f.appspot.com",
    messagingSenderId: "885616363770",
    appId: "1:885616363770:web:bf36b5348b9bfc01"
  };
  firebase.initializeApp(Config);
  
  var database = firebase.database();
  
  function registrar() { //funcion para registrar con variable email y contraseña en caso de ser admin
  
    var email = document.getElementById("email").value;
    var contrasena = document.getElementById("contraseña").value;
  
    //var dropDownSelecter = document.getElementById ("dropDownSelecter").value;
    //console.log (email);
    //console.log (contrasena);
  
    firebase.auth().createUserWithEmailAndPassword(email, contrasena) //se crea el usuario verificando  con correo electronico
        .then(function() {
            verificar()
        })
  
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
        });
  }
  //ingreso de Administrador verificado
  function ingreso() {
    //se ingresa la contraseña, correo y se le da un valor, firebase cacha el error en caso de existir y regresa un console con el error
    var emailadministrador = document.getElementById("email").value;
    var contrasenaadministrador = document.getElementById("contraseña").value;
  
    firebase.auth().signInWithEmailAndPassword(emailadministrador, contrasenaadministrador)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
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
            var displayName = user.displayName;
            var email = user.email;
            console.log("***********");
            console.log(user.emailVerified)
            console.log("***********");
  
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            console.log("no existe usuario activo")
            // ...
        }
    });
  }
  observador();
  
  
  //funcion cerrar de firebase se le da funcionalidad y un console para comprobar lo que esta pasando
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
    var user = firebase.auth().currentUser;
  
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
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }
  
  //camara
  var player = document.getElementById('player');
  var snapshotCanvas = document.getElementById('snapshot');
  var whiskyButton = document.getElementById('selfie');
  
  var handleSuccess = function(stream) {
    //se concede el permiso y nos da acceso correcto a video con reproduciòn continua
    player.srcObject = stream;
  };
  
  whiskyButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
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
