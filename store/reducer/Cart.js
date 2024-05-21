import { ADD_TO_CART, DELETE_FROM_CART, REMOVE_ITEM } from "../actions/Cart";

const initialState = {
  items: [],
  totalAmount: 0
};
class CartItem {
  constructor(quantity, quantityId, productPrice, productData, sum) {
    this.quantity = quantity;
    this.quantityId = quantityId
    this.productPrice = productPrice,
    this.productData = productData,
    this.sum = sum
  }
}
const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const quantityId = addedProduct.quantityId
      const prodPrice = 12;
      const prodData = addedProduct;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.product_id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.product_id].quantity + 1,
          quantityId,
          prodPrice,
          prodData,
          state.items[addedProduct.product_id].sum + prodPrice
        );
        console.log(updatedOrNewCartItem);
      }
      else {
        updatedOrNewCartItem = new CartItem(1, quantityId, prodPrice, prodData, prodPrice);
        console.log(updatedOrNewCartItem);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.product_id]: updatedOrNewCartItem },
        // totalAmount : state.totalAmount + prodPrice
      }

    case REMOVE_ITEM:
      const removeItem = state.items[action.pid];
      console.log("sjdfjeoijdiojfaj",removeItem)
      const currentQty = removeItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem( 
          state.items[action.pid].quantity - 1,
          state.items[action.pid].quantityId,
          state.items[action.pid].productPrice,
          state.items[action.pid].productData,
          state.items[action.pid].sum - state.items[action.pid].productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
        console.log("state after deacreasing quantity: ",state)
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - removeItem.productPrice
      };

    case DELETE_FROM_CART:
      const deleteItem = state.items[action.pid];
      let updatedCartItem = { ...state.items };
      delete updatedCartItem[action.pid];

      return {
        ...state,
        items: updatedCartItem,
        totalAmount: state.totalAmount - deleteItem.productPrice
      };
  }

  return state;
};

export default cart;