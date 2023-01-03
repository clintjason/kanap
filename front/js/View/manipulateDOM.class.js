import { Utils } from '../Utils/utils.class.js'

export class ManipulateDOM {
  static homeSection = document.getElementById('items');
  static productSection = document.querySelector('.item');
  static cartSection = document.querySelector('#cart__items');

  /**
   * Load data into Home Template
   * @param {Object} Product - Product data to be displayed in template
   * 
  */
  static LoadProductsOnHomePage(product) {
    let template = ManipulateDOM.createTemplate("homeTemplate");
    template.querySelector(".productLink").href = `../html/product.html?id=${product._id}`;
    template.querySelector(".productImage").src = product.imageUrl;
    template.querySelector(".productImage").alt = product.altTxt;
    template.querySelector(".productName").innerText = product.name;
    template.querySelector(".productDescription").innerText = product.description;
    ManipulateDOM.homeSection.append(template);
  }

  /**
   * Load data into the Product Template
   * @param {Object} Product - Product data to be displayed in template
   * 
  */
  static LoadProduct(product) {
    let productTemplate = ManipulateDOM.createTemplate("productTemplate");
    productTemplate.querySelector("#item__img").src = product.imageUrl;
    productTemplate.querySelector("#item__img").alt = product.altTxt;
    productTemplate.querySelector("#title").innerText = product.name;
    productTemplate.querySelector("#price").innerText = product.price;
    productTemplate.querySelector("#description").innerText = product.description;

    ManipulateDOM.loadColors(product.colors, productTemplate);
    ManipulateDOM.productSection.append(productTemplate);
  }

  /**
   * Load data into the Cart Template
   * @param {Object} Product - Product data to be displayed in template
   * 
  */
  static LoadCartProducts(product, price) {
    let cartTemplate = ManipulateDOM.createTemplate("cartTemplate");
    cartTemplate.querySelector(".cart__item").dataset.id = product.id;
    cartTemplate.querySelector(".cart__item").dataset.color = product.color;
    cartTemplate.querySelector(".cart__item__img > img").src = product.imageUrl;
    cartTemplate.querySelector(".cart__item__img > img").alt = product.altTxt;
    cartTemplate.querySelector(".cart__item__content__description > h2").innerText = product.name;
    cartTemplate.querySelector(".cart__item__content__description > p").innerText = product.color;
    cartTemplate.querySelector(".cart__item__content__description > p.price").innerText = price + ' €';
    cartTemplate.querySelector(".itemQuantity").value = product.qty;
    cartTemplate.querySelector(".deleteItem").addEventListener('click', (e) => ManipulateDOM.deleteProduct(e));
    cartTemplate.querySelector(".itemQuantity").addEventListener('change', (e) => ManipulateDOM.updateQty(e));

    ManipulateDOM.cartSection.append(cartTemplate);
  }

  /**
   * Load Colors into Template Element Content
   * @param { Array.<String> } colors - A string array of colors
   * @param { HTMLTemplateElement } template - A copy of the content of a template element.
   */
  static loadColors (colors, template) {
    for (let color of colors) {
        let option = `<option value="${color}">${color}</option>`;
        template.querySelector("#colors").innerHTML += option;
    }
  }

  /**
   * Create a Copy of the Content of an HTML Template 
   * @param {String} templateID - Template Id used to select the template
   * @returns {HTMLTemplateElement} Template - Copy of template Element to be modified
  */
  static createTemplate (templateID) {
    // Get template and its content
    let template = document.getElementById(templateID).content;
    // Make a Copy of the template Element Content
    return  document.importNode(template, true); // could also be template.cloneNode(true)
  }

  /**
   * Deletes the selected Product from the cart
   * @param { Event } Event Object
   * 
   */
  static deleteProduct(e) {
    e.preventDefault();
    let action = confirm("Êtes Vous sûr de vouloir supprimer l'article?");
    if(!action) return false
    const elmt = e.target;
    const articleElement = elmt.closest("article");
    const cart = JSON.parse(localStorage.getItem('cart'));
    // Returns cart of elements not deleted
    let newCart = cart.filter(item => (item.id !== articleElement.dataset.id) || (item.id === articleElement.dataset.id && item.color !== articleElement.dataset.color));
    console.log(newCart)
    localStorage.setItem("cart",JSON.stringify(newCart));
    window.location.reload();
  }

  /**
  * Updates a Product Quantity
  * @param { Event } Event Object
  */
  static updateQty (e) {
    e.preventDefault();
    const elmt = e.target;
    const articleElement = elmt.closest("article");
    const cart = JSON.parse(localStorage.getItem('cart'));

    let product = cart.find(item => item.id === articleElement.dataset.id && item.color === articleElement.dataset.color)
    product.qty = Utils.checkValidQty(elmt.value) ? elmt.value : product.qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  }
}