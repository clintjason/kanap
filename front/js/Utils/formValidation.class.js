import { ApiRequest } from '../Service/api.class.js';
import { ErrorHandler } from '../Utils/errorHandler.class.js';

export class FormValidation {
  static firstName = document.querySelector("#firstName").value;
  static lastName = document.querySelector("#lastName").value;
  static adress = document.querySelector("#address").value;
  static city = document.querySelector("#city").value;
  static email = document.querySelector("#email").value;

  /**
   * Regew Method to Test if the input argument is valide
   * @param { String } value Receives a String value
   * @returns { BOOLEAN } Returns True or False
   */
  static textValidation(value) {
    return /^[A-Za-zÀ-ÿ]+[A-Za-zÀ-ÿ ,.'-]{1,20}[A-Za-zÀ-ÿ]+$/.test(value)
  }

  /**
   * Regew Method to Test if the Address input argument is valid
   * @param { String } value Receives a String value
   * @returns { BOOLEAN } Returns True or False
   */
  static addressValidation = (value) => {
    return /^([a-zA-ZÀ-ÿ]+|[0-9]{1,})([a-zA-ZÀ-ÿ,-. ]{1,}|[0-9]{1,})[ ].{1,}$/.test(value)
  }

  /**
   * Regex Method to Test if the email input argument is valide
   * @param { String } value Receives a String value
   * @returns { BOOLEAN } Returns True or False
   */
  static emailValidation = (value) => {
    return /^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value)
  }

  /**
   * Check if the firstName of the Form Field is Valid
   * @param {Event} event object 
   * @returns { Boolean } Returns true or false
   */
  static checkfirstName (event) {
    event.preventDefault();
    let firstName = event.target.value
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if (FormValidation.textValidation(firstName)) {
      firstNameErrorMsg.innerHTML = "";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Entrer un Prénom valide.";
      return false;
    };
  }

  /**
   * Check if the lastName of the Form Field is Valid
   * @param {Event} event object 
   * @returns { Boolean } Returns true or false
   */
  static checklastName (event) {
    event.preventDefault();
    let lastName = event.target.value
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if (FormValidation.textValidation(lastName)) {
      lastNameErrorMsg.innerHTML = "";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Entrer un nom valide.";
      return false;
    };
  }

  /**
   * Check if the city of the Form Field is Valid
   * @param {Event} event object 
   * @returns { Boolean } Returns true or false
   */
  static checkCity (event) {
    event.preventDefault();
    let city = event.target.value;
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    if (FormValidation.textValidation(city)) {
      cityErrorMsg.innerHTML = "";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Entrer une Ville Valide.";
      return false;
    };
  }

  /**
   * Check if the Address of the Form Field is Valid
   * @param {Event} event object 
   * @returns { Boolean } Returns true or false
   */
  static checkAddress (event) {
    event.preventDefault();
    let address = event.target.value
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    if (FormValidation.addressValidation(address)) {
      addressErrorMsg.innerHTML = "";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Entrer une Address Valide";
      return false;
    };
  }

  /**
   * Check if the Email of the Form Field is Valid
   * @param {Event} event object 
   * @returns { Boolean } Returns true or false
   */
  static checkEmail (event) {
    event.preventDefault();
    let email = event.target.value
    const emailErrorMsg = document.getElementById('emailErrorMsg');
    if (FormValidation.emailValidation(email)) {
      emailErrorMsg.innerHTML = "";
      return true;
    } else {
      emailErrorMsg.innerHTML = "Entrer un Email Valide";
      return false;
    };
  }

  /**
   * Submit
   * @param {Array} array of product Ids 
   * @returns { Boolean } Redirects to confirmation page
   */
  static submitForm(productIds) {
    document.getElementById("order").addEventListener("click", (e) => {
      e.preventDefault();
      let cart = JSON.parse(localStorage.getItem('cart'));
      if(!cart || cart.length > 0) {
        ErrorHandler.displayCartError('#cart__items');
        return ;
      }
      if(FormValidation.checkfirstName && FormValidation.checklastName && FormValidation.checkCity && FormValidation.checkAddress && FormValidation.checkEmail) {
        console.log("all forms are valid");
        const contact = {
          firstName: document.querySelector("#firstName").value,
          lastName: document.querySelector("#lastName").value,
          address: document.querySelector("#address").value,
          city: document.querySelector("#city").value,
          email: document.querySelector("#email").value
        }

        let data = {
          contact: contact,
          products: productIds
        }
        console.log(data);
        ApiRequest.placeOrder(JSON.stringify(data))
        .then(res => {
          return res.json();
        })
        .then(data => {
          window.location.href = `../html/confirmation.html?id=${data.orderId}`
        })
        .catch(err => {
          console.log(err);
          ErrorHandler.networkError('.cart__order');
        })
      }
    })
  }

}