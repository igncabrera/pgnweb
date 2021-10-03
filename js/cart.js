//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var items = {};
let count = 0;


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {

        items = resultObj.data

        
        
        showItems(items)
    })
});


function showItems(){

    let htmlContentToAppend = "";

    for (let i = 0; i < items.articles.length; i++) {

        let item = items.articles[i]
        let price = item.unitCost
        let subTotal = (price) * (item.count)
        let newCurrency = item.currency 
        if(item.currency === "USD"){
            subTotal = subTotal*40
            newCurrency = "UYU"
        }
        count += subTotal

    
        htmlContentToAppend += `
        <div class="product">
          <div class="product-image">
            <img src="`+ item.src + `">
          </div>
          <div class="product-details">
            <h1 class="text-center">`+ item.name + `</h1>
          </div>
          <div class="product-price">`+ price + " " + item.currency +`</div>
          <div class="product-quantity">
            <input type="number" value="`+ item.count + `" min="0">
          </div>
          <div class="product-removal">
            <button class="remove-product">
              Remove
            </button>
          </div>
          <div class="product-line-price">`+ subTotal + " " + newCurrency +  `</div>
        </div>
        `
    }
    document.getElementById('items').innerHTML += htmlContentToAppend
    document.getElementById('cart-total').innerHTML = count + " " + "UYU"
}


