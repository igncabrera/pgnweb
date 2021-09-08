const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_RELEVANCE = "Revel.";
const ORDER_ASC_BY_PRICE = "Precio Asc"
const ORDER_DES_BY_PRICE =  "Precio Desc"
var currentCommentsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const formulario = document.querySelector('#formulario')
const boton = document.querySelector('#boton')
const resultado = document.querySelector('#main')
const filtrar = ()=>{
    // console.log(formulario.value)
    resultado.innerHTML = ''
    const texto = formulario.value.toLowerCase();
    for(let producto of currentCommentsArray){
        let nombre = producto.name.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
        resultado.innerHTML +=  `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <small class="text-muted">` + producto.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">` + producto.description + `</p>
                    <br>
                    <br>
                    <p class="mb-1">`+ `Precio: `  + producto.cost + ` ` + producto.currency + `</p>
                </div>
            </div>
        </a>
        `
        }
    }
    if(resultado.innerHTML == ''){
        resultado.innerHTML += `Producto no encontrado...`
    }
}

formulario.addEventListener('keyup', filtrar)





function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    } else if(criteria == ORDER_DES_BY_PRICE){
        result = array.sort(function(a, b){
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        })
    } else if(criteria == ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b){
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        })
    }


    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){ //accede a cada elemento mediante un for
        let category = currentCommentsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){ /*se fija si la cantidad de productos supera el minimo
                y no excede el maximo, y es distinto de indefinido, para ser mostrada en la lista de productos (asumo, porque si supera el conteo maximo se va a otra pagina o para filtrar) */
            
            
                
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
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
                `
            
                document.getElementById("main").innerHTML = htmlContentToAppend; //suma el contenido que se obtuvo mediante el for, al innerHTML mediante DOM 
          
        }

        
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCommentsArray = categoriesArray;
    }

    currentCommentsArray = sortCategories(currentSortCriteria, currentCommentsArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByRelev").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_RELEVANCE);
    });

    document.getElementById("sortByPriceDes").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DES_BY_PRICE);
    });
    
    document.getElementById("sortByPriceAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});



 

