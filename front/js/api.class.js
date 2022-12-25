export class ApiRequest {
  static #endpoint = "http://localhost:3000/api/products/";

  static getEndPoint() {
    return ApiRequest.#endpoint;
  }

  static async getAllKanaps () {
    return await (await fetch(ApiRequest.getEndPoint())).json()
  }

  static async getKanapById (id) {
    return await (await fetch(ApiRequest.getEndPoint() + id)).json()
  }
}