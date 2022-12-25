export class ManipulateDOM {
  static homeSection = document.getElementById('items');
  static productSection = document.querySelector('.item');

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
}