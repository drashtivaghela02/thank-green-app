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
      const quantityId = action.quantityID;
      const prodPrice = 12;
      const prodData = addedProduct;
console.log(`${addedProduct.product_id}-${action.quantityID}`)
      // Generate cartItemId
      const cartItemId = `${addedProduct.product_id}-${action.quantityID}`;

      let updatedOrNewCartItem;

      if (state.items[cartItemId]) {
        // If an item with the same cart item ID exists, update its quantity and sum
        updatedOrNewCartItem = new CartItem(
          state.items[cartItemId].quantity + 1,
          quantityId,
          prodPrice,
          prodData,
          state.items[cartItemId].sum + prodPrice
        );
      } else {
        // If no item with the same cart item ID exists, add it as a new item
        updatedOrNewCartItem = new CartItem(1, quantityId, prodPrice, prodData, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [cartItemId]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };


    case REMOVE_ITEM:
      const removeItem = state.items[action.pid];
      const currentQty = removeItem.quantity;
      console.log("sjdfjeoijdiojfaj", currentQty)
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
        console.log("state after deacreasing quantity: ", state)
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