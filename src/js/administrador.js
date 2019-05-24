// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();


//función para guardar los datos del usuario visitante
function guardar() {

    let nombre = document.getElementById("nombre").value; //variable para guardar el nombre
    let apellido = document.getElementById("apellido").value; // variable para guardar el apellido
    let email = document.getElementById("email").value; // variable para guardar la dirección de correo electronico
    let fecha = document.getElementById("fecha").value; // variable para guardar la fecha de entrada
    let mySelect = document.getElementById("mySelect").value; // variable para guardar el motivo de visita
    let tiempo = document.getElementById("tiempo").value;
    //let foto = document.getElementById("foto()");


    // los datos se guardan en la colección de visitantes con la compilacion de datos ordenada
    db.collection("visitantes").add({
            nombre: nombre,
            apellido: apellido,
            entrada: fecha,
            email: email,
            mySelect: mySelect,
            tiempo: tiempo,
            //foto: foto

        })
        .then(function(docRef) { //si todo sale bien el then da una referencia y la valida correctamente
            console.log("Document written with ID: ", docRef.id);
            let nombre = document.getElementById("nombre").value = ''; //se agregó un string vacio para reiniciar los campos cuando los datos se guarden//
            let apellido = document.getElementById("apellido").value = '';
            let email = document.getElementById("email").value = '';
            let fecha = document.getElementById("fecha").value = '';
            let mySelect = document.getElementById("mySelect").value = '';
            let tiempo = document.getElementById("tiempo").value = '';
            let foto = document.getElementById("context.canva.toDataURL").value = '';

        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}




//usamos forEach para crear un ciclo
//=+ hacemos que se agregue un nuevo dato
//Leer datos en la tabla 
//pasa los datos de mi coleccion visitantes y los acomoda en cada espacio declarado en mis doc
let tabla = document.getElementById("tabla");
db.collection("visitantes").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data())
        tabla.innerHTML += `  
      
        <tr>
        <th scope="row"> ${doc.id} </th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().entrada}</td>
        <td> ${doc.data().email}</td>
        <td> ${doc.data().mySelect}</td>
        <td> ${doc.data().tiempo}</td>
        <td> ${doc.data().foto}</td>
        
        
       <td><button onclick="eliminar('${doc.id}')" title="Boton Eliminar"> ❌</button></td>
  
      </tr>
      
      `;
    });
});


// se cambio db.collection("visitantes").get (.onSnapshot(querySnapshot) => {
// por db.collection("visitantes").onSnapshot((querySnapshot) => {
//para que agregue cambios en tiempo real sin tener que actualizar la pag
//En boton eliminar cambiamos los parametros y le pasamos el id correspondiente a la fila

//borrar datos
function eliminar(id) {
    db.collection("visitantes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}



//funcion para seleccionar el motivo de la visita declarando la variable x como laboratoria
//declarando la variable i como plaza S, regresando la opcion en demo
function myFunction() {
    let x = document.getElementById("mySelect");
    let i = x.selectedIndex;
    document.getElementById("demo").innerHTML = x.options[i].text;
}

/*
function convertTimestamp(timestamp){
return dateFns.format(timestamp, 'MM/DD/YYYY')
}
var unixNow = (new Date()) ;
document.write(convertTimestamp(unixNow));
*/

//funcion para guardar datos automaticamente
function guardarDatos(user){
    let usuario = {
        uid:user.uid,
        nombre:user.displayName,
        email:user.email,
        foto:user.photoURL
    }
    firebase.database().ref("visitantes")
    .push(usuario)

}