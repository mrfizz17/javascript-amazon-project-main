class Cart{
     cartItems=undefined;
     localStorageKey=undefined;

     // constructor 

     constructor(localStorageKey){
            this.localStorageKey=localStorageKey;
            this.loadFromStorage();
     }

     loadFromStorage()
     {
            this.cartItems= JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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

     saveToLocalStorage()
     {
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
     }

     addTocart(productId,quantitySelector)
     {
                let matchItem;

                this.cartItems.find((cartitem)=>{
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
                    this.cartItems.push({
                    productId,
                    quantity:parsedQuantity,
                    deliveryOptionId :'3'
                    })
                }


                    this.saveToLocalStorage();
        }

        removeFromCart(productId)
        {

            let newCart=[]

                this.cartItems.forEach((cartItem)=>{
                        if(cartItem.productId!==productId){
                            newCart.push(cartItem);

                    }
                    });


                    this.cartItems=newCart;
                    this.saveToLocalStorage();
        }

        updateDeliveryOption(productId,deliveryOptionid)
        {
            let matchItem;

            this.cartItems.find((cartitem)=>{
                if(productId===cartitem.productId){
                    matchItem=cartitem;
                }
            });

            matchItem.deliveryOptionId=deliveryOptionid;
            this.saveToLocalStorage();
        }
        

        updateCart(productid,value)
        {
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId===productid){
                    cartItem.quantity=value
                }
            })

            this.saveToLocalStorage()
    
        }


}





const cart = new Cart('cart-oop');

cart.addTocart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1);
console.log(cart);


// const businessCart = {
//      cartItems:undefined,

//      loadFromStorage()
//      {
//             this.cartItems= JSON.parse(localStorage.getItem('cart-business')) || [
//             {
//                 productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity:2,
//                 deliveryOptionId:'1'
//             },
//             {
//                 productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//                 quantity:2,
//                 deliveryOptionId:'3'
//             }

//             ];
//      }

//      ,


//      saveToLocalStorage()
//      {
//         localStorage.setItem('cart-business',JSON.stringify(this.cartItems));
//      },


//     addTocart(productId,quantitySelector)
//      {
//                 let matchItem;

//                 this.cartItems.find((cartitem)=>{
//                     if(productId===cartitem.productId){
//                         matchItem=cartitem;
//                     }
//                 });

//                 const parsedQuantity=Number(quantitySelector);


//                 if(parsedQuantity<=0){
//                     removeFromCart(productId);
//                     return;
//                 }

                

//                 if(matchItem){
//                     matchItem.quantity+= parsedQuantity;
//                 }else{
//                     this.cartItems.push({
//                     productId,
//                     quantity:parsedQuantity,
//                     deliveryOptionId :'3'
//                     })
//                 }


//                     this.saveToLocalStorage();
//         },



//         removeFromCart(productId)
//         {

//             let newCart=[]

//                 this.cartItems.forEach((cartItem)=>{
//                         if(cartItem.productId!==productId){
//                             newCart.push(cartItem);

//                     }
//                     });


//                     this.cartItems=newCart;
//                     this.saveToLocalStorage();
//         },


//         updateDeliveryOption(productId,deliveryOptionid)
//         {
//             let matchItem;

//             this.cartItems.find((cartitem)=>{
//                 if(productId===cartitem.productId){
//                     matchItem=cartitem;
//                 }
//             });

//             matchItem.deliveryOptionId=deliveryOptionid;
//             this.saveToLocalStorage();
//         }
//         ,

//         updateCart(productid,value)
//         {
//             this.cartItems.forEach((cartItem)=>{
//                 if(cartItem.productId===productid){
//                     cartItem.quantity=value
//                 }
//             })

//             this.saveToLocalStorage()
    
//         }



// }

// businessCart.loadFromStorage();

// console.log(businessCart);

const budinessCart= new Cart('cart-business');
console.log(budinessCart);