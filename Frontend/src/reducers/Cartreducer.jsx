

const Cartreducer = (state,action) => {

    if (action.type === "ADD_TO_CART") {
        let { id, name, desc, image, price } = action.payload;
        let existingItemIndex = state.cart.findIndex(item => item.id === id);

        if (existingItemIndex !== -1) {
            // If item already exists in cart, update its quantity
            return {
                ...state,
                cart: state.cart.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                })
            };
        } else {
            // If item does not exist in cart, add it
            let cartProduct = {
                id: id,
                name: name,
                image: image,
                desc: desc,
                price: price,
                quantity: 1 ,// Set initial quantity to 1
                
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct]
            };
        }
    }
  return state
    
}

export default Cartreducer
