const GET_CATEGORY = 'GET_CATEGORY';
const GET_SUB_CATEGORY = 'GET_SUB_CATEGORY';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCTS_FROM_SUB_CAT = 'GET_PRODUCTS_FROM_SUB_CAT';
export const SORT_BY = 'SORT_BY';
export const FILTER_BY = 'FILTER_BY';
export const SEARCH = 'SEARCH';

export const getCategory = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/shop/category',
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const resData = await response.json();
      console.log("get category info resData", resData);
      dispatch({
        type: GET_CATEGORY, payload: {
          categories: resData.data
        }
      });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};



export const getProductsFromCategory = (id, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/products/category/${id}?page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const resData = await response.json();
      console.log("get category info resData", resData);
      dispatch({ type: GET_SUB_CATEGORY, });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};
export const getSubCategory = (id, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/sub-category/${id}?page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const resData = await response.json();
      console.log("get category info resData", resData);
      dispatch({ type: GET_SUB_CATEGORY, });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};

export const getProductsFromSubCat = (id, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/products/subCategory/${id}?page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      // if (!response.ok) {
      //   throw new Error('Failed to fetch user info');
      // }
      const resData = await response.json();
      console.log("get category info resData", resData);
      dispatch({ type: GET_PRODUCTS_FROM_SUB_CAT });
      return resData;
    } catch (error) {
      // console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};

export const getProducts = (id, accessToken) => {
  console.log("get products ", id, accessToken)
  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/product/${id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      // if (!response.ok) {
      //   throw new Error('Failed to fetch user info');
      // }
      const resData = await response.json();
      console.log("get category info resData", resData);
      dispatch({
        type: GET_PRODUCTS,
        payload: { products: resData.data }
      });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_PRODUCTS, error: error.message });
    }
  };
};


export const search = (id, accessToken) => {
  console.log("get products ", id, accessToken)
  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/search?searchText=${id}&page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      const resData = await response.json();
      console.log("get search info search bar", resData);
      dispatch({
        type: SEARCH,
        payload: { products: resData.data }
      });
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_PRODUCTS, error: error.message });
    }
  };
};


export const showFilter = () => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/show-filter?page=1`,
        {
          method: 'GET',
        }
      );
      const resData = await response.json();
      console.log("Show Filter", resData);
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
      const response = await fetch(`https://thankgreen.onrender.com/api/shop/filter?page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
          body: JSON.stringify(value)
        }
      );
      const resData = await response.json();
      console.log("Apply Filter", resData);
      return resData;
    } catch (error) {
      console.error("Apply Filter Error", error);
    }
  };
};

export const SortBy = (sorted) => {
  console.log("actio sort by", sorted)
  return { type: SORT_BY, SortBy: sorted };
}
export const FilterBy = (filtered) => {
  return { type: FILTER_BY, FilterBy: filtered };
}