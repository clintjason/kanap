export class Utils {
  /**
   * Check if the Product Quantity is between 1 && 100
   * @param { Number } qty - Product Quantity 
   * @returns { Boolean } - Returns True when the Quantity passes the Test and False otherwise
   */
  static checkValidQty(qty) {
    if(qty <= 0 || qty > 100) {
        return false;
    }
    return true;
  }

  /**
   * Get the Id parameter parsed in the url
   * @returns { String } - The Id parsed in the URL as a String
   */
  static getUrlId() {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id");
  }

  /**
   * Get Product Quantity
   * @returns { Number } - A positive integer number.
   */
  static getProductQty () {
    return Number(document.getElementById('quantity').value);
  }

  /**
  * Get the Product Selected Color
  * @returns { String } Color - It will return a color value or an empty string
  */
  static getProductSelectedColor() {
    return document.getElementById('colors').value;
  }
}