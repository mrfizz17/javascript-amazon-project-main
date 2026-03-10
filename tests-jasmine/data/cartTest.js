import { addTocart,cart,loadFromStorage } from "../../data/cart.js";
import { removeFromCart } from "../../data/cart.js";


describe ('test Suit : Add to Cart',()=>{
    it('Adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId :'3'
            }])
        })

        loadFromStorage();

        addTocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);

        expect(cart.length).toEqual(1),
        expect(cart[0].quantity).toEqual(2);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    });


    // mock 

    

    it('Add a new product top the cart', ()=>{

        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        console.log(localStorage.getItem('cart'));
        loadFromStorage();


        addTocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

         expect(localStorage.getItem).toHaveBeenCalledWith('cart');

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    })
})

describe('test suite : remove from cart',()=>{

    // beforEach(()=>{
    //     spyOn(localStorage,'setItem');

    //     spyOn(localStorage,'getitem').and.callFake(()=>{
    //         return JSON.stringify([{
    //             productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //             quantity:1,
    //             deliveryOptionId :'3'
    //         }])
            
    //     })
    // })


    it('remove a item is in cart',()=>{
            spyOn(localStorage,'setItem');

            spyOn(localStorage,'getItem').and.callFake(()=>{
                return JSON.stringify([{
                    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:1,
                    deliveryOptionId :'3'
                },{
                    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity:1,
                    deliveryOptionId :'1'
                }])
                
            })

            loadFromStorage();
            removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    })


    it('remove a item is not in cart',()=>{
            spyOn(localStorage,'setItem');

            spyOn(localStorage,'getItem').and.callFake(()=>{
                return JSON.stringify([])
            })

            loadFromStorage();
            removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart.length).toEqual(0);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    })


})