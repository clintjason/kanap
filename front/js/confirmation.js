import { Utils } from './Utils/utils.class.js';

document.getElementById('orderId').innerText = Utils.getUrlId();
localStorage.removeItem('cart');