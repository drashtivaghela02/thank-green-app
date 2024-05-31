
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const RESET_STATE = 'RESET_STATE';

export const addToCart = (product, quantityID) => {
    return {type : ADD_TO_CART, product : product, quantityID : quantityID };
}

export const removeFromCart = productID => {
    console.log("helkloasfoia",productID)
    return {type : REMOVE_ITEM, pid : productID}
}

export const deleteFromCart = productId => {
    return {type: DELETE_FROM_CART, pid : productId}
}
export const resetState = () => {
    return { type: RESET_STATE }
};