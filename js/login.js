var intento = 3; //Numero de intentos disponibles

function validar() {

    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    if (password.length >= 8) {
            sessionStorage.setItem("username", username)     
            alert("Accediste exitosamente");
            window.location = "mainmenu.html"; // Redirecciona a la otra pagina
            intento = 3
            return false; 
    } else {
        alert("La contraseña debe tener mas de 8 caracteres")
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});