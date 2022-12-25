import { ApiRequest } from './api.class.js';
import { ManipulateDOM } from './manipulateDOM.class.js';
import { ErrorHandler } from './errorHandler.class.js';

(async ()=> {
  try {
    const products = await ApiRequest.getAllKanaps();
    console.log(products);
    products.forEach(product => {
      ManipulateDOM.LoadProductsOnHomePage(product);
    })
  } catch (error) {
    ErrorHandler.displayKanapError('.items')
  }
  
})()