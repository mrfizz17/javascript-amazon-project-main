// const products = [{
//     image : '../images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating:{
//         stars:4.5,
//         count:87
//     },
//     priceCents : 1090
// },

// {
//     image : '../images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating:{
//         stars:4,
//         count:127
//     },
//     priceCents : 2095
// },

// {
//     image : '../images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating:{
//         stars:4.5,
//         count:56
//     },
//     priceCents :799
// },

// {
//   image : '../images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating:{
//         stars:5,
//         count:2197
//     },
//     priceCents :1899
// }


// ];

// import {cart} from '../data/cart.js'
import {products} from '../data/products.js'
import {cart, addTocart } from '../data/cart.js';

// if we want to use different name for cart in this file
//  then we can do like this

//import {cart as myCart} from '../data/cart.js'    


updateTotalQuantity();


let pushHTML='';
products.forEach((product)=>{
    let createhtml=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStrars()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-btn " data-product-name="${product.name}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    
    `;

    pushHTML+=createhtml;


})

document.querySelector('.products-grid').innerHTML=pushHTML;






const addedMessageTimeouts={};





 function updateTotalQuantity(){
    let totalQuantity=0;

          cart.forEach((cartItem)=>{
            totalQuantity+= cartItem.quantity;
          });


          document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;
}

function showAddedMessage(productId){
      const showAdded= document.querySelector(`.js-added-to-cart-${productId}`);
      showAdded.classList.add('show-js-added-to-cart');

      const previousTimeoutId=addedMessageTimeouts[productId];
        if(previousTimeoutId){  
          clearTimeout(previousTimeoutId);
        }

      const removeClass= ()=>{
        showAdded.classList.remove('show-js-added-to-cart');
      }

      const timeoutId=setTimeout(()=>{
        removeClass();
      },2000);

      addedMessageTimeouts[productId] =timeoutId;
}

document.querySelectorAll('.js-add-to-cart-btn').forEach((button)=>{
    button.addEventListener('click',()=>{

          /*
        USED NAME TO IDENTIFY -- BUT BEST PRACTICE USE UNIQUE ID 

       const productName= button.dataset.productName;

       // check if it is already in cart if it is then increase quantity 
       // if not newly add the item to cart


      

      

          let matchingItem;

          cart.forEach((item)=>{
              if(productName === item.productName){
                matchingItem=item;   // matchingItem is now a full product
              }
          });

          if(matchingItem){  // if matchingItem true means the item is already in cart so 
              matchingItem.quantity++; // instead newly add just increae quantity
          }
          else{  // means not present in cart so just add newly to cart
                cart.push({
                  productName,
                  quantity:1
                });

          }

       */

          // Fetch id 

          const productId = button.dataset.productId;

          let quantitySelector= document.querySelector(`.js-quantity-selector-${productId}`).value;

          addTocart(productId,quantitySelector);

          updateTotalQuantity();

          showAddedMessage(productId);  






       
       
      
    })
})


