import { checkoutCart } from "./orderSummary.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrancy } from "../utils/money.js";



export function renderPaymentSummary(){
let paymentSummaryHTML='';
        

        let totalPrice=0;
        let shippingCost=0;

        checkoutCart.forEach((checkoutItem)=>{
            totalPrice += ((checkoutItem.product.priceCents))*checkoutItem.quantity;

            deliveryOptions.find((item)=>{
                if(item.id===checkoutItem.checkOutID){
                    shippingCost+= (item.priceCents);
                }
            })
        });

        let totalBeforeTax=formatCurrancy((totalPrice+shippingCost));
        let tax= formatCurrancy((totalPrice+shippingCost)*0.1);

        let totalAfterTax= (Number(totalBeforeTax)+Number(tax)).toFixed(2);

        paymentSummaryHTML+= `

            <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (${updateTotalQuantity()}):</div>
                    <div class="payment-summary-money">$${formatCurrancy(totalPrice)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formatCurrancy(shippingCost)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${totalBeforeTax}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${tax}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${totalAfterTax}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>











        `

        document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}


function updateTotalQuantity(){
    let totalQuantity=0;

          checkoutCart.forEach((cartItem)=>{
            totalQuantity+= cartItem.quantity;
          });

        return totalQuantity;
         
}
