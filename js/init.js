const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close")
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
})
document.getElementById('').innerHTML = `
<div class="logo-details">
<i class='bx bx-store-alt'></i>
<span class="logo_name">e-commerce</span>
</div>
<ul class="nav-links">
<li>
  <a href="mainmenu.html">
    <i class='bx bx-grid-alt'></i>
    <span class="link_name">Inicio</span>
  </a>
</li>
<li>
  <div class="iocn-link">
    <a href="categories.html">
      <i class='bx bx-collection'></i>
      <span class="link_name">Categorias</span>
    </a>
    <i class='bx bxs-chevron-down arrow'></i>
  </div>
  <ul class="sub-menu">
    <li><a href="category-info.html">Autos</a></li>
  </ul>
</li>
<li>
  <div class="iocn-link">
    <a href="products.html">
      <i class='bx bx-book-alt'></i>
      <span class="link_name">Productos</span>
    </a>
    <i class='bx bxs-chevron-down arrow'></i>
  </div>
  <ul class="sub-menu">
    <li><a href="product-info.html">Chevrolet Onix Joy</a></li>
  </ul>
</li>
<li>
  <a href="sell.html">
    <i class='bx bx-plus-circle'></i>
    <span class="link_name">Vender</span>
  </a>
</li>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<li>
  <ul class="sub-menu2">
    <li><a href="my-profile.html"><i class='bx bxs-user' ></i>Mi perfil</a></li>
    <li><a href="cart.html"><i class='bx bx-cart'></i>Carrito</a></li>
  </ul>
  <div class="profile-details">
    <i class='bx bxs-chevron-up arrow'></i>
    <div class="profile-content">
      <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg" alt="profileImg">
    </div>
    <div class="name-job">
      <div class="profile_name" id="logger"></div>
    </div>
    <i class='bx bx-log-out' onclick="logOut()"></i>
  </div>
</li>


</ul>
`