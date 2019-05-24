//notificacion de visita al iniciar como usuario verificado
let noty = document.getElementById("time__noty") //variable para mandar a llamar la notificacion
let mostrar = document.getElementById("mostrar") //muestra la notificacion
let ocultar = document.getElementById("ocultar")//el usuario puede parar la notificacion

let aparecer = function() { //funcion para activar la notificacion con cosole para ver que ocurra
   console.log("mostrar")
   let noty = document.getElementById("time__noty")
   noty.style.animation = "fastup 10s linear forwards"
   //  animacion: duracion 10seg;
   noty.classList.add("time__noty")
}

let desaparecer = function() { //para la notificacion
   console.log("ocultar")
   //console para ver el funcionamiento
   noty.style.animation = ''
}

//mostrar notificacion

mostrar.addEventListener("click", aparecer)

ocultar.addEventListener("click", desaparecer)