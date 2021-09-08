var currentCommentsArray = [];

function showComments(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let switchOnStar = `<span class="fa fa-star checked"></span>`
        let switchOffStar = `<span class="fa fa-star"></span>` //accede a cada elemento mediante un for
        let comment = currentCommentsArray[i];

                /*se fija si la cantidad de productos supera el minimo
                y no excede el maximo, y es distinto de indefinido, para ser mostrada en la lista de productos (asumo, porque si supera el conteo maximo se va a otra pagina o para filtrar) */
            
                htmlContentToAppend += `
                    <div class="row card">
                    <br>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ comment.user + ' ' + switchOnStar.repeat(comment.score) + switchOffStar.repeat(5 - comment.score) +`</h4>
                                <small class="text-muted">Fecha: ` + comment.dateTime + ` </small>
                            </div>
                            <br>
                            <p class="mb-1">` + comment.description + `</p>
                            <br>
                        </div>
                    </div>
                `
            
                document.getElementById("comments").innerHTML = htmlContentToAppend; //suma el contenido que se obtuvo mediante el for, al innerHTML mediante DOM 
          
        

        
    }
}





function sortComments(commentsArray){

    if(commentsArray != undefined){
        currentCommentsArray = commentsArray;
    }


    //Muestro las categorías ordenadas
    showComments();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortComments(resultObj.data);
        }
    })
});