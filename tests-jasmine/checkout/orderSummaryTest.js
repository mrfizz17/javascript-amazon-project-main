import { renderHTML, updateCheckoutCart } from "../../scripts/checkout/orderSummary.js";
import { addTocart, cart, removeFromCart } from "../../data/cart.js";
import { loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary',()=>{

    beforeEach(() => {
            spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML=
            `
             <div class="js-order-summary"> </div>
              <div class="js-checkout-quantity"></div>
              <div class="js-payment-summary"></div>
            `


        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([   {
                        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity:2,
                        deliveryOptionId:'1'
                    },
                    {
                        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity:1,
                        deliveryOptionId:'3'
                    }
                ]) 
        });

        loadFromStorage();

        updateCheckoutCart();
    });

  
    it('displays the cart',()=>{

        expect(cart.length).toEqual(2);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[1].quantity).toEqual(1);

        addTocart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
        updateCheckoutCart();

        expect(cart[1].quantity).toEqual(2);

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2)

        expect(
            document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText
        ).toEqual("Quantity: 2 ");


        expect(
            document.querySelector('.js-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerHTML
        ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');


        document.querySelector('.js-test-container').innerHTML='';

    });





    it('check delete working properly',()=>{
        

        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();

        updateCheckoutCart();

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);

        expect(cart.length).toEqual(1);

        document.querySelector('.js-test-container').innerHTML='';


    })



   


});









describe('test suite : update delivery option',()=>{
    beforeEach(() => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([   {
                        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',

                        quantity:2,
                        deliveryOptionId:'1'
                    },              
                    {   
                        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity:1,
                        deliveryOptionId:'3'
                    }
                ]) 
        });

        loadFromStorage();
        document.querySelector('.js-test-container').innerHTML=
        `
         <div class="js-order-summary"> </div>
          <div class="js-checkout-quantity"></div>
          <div class="js-payment-summary"></div>
        `
        updateCheckoutCart();
        });

    it('check update delivery option working properly',()=>{
        document.querySelector('.js-delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').click();
        updateCheckoutCart();
        expect(cart[0].deliveryOptionId).toEqual('3');
        document.querySelector('.js-test-container').innerHTML='';
    })  

})

