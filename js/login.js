var intento = 3; //Numero de intentos disponibles

function validar() {
    var username = document.getElementById("username").value;

    var password = document.getElementById("password").value;

    if (password.length >= 8) {
        if (username == "0" && password == "12345678910") {
            alert("Accediste exitosamente");
            window.location = "mainmenu.html"; // Redirecciona a la otra pagina
            intento = 3
            return false;
        }
        else {
            intento--;// Resta intentos de la variable inicial si son incorrectos los datos
            alert("Te quedan " + intento + " intentos;");
            // Deshabilita la opcion de poner mas datos si se queda sin intentos
            if (intento == 0) {
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
            }
        }
    } else {
        alert("La contraseña debe tener mas de 8 caracteres")
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});