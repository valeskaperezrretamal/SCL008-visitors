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


  let db = firebase.firestore();




function iniciarenco() {
    let conombre = document.getElementById("conombre").value; //variable para guardar el nombre
    let coemail = document.getElementById("coemail").value; // variable para guardar la dirección de correo electronico
    let empresa = document.getElementById("empresa").value; // variable para guardar el motivo de visita


    db.collection("coworkers").add({
            email: coemail, //Direccion de correo electronico del usuario de cw
            name: conombre, //Nombre de usuario
            HoraEntrada: firebase.firestore.FieldValue.serverTimestamp(), //pinta la hora de entrada del usuario
            empresa: empresa //Registra el lugar al que se dirige
        })
        .then(function(docRef) {
            console.log("ID: ", docRef.id);
            let conombre = document.getElementById("conombre").value = ''; //variable para guardar el nombre del usuario
            let empresa = document.getElementById("empresa").value = ''; // variable para guardar el motivo de visita
            let coemail = document.getElementById("coemail").value = ''; //variable para guardar el email
            let iniciarenco = document.getElementById("inciarenco"); //boton de inicio

        })
        .catch(function(error) {
            console.error("Error en: ", error);

        });

}



function aparece(user) { //funcion para que me muestre los datos en el momento en que el usuario inicia
    let user = user;
    let contenido = document.getElementById("contenido");
    if (user.emailVerified) {
        contenido.innerHTML += `
      <p>Bienvenidx ${user.email}
      <div id="contenido">
       <p> tienes una notificación </p><br>
       <br>
       <input type="button" value="mostrar" id="mostrar">
      <button onclick = "cerrarco()" placeholder="Hasta pronto">Cerrar sesión</button>
      </div>
      `;
    }
}




function convertTimestamp(timestamp) { //funcion para convertir la hora y fecha
    return dateFns.format(timestamp, 'MM/DD/YYYY')

}
let unixNow = (new Date());
document.write(convertTimestamp(unixNow));



function functEmpresa() { //funcion para elegir a donde me dirijo
    let x = document.getElementById("empresa");
    let i = x.selectedIndex;
    document.getElementById("demo").innerHTML = x.options[i].text;
}

function ingresocowor() {
    //se ingresa la contraseña, correo y se le da un valor, firebase cacha el error en caso de existir y regresa un console con el error
    let emailco = document.getElementById("emailco").value;
    let contraco = document.getElementById("contraco").value;

    firebase.auth().signInWithEmailAndPassword(emailco, contraco)
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
        });
}


function cerrarco() {
    firebase.auth().signOut()
        .then(function() {
            console.log("saliendo...")

        })
        .catch(function(error) {
            console.log(error)
        })
}

function verificarco() { //envia el correo de verificacion a los usuarios
    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("enviando correo...")
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
}


function observadorco() { //observador para imprimir en consola el proceso
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
observadorco()
