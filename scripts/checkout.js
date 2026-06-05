import { updateCheckoutCart } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-oop.js';
// import{car} from '../data/car.js';
// import '../data/cart-class.js';

// import '../data/backend-practice.js'



// promises practice

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })
}).then(()=>{
    updateCheckoutCart();
})




// loadProducts(updateCheckoutCart);
// updateCheckoutCart();