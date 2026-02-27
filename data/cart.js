
export let cart= JSON.parse(localStorage.getItem('cart')) || [];


saveToLocalStorage();

export function addTocart(productId,quantitySelector){
      let matchItem;

          cart.find((cartitem)=>{
              if(productId===cartitem.productId){
                matchItem=cartitem;
              }
          });

          const parsedQuantity=Number(quantitySelector);


          if(parsedQuantity<=0){
            removeFromCart(productId);
            return;
          }

          

          if(matchItem){
            matchItem.quantity+= parsedQuantity;
          }else{
            cart.push({
              productId,
              quantity:parsedQuantity  
            })
          }


            saveToLocalStorage();
}


export function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function removeFromCart(productId){

  let newCart=[]

      cart.forEach((cartItem)=>{
            if(cartItem.productId!==productId){
                newCart.push(cartItem);

           }
        });


        cart=newCart;
        saveToLocalStorage();
}