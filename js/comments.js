var currentCommentsArray = [];
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
const ratingStars = [...document.getElementsByClassName("rating__star")]; //consigue todas las estrellas (las trae mediante la clase)
let reviewLimit = 0

function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive, stars[i].name = "on"
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
        
      } //mediante map busca y marca las estrellas dependiendo hasta donde halla clickeado el usuario
    };
  });
}
executeRating(ratingStars);


function showComments(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let switchOnStar = `<span class="fa fa-star checked"></span>`
        let switchOffStar = `<span class="fa fa-star"></span>` //declara variables para estrellas encendidas y apagadas
        let comment = currentCommentsArray[i];
           
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
         
                document.getElementById("comments").innerHTML = htmlContentToAppend; //suma los comentarios al contenedor de los mismos   
    }
}



function newComment(){
    if(reviewLimit === 0){
        let htmlContentToAppend = "";
        let comment = document.getElementById('newCommentText').value;
        let user = sessionStorage.getItem("username");
        let score = document.querySelectorAll('.fas').length; //trae como integral la cantidad de elementos con la clase "fas", para atribuirle un valor "score"
        let switchOnStar = `<span class="fa fa-star checked"></span>`
        let switchOffStar = `<span class="fa fa-star"></span>`
        htmlContentToAppend += `
        <div class="row card">
                        <br>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ user + ' ' + switchOnStar.repeat(score) + switchOffStar.repeat(5 - score) +`</h4>
                                    <small class="text-muted">Fecha: ` + dateTime + ` </small>
                                </div>
                                <br>
                                <p class="mb-1">` + comment + `</p>
                                <br>
                            </div>
                        </div>
        `
        document.getElementById('comments').innerHTML += htmlContentToAppend
        reviewLimit = 1
    } else{
        alert("Ya no puedes realizar mas reseñas")
    }
    
}

function closeCommentBox(){
    document.getElementsByClassName('.card-link text-dark').className = "card-link text-dark collapsed"
} //un collapse para contraer nuevamente la caja para realizar nuevos comentarios


showComments()

var texto = sessionStorage.getItem("username")
if (sessionStorage.getItem("username") !== null) {
  document.getElementById("commentUser").innerHTML += texto
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

