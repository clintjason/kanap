export class ErrorHandler {
  static homeSection = document.getElementById('items');
  static productSection = document.querySelector('.item');

  /**
   * Displays Error Message in specified selector
   * @param { String } selector - A Selector to the corresponding HTML Element to be Selected
   */
  static displayKanapError(selector) {
    document.querySelector(selector).innerHTML = `<h3 class="error">Une Erreurs c'est Produite. Veuillez vérifier la connexion au serveur, et ressayer.</h3>`
  }

  /**
   * Displays Error Message when Cart is not defined
   * @param { String } selector - A Selector to the corresponding HTML Element to be Selected
   */
  static displayCartError(selector) {
    document.querySelector(selector).innerHTML = `<h3 class="error t-center">Veuillez ajouter des produits à la carte.</h3>`
  }

  /**
   * Displays Networkd Error Message in specified section
   * @param { String } Selector - A Selector to the corresponding HTML Element to be Selected
   */
  static networkError(selector) {
    document.querySelector(selector).innerHTML += `<h3 class="error t-center">Erreure de Réseau. Veuillez vérifier la connexion au serveur, et ressayer.</h3>`
  }

}