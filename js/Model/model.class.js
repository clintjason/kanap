import { Utils } from "../Utils/utils.class.js";
export class ModelManager {

  /**
   * Get the Cart information
   * @returns { Array.<Object> | null } - Returns an Array of Objects
   */
  static getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  /**
   * Function to return array of product Ids.
   * @returns { Array } - Returns and Arrays of Product Ids
   */
  static productIds () {
    const cart = ModelManager.getCart();
    let products;
    if(cart) {
      products = cart.map(item => item.id)
    }
    return products;
  }

  /**
  * Adds a product to the Cart
  * @param { Object } product  - The product object to be added to the cart
  */
  static addItemToCart(product) {
    let cart = ModelManager.getCart();
    if(cart == null) { cart = []; }
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart))
  }

  /**
  * Creates The Product Model
  * @param { Object } product - A Product Object
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