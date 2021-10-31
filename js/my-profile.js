//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let localdata = JSON.parse(localStorage.getItem("Profile"))
    age();
    document.getElementById('user').innerHTML = sessionStorage.getItem("username")
    /* ver datos en consola */
    if (localdata !== null) {
        console.log(localdata.name);
        console.log(localdata.surname);
        console.log(localdata.email);
        console.log(localdata.age);
        console.log(localdata.phoneNumber);
        console.log(localdata.profileImg);
        
    }
    /* agregar datos si el local data no es null */
    if (localdata !== null) {
        document.getElementById('name').value = localdata.name
        document.getElementById('surname').value = localdata.surname
        document.getElementById('email').value = localdata.email
        document.getElementById('newEmail').innerHTML = localdata.email
        document.getElementById('ageCollapse').value = localdata.age
        document.getElementById('phoneNumber').value = localdata.phoneNumber
        document.getElementById('profileImg').src = localdata.profileImg
    }

    document.getElementById("name").addEventListener("blur", function (e) {
        if (document.getElementById("name").value == "") {
            document.getElementById("name").value = localdata.name
        }
    });

    document.getElementById('surname').addEventListener("blur", function (e) {
        if (document.getElementById("surname").value == "") {
            document.getElementById("surname").value = localdata.surname
        }
    });

    document.getElementById('email').addEventListener("blur", function (e) {
        if (document.getElementById("email").value == "") {
            document.getElementById("email").value = localdata.email
        }
    });

    document.getElementById('phoneNumber').addEventListener("blur", function (e) {
        if (document.getElementById("phoneNumber").value == "") {
            document.getElementById("phoneNumber").value = localdata.phoneNumber
        }
    });

    document.querySelector('.cancelbtn').addEventListener("click", function (e) {
        document.getElementById('id01').style.display = 'none'
    });

    document.querySelector('.deletebtn').addEventListener("click", function (e) {
        remove();
    });

    /* subir una imagen */

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector('.profile-pic').setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    document.querySelector(".file-upload").addEventListener('change', function () {
        readURL(this);
    });

    document.querySelector(".upload-button").addEventListener('click', function () {
        document.querySelector(".file-upload").click();
    });
});


function age() {
    let htmlContentToAppend = ""

    for (i = 18; i <= 100; i++) {
        htmlContentToAppend += `
        <option>`+ i + `</option>
        `
    }
    document.getElementById('ageCollapse').innerHTML += htmlContentToAppend
}

function save() {
    let data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        age: document.getElementById('ageCollapse').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        profileImg: document.getElementById('profileImg').src,
    }
    localStorage.setItem("Profile", JSON.stringify(data));
    location.reload();   
}

function remove() {
    localStorage.clear();
    location.reload();
}



var modal = document.getElementById('id01');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






