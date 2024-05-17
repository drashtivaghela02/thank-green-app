
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_FROM_CART = 'DELETE_FROM_CART'

export const addToCart = product => {
    return {type : ADD_TO_CART, product : product };
}

export const removeFromCart = productID => {
    return {type : REMOVE_ITEM, pid : productID}
}

export const deleteFromCart = productId => {
    return {type: DELETE_FROM_CART, pid : productId}
}
