import { FILTER_BY, SORT_BY } from '../actions/Products';

const initialState = {
    deliveryTimeFilter: [],
    priceOrderFilter: [],
    categoryFilter: [],
    priceFilter: [],
};
0
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_BY:
            console.log("Reduc data for sort", action)
            const delivery = action.SortBy.deliveryTimeFilter ? action.SortBy.deliveryTimeFilter : ''
            let deliveryTime = {};
            deliveryTime.start = delivery.split(' ')[0]
            deliveryTime.end = delivery.split(' ')[2]
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
            price.min = action.FilterBy.priceFilter[0]
            price.max = action.FilterBy.priceFilter[1]
            return {
                ...state,
                categoryFilter: category,
                priceFilter: price
            }
        default:
            // console.log("Unrecognized action:", action);

            return state;
    }
};


export default productReducer;


