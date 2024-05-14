import { GET_CATEGORY } from '../actions/Products';


// Define your initial state
const initialState = {
    categories: [],
    subCategories: [],
    products: [],
    error: null
};


// Define your reducer function
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        // case 'GET_CATEGORY':
        //     return {
        //         ...state,
        //         categories: action.payload.categories,
        //         error: null
        //     };


        // case 'GET_SUB_CATEGORY':
        //     return {
        //         ...state,
        //         subCategories: action.payload.categories,
        //         error: null
        //     };
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload.products,
                error: null
            };
        case 'GET_CATEGORY_ERROR':
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export default categoryReducer;


