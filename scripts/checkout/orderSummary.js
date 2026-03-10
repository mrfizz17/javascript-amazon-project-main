import { cart, removeFromCart,updateDeliveryOption,updateCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { saveToLocalStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// importing as esm(ecmascript module) for dayjs and relativeTime plugin
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.19/+esm'
import relativeTime from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.19/plugin/relativeTime/+esm';
dayjs.extend(relativeTime);

//------------ checkout page rendering------------------

saveToLocalStorage();




export let checkoutCart=[];

// updateCheckoutCart();




// const today= dayjs();   
// const deliverydate = dayjs().add(7,'day');




export function updateCheckoutCart(){

    checkoutCart=[];

    cart.forEach((cartItem)=>{
    products.forEach((product)=>{
        if(cartItem.productId===product.id){
            checkoutCart.push({
                product,
                quantity:cartItem.quantity,
                checkOutID:cartItem.deliveryOptionId
            });
        }
        
    });
    });


    renderHTML();
    renderDeleteButtons();
    updateTotalQuantity();
    updateQuantity();
    renderUpdateDeliveryOption();
    renderPaymentSummary();

    

}





export function renderHTML(){
        let pushHTML='';
        checkoutCart.forEach((checkoutItem)=>{
        
        const deliveryOptionID=checkoutItem.checkOutID;

        let matchedDeliveryItem;

        deliveryOptions.find((item)=>{
            if(item.id===deliveryOptionID){
                matchedDeliveryItem=item;
            }
        })

        const matchedDeliveryDate = dayjs().add(
            matchedDeliveryItem.deliveryDays,'days'
        ).format('dddd, MMMM DD')

        pushHTML+= `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${checkoutItem.product.id}">
            <div class="delivery-date">
              Delivery date: ${matchedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${checkoutItem.product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${checkoutItem.product.name}
                </div>
                <div class="product-price">
                  $${(checkoutItem.product.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity ">
                  <span class="js-product-quantity-${checkoutItem.product.id}">
                    Quantity: <span class="quantity-label quantity-level-${checkoutItem.product.id}"> ${checkoutItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${checkoutItem.product.id}">
                        Update

                        
                  </span>
                  <input class ="update-quantity js-update-quantity-${checkoutItem.product.id}">

                    <span class="update-quantity-button js-update-quantity-btn-${checkoutItem.product.id}">
                        save
                    </span>

                  <span class="delete-quantity-link link-primary js-delete-link-${checkoutItem.product.id}" data-product-id="${checkoutItem.product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    
                    ${deliverOptionHTML(checkoutItem)}
                    

                </div>
            </div>
        </div>`
    });

    document.querySelector('.js-order-summary').innerHTML=pushHTML;


}


function deliverOptionHTML(checkoutItem){
    let html='';
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate= today.add(
                deliveryOption.deliveryDays,'days'
            )

            const dateString = deliveryDate.format('dddd, MMMM DD');

            const priceString =  (deliveryOption.priceCents!==0) 
            ? `$${((deliveryOption.priceCents)/100).toFixed(2)} - ` 
            : `FREE `

            const isChecked = deliveryOption.id===checkoutItem.checkOutID ? 'checked' : '';


             html+=   `<div class="delivery-option js-delivery-option"
                            data-product-id="${checkoutItem.product.id}"
                            data-delivery-option-id="${deliveryOption.id}">
                            <input type="radio"
                                ${isChecked}
                                class="delivery-option-input "
                                name="delivery-option-${checkoutItem.product.id}"
                                data-product-id="${checkoutItem.product.id}">
                            <div>
                                    <div class="delivery-option-date">
                                        ${dateString}
                                    </div>
                                    <div class="delivery-option-price">
                                        ${priceString} Shipping
                                    </div>
                            </div>
                        </div>`
        })

        return html;
}

function renderUpdateDeliveryOption(){
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        updateCheckoutCart();
    })
})
}






function renderDeleteButtons(){
    document.querySelectorAll('.delete-quantity-link').forEach((deleteButton)=>{
    deleteButton.addEventListener('click',()=>{
        let productId= deleteButton.dataset.productId;

        removeFromCart(productId);

        updateCheckoutCart();   

    

    })
    });
}

function updateTotalQuantity(){
    let totalQuantity=0;

          cart.forEach((cartItem)=>{
            totalQuantity+= cartItem.quantity;
          });


          document.querySelector('.js-checkout-quantity').innerHTML=`${totalQuantity} `;
}


function updateQuantity(){
        document.querySelectorAll('.update-quantity-link').forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
                let inputBtn= document.querySelector(`.js-update-quantity-${productId}`);
                let updateBtn=document.querySelector(`.js-update-quantity-btn-${productId}`);
                
                inputBtn.classList.add('show-update-quantity');
                updateBtn.classList.add('show-update-quantity-btn');

                        // console.log(inputBtn)



                updateBtn.addEventListener('click',()=>{
                    let updatequantityValue=Number(inputBtn.value);
                    
                  

                        console.log(inputBtn);

                       inputBtn.classList.remove('show-update-quantity');
                        updateBtn.classList.remove('show-update-quantity-btn');

                        updateCart(productId,updatequantityValue);
                        updateCheckoutCart();
                            
                });
                
                

                // console.log(productId);
            })
        })
}

// console.log(dayjs());
// console.log(dayjs().format('HH:mm:ss'));
// console.log(dayjs().format('dddd, DD-MMMM-YYYY'));
// console.log(dayjs().add(7,'day').format('dddd, DD-MMMM-YYYY'));
// console.log(dayjs().subtract(7,'day').format('dddd, DD-MMMM-YYYY'));
// console.log(dayjs().startOf('month').format('dddd, DD-MMMM-YYYY'));
// console.log(dayjs().startOf('hour').format('dddd, DD-MMMM-YYYY HH:mm:ss'));

// const futureDate= dayjs().add(3,'day');
// console.log(futureDate.fromNow());
