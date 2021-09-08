var product = {};
var comment = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let categoryNameHTML  = document.getElementById("productName");
            let categoryDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCriteria");
            let productCostHTML = document.getElementById('productCost')
        
            categoryNameHTML.innerHTML = product.name;
            categoryDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.cost

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

});


