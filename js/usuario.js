var texto = `<a class="nav-link" href="my-profile.html">`+ sessionStorage.getItem("username") +`</a>`

if (sessionStorage.getItem("username") !== null) {
  document.getElementById("logger").innerHTML += texto
}

var texto = sessionStorage.getItem("username")
if (sessionStorage.getItem("username") !== null) {
  document.getElementById("commentUser").innerHTML += texto
}

