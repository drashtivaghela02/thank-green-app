import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/Cart";

const initialState= {
  items: [],
  totalAmount: 0  
};
class CartItem {
  constructor(quantity, productPrice, productTitle, sum){
      this.quantity = quantity;
      this.productPrice = productPrice,
      this.productTitle = productTitle,
      this.sum = sum
  }
}
const cart = (state = initialState, action) => {
  switch (action.type) {
      case ADD_TO_CART :
          const addedProduct = action.product;
          const prodPrice = 12;
          const prodTitle = addedProduct.product_title;
          
          let updatedOrNewCartItem;

          if(state.items[addedProduct.product_id]){
              //already have the item in the cart
              updatedOrNewCartItem = new CartItem(
                  state.items[addedProduct.product_id].quantity + 1,
                  prodPrice,
                  prodTitle,
                  state.items[addedProduct.product_id].sum + prodPrice
              );
              console.log(updatedOrNewCartItem);
          }
          else{
              updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
              console.log(updatedOrNewCartItem);
          }
          return{
              ...state,
              items : {...state.items, [addedProduct.product_id] : updatedOrNewCartItem},
              // totalAmount : state.totalAmount + prodPrice
          }

      case REMOVE_FROM_CART :
          const removeItem = state.items[action.pid];
          const currentQty = removeItem.quantity;
          let updatedCartItems;
          if (currentQty > 1) {
            // need to reduce it, not erase it
            const updatedCartItem = new CartItem(
              currentQty - 1,
              removeItem.productPrice,
              removeItem.productTitle,
              removeItem.sum - removeItem.productPrice
            );
            updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
          } else {
            updatedCartItems = { ...state.items };
            delete updatedCartItems[action.pid];
          }
          return {
            ...state,
            items: updatedCartItems,
            totalAmount: state.totalAmount - removeItem.productPrice
          };

      }      
  return state;  
};

export default cart;