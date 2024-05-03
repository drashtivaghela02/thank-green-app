const GET_ORDER_INFO = 'GET_ORDER_INFO';
const GET_ORDER_DETAILS_INFO = 'GET_ORDER_DETAILS_INFO';
const RATE_ORDER = 'RATE_ORDER';

export const getOrderInfo = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/orders',
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
      console.log("get orders resData", resData);
      dispatch({ type: GET_ORDER_INFO, data: resData });
      return resData;
    } catch (error) {
      console.error("Get orders error", error);
      // Optionally dispatch an action to update the state with the error
      dispatch({ type: GET_ORDER_INFO, error: error.message });
    }
  };
};

export const getOrderDetailsInfo = (orderId, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/orders/:${orderId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch DATA');
      }
      const resData = await response.json();
      console.log("get orders details resData", resData);
      dispatch({ type: GET_ORDER_DETAILS_INFO, data: resData });
      return resData;
    } catch (error) {
      console.error("Get orders details error", error);
    }
  };
};


export const rateOrder = (value, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/rate-order',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: value.order_id,
            rating: value.rating,
            feedback: value.feedback
        })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to rate order');
      }
      const resData = await response.json();
      // console.log("Rate orders resData", resData);
      dispatch({ type: RATE_ORDER, data: resData });
      return resData;
    } catch (error) {
      console.error("Rate orders error", error);
      // Optionally dispatch an action to update the state with the error
      dispatch({ type: RATE_ORDER, error: error.message });
    }
  };
};