const GET_CATEGORY = 'GET_CATEGORY';
const GET_SUB_CATEGORY = 'GET_SUB_CATEGORY';
const GET_PRODUCTS = 'GET_PRODUCTS';

export const getCategory = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/shop/category?page=1',
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
      dispatch({type: GET_CATEGORY, payload: {
        categories: resData.data
      }});
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
      dispatch({type: GET_SUB_CATEGORY,});
      return resData;
    } catch (error) {
      console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};

export const getProducts = (id, accessToken) => {

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
      dispatch({type: GET_PRODUCTS, payload: {products: resData.data}});
      return resData;
    } catch (error) {
      // console.error("Get category Info error", error);
      // Optionally dispatch an action to update the state with the error
      // dispatch({ type: GET_INFO, error: error.message });
    }
  };
};