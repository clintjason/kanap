import { ApiRequest } from './api.class.js';
import { Utils } from "./utils.class.js";
import { ManipulateDOM } from './manipulateDOM.class.js';
import { ErrorHandler } from './errorHandler.class.js';
import { ModelManager } from './model.class.js';


function goToCart() {
  if (confirm("Continue to Checkout 🎉?") == true) {
    window.location.href = "../html/cart.html"
  } else {
    if (confirm("Go Back To Home ?") == true) {
      window.location.href = "../html/index.html"
    }
  }
}

/**
 * Add a product to the Cart in the LocalStorage
 * @param { Object } product - The product object received from the api
 */
function addToCart(product) {
  let btn = document.getElementById('addToCart');
  btn.addEventListener("click", function () {
      if(Utils.checkValidQty(Utils.getProductQty()) && Utils.getProductSelectedColor() != "") {
          let cart = ModelManager.getCart();
          if(cart) {
              console.log(product)
              let item = (cart).find( item => item.id == product._id && Utils.getProductSelectedColor() == item.color );
              if(item === undefined) { // Product not found
                ModelManager.addItemToCart( ModelManager.productModel( product ) );
                goToCart();
              } else { // product found
                  item.qty += Utils.getProductQty();
                  localStorage.setItem("cart",JSON.stringify(cart));
                  goToCart()
              }
          } else {
            ModelManager.addItemToCart( ModelManager.productModel( product ) );
            goToCart();
          }
      } else {
          alert("Please select the Right Quantity Or Select a Color");
      }
  })
}

( async () => {
  try {
    const product = await ApiRequest.getKanapById(Utils.getUrlId())
    console.log(product)
    ManipulateDOM.LoadProduct(product);
    addToCart(product)
  } catch (error) {
    ErrorHandler.displayKanapError('.item')
  }
})()