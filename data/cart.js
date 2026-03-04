
export let cart;


loadFromStorage();

export function loadFromStorage(){
  cart= JSON.parse(localStorage.getItem('cart')) || [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:2,
    deliveryOptionId:'3'
  }

  ];
}


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
              quantity:parsedQuantity,
              deliveryOptionId :'3'
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


export function updateDeliveryOption(productId,deliveryOptionid){
          let matchItem;

          cart.find((cartitem)=>{
              if(productId===cartitem.productId){
                matchItem=cartitem;
              }
          });

          matchItem.deliveryOptionId=deliveryOptionid;
          saveToLocalStorage();
}

export function updateCart(productid,value){
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productid){
            cartItem.quantity=value
        }
    })

    saveToLocalStorage()
    
}
