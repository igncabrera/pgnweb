var texto = `<a class="link_name" href="my-profile.html">`+ sessionStorage.getItem("username") +`</a>`

if (sessionStorage.getItem("username") !== null) {
  document.getElementById("logger").innerHTML += texto
}

function logOut(){
  sessionStorage.setItem("username", "Usuario")
  alert("Saliste de forma satisfactoria")
  window.location = "index.html";
}
