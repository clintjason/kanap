import { ApiRequest } from "./Service/api.class.js";
import { ModelManager } from "./Model/model.class.js";
import { ManipulateDOM } from "./View/manipulateDOM.class.js";
import { FormValidation } from "./Utils/formValidation.class.js";
import { ErrorHandler } from "./Utils/errorHandler.class.js";

/**
 * Reckons the total Quantity of Products in the Cart.
 * @param { Array.<Object>} cart - an array of objects 
 * @returns { Number } - The sum of all product quantities calculated.
 */
function totalQty (cart) {
  // for every elment get the qty
  let qty = 0;
  for (let item of cart) {
      qty += Number(item.qty);
  }
  return qty;

  /* let total = cart.reduce((acc,currentValue) => {
      return acc + Number(currentValue)
  }, 0);
  return total; */
}

/**
* Calculate the total price of selected products 
* @param { Array.<Object>} cart - an array of objects 
* @returns { Number } - The sum of all product prices calculated.
*/
function totalPrice (cart , products) {
  let price = 0;

  for (let item of cart) {
    let product = products.find(product => product._id === item.id);
    if(product !== undefined) {
      price += Number((item.qty * product.price));
    }
  }
  return price;
}

(async () => {
  try {
    const products = await ApiRequest.getAllKanaps();
    const productPrice = (id) => {
      let product = products.find(product => product._id === id);
      return product !== undefined ? product.price : undefined;
    }
    let cart = ModelManager.getCart();
    if(cart && cart.length > 0) {
      for (let product of cart) {
        ManipulateDOM.LoadCartProducts(product, productPrice(product.id))
      }
      document.getElementById("totalQuantity").innerText = totalQty(cart)
      document.getElementById("totalPrice").innerText = totalPrice(cart, products);
      const contact = {
        firstName: document.querySelector("#firstName"),
        lastName: document.querySelector("#lastName"),
        address: document.querySelector("#address"),
        city: document.querySelector("#city"),
        email: document.querySelector("#email")
      }
  
      contact.firstName.addEventListener('change', (event) => FormValidation.checkfirstName(event));
      contact.lastName.addEventListener('change', (event) => FormValidation.checklastName(event));
      contact.address.addEventListener('change', (event) => FormValidation.checkAddress(event));
      contact.city.addEventListener('change', (event) => FormValidation.checkCity(event));
      contact.email.addEventListener('change', (event) => FormValidation.checkEmail(event));
      FormValidation.submitForm(ModelManager.productIds());
    } else {
      ManipulateDOM.cartSection.innerHTML = "<h3 class='t-center'>Votre Panier est vide.</h3><p class='t-center'>Veuillez ajouter un produit au panier.</p>";
    }
  } catch (error) {
    console.error(error);
    ErrorHandler.networkError('#cart__items');
  }
})()