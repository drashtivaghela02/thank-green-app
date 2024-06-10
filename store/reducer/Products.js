import { ADD_TO_FAVORITES, FILTER_BY, REMOVE_FROM_FAVORITES, SET_INITIAL_FAVORITES, SORT_BY } from '../actions/Products';

const initialState = {
    deliveryTimeFilter: [],
    priceOrderFilter: [],
    categoryFilter: [],
    priceFilter: [],
    favoriteProductIds: []
};
0
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_BY:
            console.log("Reduc data for sort", action)
            const delivery = action.SortBy.deliveryTimeFilter ? action.SortBy.deliveryTimeFilter : ''
            let deliveryTime = {};
            deliveryTime.start = delivery.split(' ')[0]
            deliveryTime.end = delivery.split(' ')[3]
            const priceOrder = action.SortBy.priceOrderFilter
            return {
                ...state,
                deliveryTimeFilter: deliveryTime,
                priceOrderFilter: priceOrder
            }
        case FILTER_BY:
            console.log("Reduc data for filter", action)
            let price = {}
            const category = action.FilterBy.categoryFilter
            const prices = action.FilterBy.priceFilter
            price.min = prices[0]
            price.max = prices[1]
            console.log("Reduc data for filter", price)

            return {
                ...state,
                categoryFilter: category,
                priceFilter: price
            }
        case SET_INITIAL_FAVORITES:
            const favoriteProductIds = action.favoriteProducts.map(product => product.product_id);
            console.log("reducer favasd",favoriteProductIds)
            return {
                ...state,
                favoriteProductIds: favoriteProductIds
            };
        case ADD_TO_FAVORITES:
            console.log("reducer add to fav",state)
        
            return {
                ...state,
                favoriteProductIds: [...state.favoriteProductIds, action.productId]
            };
        case REMOVE_FROM_FAVORITES:
            console.log("reducer favasd",state.favoriteProductIds)

            return {
                ...state,
                favoriteProductIds: state.favoriteProductIds.filter(product => product.product_id !== action.productId)
            };
        default:
            // console.log("Unrecognized action:", action);

            return state;
    }
};


export default productReducer;


