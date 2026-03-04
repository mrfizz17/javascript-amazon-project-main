import { addTocart,cart,loadFromStorage } from "../../data/cart.js";


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
    })
})