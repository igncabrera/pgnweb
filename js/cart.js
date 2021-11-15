//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var items = {};
let count = 0;
let shipping = 0;




document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (resultObj) {

    items = resultObj.data // guarda en la variable global todo lo que trajo el getJSONData 

    showItems(items)
    shippingTax();
    dateForm();
    changeNumbersLessThan10();
  });
});


function showItems() {

  let htmlContentToAppend = "";

  for (let i = 0; i < items.articles.length; i++) {

    let item = items.articles[i]
    let price = item.unitCost
    let subTotal = (price) * (item.count)
    let newCurrency = item.currency
    if (item.currency === "USD") {
      subTotal = subTotal * 40
      newCurrency = "UYU"
    }
    count += subTotal


    htmlContentToAppend += `
        <div class="product" id="Product`+ i + `">
          <div class="product-image">
            <img src="`+ item.src + `">
          </div>
          <div class="product-details">
            <h1 class="text-center">`+ item.name + `</h1>
          </div>
          <div class="product-price">`+ price + " " + item.currency + `</div>
          <div class="product-quantity">
            <input type="number" value="`+ item.count + `" min="1" id="` + i + `" oninput="update(` + i + `)" style="width: 80px;">
          </div>
          <div class="product-removal">
            <button class="remove-product" onclick="remove(`+i+`)">
              Remover
            </button>
          </div>
          <div class="product-line-price" id="Subtotal`+ i + `">` + subTotal + " " + newCurrency + `</div>
        </div>
        `

  }
  document.getElementById('items').innerHTML += htmlContentToAppend
  document.getElementById('cart-total').innerHTML = count + " " + "UYU"
}

function update(id) {
  let newCurrency = items.articles[id].currency
  let subTotal = items.articles[id].unitCost
  if (items.articles[id].currency === "USD") {
    subTotal = subTotal * 40
    newCurrency = "UYU"
  }
  var quantity = document.getElementById(id).value;
  if (quantity < 1) {
    quantity = 1
    document.getElementById(id).value = 1
  }
  document.getElementById("Subtotal" + id).innerHTML = quantity * subTotal + " " + newCurrency;

  

  /* Suma de todos los totales */

  let subtotal = 0;
  for (let i = 0; i < items.articles.length; i++) {
    subtotal += parseFloat(document.getElementById("Subtotal" + i).innerHTML, 10)
  }
  document.getElementById('cart-total').innerHTML = subtotal + " " + "UYU"

  /* Impuesto de envio */

  shippingTax();
}

function shippingTax() {
  let shippingType = document.getElementsByName("publicationType")

  if (shippingType[0].checked) {
    shipping = 0.15 * parseFloat(document.getElementById('cart-total').innerHTML, 10)
  }
  if (shippingType[1].checked) {
    shipping = 0.07 * parseFloat(document.getElementById('cart-total').innerHTML, 10)
  }
  if (shippingType[2].checked) {
    shipping = 0.05 * parseFloat(document.getElementById('cart-total').innerHTML, 10)
  }
  document.getElementById('cart-shipping').innerHTML = parseInt(shipping) + " " + "UYU"
  document.getElementById('cart-final').innerHTML = shipping + parseFloat(document.getElementById('cart-total').innerHTML, 10) + " " + "UYU"
}
/*Desafiante, no me dio tiempo para hablar de el en el video, pero basicamente consigo la suma de las cantidades de productos del elemento que se va a borrar
mediante la id proporcionada en el onclick qe fue agregado en el for que dio la estructura traida del json, al cual se lo resto al total con parseInt para que
sean legibles como numeros y no string y no devuelva el "UYU", y por ultimo, usando la funcion "remove(), nativa de javascript para remover un nodo*/ 
function remove(id) {
  let priceToUpdate = document.getElementById("Subtotal" + id).parentElement.children[5].innerHTML
  document.getElementById('cart-total').innerHTML = parseInt(document.getElementById('cart-total').innerHTML, 10) - parseInt(priceToUpdate, 10) + " " + "UYU"
  shippingTax();
  document.getElementById("Subtotal" + id).parentElement.remove()
}


function dateForm(){

  let htmlContentToAppend1 = "";
  for(let i = 1; i <= 31; i++){
    htmlContentToAppend1 += `
    <option>`+i+`</option>
    `
  }
  let htmlContentToAppend2 = "";
  for(let i=1; i<=12; i++){
    htmlContentToAppend2 += `
    <option>`+i+`</option>
    `
  }
  let htmlContentToAppend3 = "";
  for(let i=2021; i>1900; i--){
    htmlContentToAppend3 += `
    <option>`+i+`</option>
    `
  }

  document.getElementById('000010').innerHTML += `<option disabled selected value="" > -- </option>` + htmlContentToAppend1
  document.getElementById('000011').innerHTML += `<option disabled selected value="" > -- </option>` + htmlContentToAppend1
  document.getElementById('000020').innerHTML += `<option disabled selected value="" > -- </option>` + htmlContentToAppend2
  document.getElementById('000021').innerHTML += `<option disabled selected value="" > -- </option>` + htmlContentToAppend2
  document.getElementById('000030').innerHTML += `<option disabled selected value="" > ---- </option>` + htmlContentToAppend3
  document.getElementById('000031').innerHTML += `<option disabled selected value="" > ---- </option>` + htmlContentToAppend3
}

function changeNumbersLessThan10(){
  let numbers = document.getElementsByTagName('option')

  for(let i=0; i < numbers.length; i++){
    if(numbers[i].innerHTML < 10){
      numbers[i].innerHTML = `0`+ numbers[i].innerHTML
    }
  }
}