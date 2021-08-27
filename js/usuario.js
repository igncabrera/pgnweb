var texto = `<a class="py-2 d-none d-md-inline-block" href="my-profile.html">` + sessionStorage.getItem("username") + `</a>`
        if(sessionStorage.getItem("username") !== null){
          document.getElementById("logger").innerHTML+= texto
        }