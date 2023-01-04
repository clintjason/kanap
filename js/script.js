//@ts-check
import { ApiRequest } from './Service/api.class.js';
import { ManipulateDOM } from './View/manipulateDOM.class.js';
import { ErrorHandler } from './Utils/errorHandler.class.js';

(async () => {
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