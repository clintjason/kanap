export class ApiRequest {
  static #endpoint = "https://hilarious-pink-fossa.cyclic.app/api/products/";

  /**
   * Returns backend entry point.
   * @returns { String } The value of a private endpoint string.
   */
  static getEndPoint() {
    return ApiRequest.#endpoint;
  }

  /**
   * Function to fetch all Kanaps
   * @returns { Array<Object> } Returns an array of Kanap Objects  
   */
  static async getAllKanaps () {
    return await (await fetch(ApiRequest.getEndPoint())).json()
  }

  /**
   * Function to fetch a Kanap by its Id
   * @returns { Object } Returns a Kanap Object
   */
  static async getKanapById (id) {
    return await (await fetch(ApiRequest.getEndPoint() + id)).json()
  }

  /**
   * Function to place an order given a data of form (contact:contact<Object>, productIds<Array>)
   * @returns { Object } Returns a Kanap Object containing the orderId
   */
  static async placeOrder (data) {
    return await fetch(ApiRequest.getEndPoint() + 'order', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}