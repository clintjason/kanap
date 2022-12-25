import { Utils } from "./utils.class.js";
export class ModelManager {

  /**
   * Get the Cart information
   * @returns { Array.<Object> | null } - Returns an Array of Objects
   */
  static getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  /**
  * Adds a product to the Cart
  * @param { Object } product  - The product object
  */
  static addItemToCart(product) {
    let cart = ModelManager.getCart();
    if(cart == null) { cart = []; }
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart))
  }

  /**
  * Creates The Product Model
  * @param { Object } product - Product Object
  * @param { String } color - A String Value
  * @param { Number } qty - The Quantity of product selected
  * @returns { Object.<{ id: String, name: String, price: String, color: String, qty: Number, imageUrl: String }>}
  */
  static productModel (product, color = Utils.getProductSelectedColor (), qty = Utils.getProductQty() ) {
    return {
        id: product._id,
        name: product.name,
        color: color,
        qty: qty,
        imageUrl: product.imageUrl,
        altTxt: product.altTxt
    }
  }
}