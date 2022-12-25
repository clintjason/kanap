export class ErrorHandler {
  static homeSection = document.getElementById('items');
  static productSection = document.querySelector('.item');


  static displayKanapError(selector) {
    //ErrorHandler.homeSection.innerHTML = `<h3 class="error">Une Erreurs c'est Produite</h3>`
    document.querySelector(selector).innerHTML = `<h3 class="error">Une Erreurs c'est Produite. Veuillez vérifier la connexion au serveur, et ressayer.</h3>`
  }

  static networkError(section) {
    section.innerHTML = `<h3 class="error">Erreure de Réseau. Veuillez vérifier la connexion au serveur, et ressayer.</h3>`
  }

}