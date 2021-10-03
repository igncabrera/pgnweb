var product = {};
var comment = {};
var relatedArray = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let images = array[i];

        htmlContentToAppend += `
                <img src="${images}" alt="">
        `

        document.querySelectorAll('.slide')[i].innerHTML = htmlContentToAppend;
    }
}



function relatedProducts(){
  
  let htmlContentToAppend = ""

  for(let i = 0; i < product.relatedProducts.length; i++){

    let index = product.relatedProducts[i]
    let related = relatedArray[index]
    
     htmlContentToAppend += `
     <div class="col-md-4">
                <a href="" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top"  src="`+ related.imgSrc + `">
                  <h3 class="m-3">`+ related.name+`</h3>
                  <div class="card-body" style="min-height: 135px;">
                    <p class="card-text">`+ related.description +`</p>
                  </div>
                </a>
              </div>
    
     `
    document.getElementById('relatedProducts').innerHTML = htmlContentToAppend
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
    getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
        relatedArray = resultObj.data
       
      relatedProducts();
      }
    });
  });


const slider = document.querySelector(".slider");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    const numberOfSlides = slides.length;
    var slideNumber = 0;

    //image slider next button
    nextBtn.addEventListener("click", () => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
      });

      slideNumber++;

      if(slideNumber > (numberOfSlides - 1)){
        slideNumber = 0;
      }

      slides[slideNumber].classList.add("active");
      slideIcons[slideNumber].classList.add("active");
    });

    //image slider previous button
    prevBtn.addEventListener("click", () => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
      });

      slideNumber--;

      if(slideNumber < 0){
        slideNumber = numberOfSlides - 1;
      }

      slides[slideNumber].classList.add("active");
      slideIcons[slideNumber].classList.add("active");
    });

    //image slider autoplay
    var playSlider;

    var repeater = () => {
      playSlider = setInterval(function(){
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
          slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
          slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
      }, 4000);
    }
    repeater();

    //stop the image slider autoplay on mouseover
    slider.addEventListener("mouseover", () => {
      clearInterval(playSlider);
    });

    //start the image slider autoplay again on mouseout
    slider.addEventListener("mouseout", () => {
      repeater();
    });


