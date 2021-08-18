fetch(PRODUCTS_URL)

    .then(respuesta => respuesta.json())

    .then(array => {

        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let category = array[i]; // agarra todos los objetos y los mete en una lista para usarlos en el for

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                        <br>
                        <br>
                        <p class="mb-1">`+ `Precio: `  + category.cost + ` ` + category.currency + `</p>
                    </div>
                </div>
            </a>
            ` //esto es lo que se añade al innerHTML

            document.getElementById("main").innerHTML = htmlContentToAppend;
        }
    })

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});