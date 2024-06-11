import makeApiCall from './../api';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_SUB_CATEGORY = 'GET_SUB_CATEGORY';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_FROM_SUB_CAT = 'GET_PRODUCTS_FROM_SUB_CAT';
export const SORT_BY = 'SORT_BY';
export const FILTER_BY = 'FILTER_BY';
export const SEARCH = 'SEARCH';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_INITIAL_FAVORITES = 'SET_INITIAL_FAVORITES';

export const getCategory = (accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('shop/category', 'GET', null, accessToken);
      dispatch({ type: GET_CATEGORY, payload: { categories: resData.data } });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
    }
  };
};

export const getProductsFromCategory = (id,page, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`shop/products/category/${id}`, 'GET', null, accessToken, { page });
      dispatch({ type: GET_SUB_CATEGORY });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
    }
  };
};

export const getSubCategory = (id, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`shop/sub-category/${id}`, 'GET', null, accessToken, { page: 1 });
      dispatch({ type: GET_SUB_CATEGORY });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
    }
  };
};

export const getProductsFromSubCat = (id,page, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`shop/products/subCategory/${id}`, 'GET', null, accessToken, { page});
      dispatch({ type: GET_PRODUCTS_FROM_SUB_CAT });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
    }
  };
};

export const getProducts = (id, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`shop/product/${id}`, 'GET', null, accessToken);
      dispatch({ type: GET_PRODUCTS, payload: { products: resData.data } });
      return resData;
    } catch (error) {
      console.error("Get products Info error", error);
    }
  };
};

export const search = (searchText, page, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('shop/search', 'GET', null, accessToken, { searchText, page });
      dispatch({ type: SEARCH, payload: { products: resData.data } });
      return resData;
    } catch (error) {
      console.error("Search error", error);
    }
  };
};

export const showFilter = () => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('shop/show-filter', 'GET', null, null);
      dispatch({ type: SEARCH });
      return resData;
    } catch (error) {
      console.error("Show Filter Error", error);
    }
  };
};

export const applyFilter = (value, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('shop/filter', 'GET', { value }, accessToken, { page: 1 });
      return resData;
    } catch (error) {
      console.error("Apply Filter Error", error);
    }
  };
};

export const SortBy = (sorted) => {
  return { type: SORT_BY, SortBy: sorted };
};

export const FilterBy = (filtered) => {
  return { type: FILTER_BY, FilterBy: filtered };
};

export const getFavourites = (accessToken, page) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('shop/favoriteProducts', 'GET', null, accessToken, { page });
      dispatch({ type: SET_INITIAL_FAVORITES, favoriteProducts: resData?.data?.favoriteProducts });
      return resData;
    } catch (error) {
      console.error("Get fav prod Info error", error);
    }
  };
};

export const addToFavorites = (productId, accessToken) => {
  return async dispatch => {
    try {
      await makeApiCall(`shop/favoriteProducts/${productId}`, 'POST', null, accessToken);
      dispatch({ type: ADD_TO_FAVORITES, productId });
    } catch (error) {
      console.error("Add to Favorites error", error);
    }
  };
};

export const removeFromFavorites = (productId, accessToken) => {
  return async dispatch => {
    try {
      await makeApiCall(`shop/favoriteProducts/${productId}`, 'DELETE', null, accessToken);
      dispatch({ type: REMOVE_FROM_FAVORITES, productId });
    } catch (error) {
      console.error("Remove from Favorites error", error);
    }
  };
};
