export const cart=[
    
];


export function addTocart(productId){
      let matchItem;

          cart.forEach((cartitem)=>{
              if(productId===cartitem.productId){
                matchItem=cartitem;
              }
          });

          let quantitySelector= document.querySelector(`.js-quantity-selector-${productId}`).value;

          if(matchItem){
            matchItem.quantity+= Number(quantitySelector);
          }else{
            cart.push({
              productId,
              quantity:Number(quantitySelector)
            })
          }
}