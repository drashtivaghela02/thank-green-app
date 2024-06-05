const GET_ORDER_INFO = 'GET_ORDER_INFO';
const GET_ORDER_DETAILS_INFO = 'GET_ORDER_DETAILS_INFO';
const POST_ORDER = 'POST_ORDER';
const RATE_ORDER = 'RATE_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';
const TRACK_ORDER = 'TRACK_ORDER';
const REPORT_ISSUE = 'REPORT_ISSUE';

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
console.log("aabuisfhqhfea;jsd;j",orderId, accessToken);
  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/orders/${orderId}`,
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
      // console.log("get orders details resData", resData);
      dispatch({ type: GET_ORDER_DETAILS_INFO, data: resData });
      return resData;
    } catch (error) {
      console.error("Get orders details error", error);
    }
  };
};


export const postOrder = (value, accessToken) => {
console.log("Post orders value",value, accessToken)
  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/order-summary?products=${JSON.stringify(value)} `,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      console.log("Post orders resData", value);

      const resData = await response.json();
      console.log("Post orders resData", resData);
      dispatch({ type: POST_ORDER, payload : resData });
      return resData;
    } catch (error) {
      console.error("Post orders error", error);
    }
  };
};

export const postFinalOrder = (value, accessToken) => {
  console.log("Post final orders value",value)
    return async dispatch => {
      try {
        const response = await fetch('https://thankgreen.onrender.com/api/checkout',
          {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              address_id: value.address_id,
              delivery_on: value.delivery_on,
              payment_method: value.payment_method,
              products: value.products,
              use_referral_bonus: false
          })
          }
        );
        const resData = await response.json();
        console.log("Post orders resData", resData);
        dispatch({ type: POST_ORDER });
        return resData;
      } catch (error) {
        console.error("Post orders error", error);
        // Optionally dispatch an action to update the state with the error
        dispatch({ type: POST_ORDER, error: error.message });
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


export const cancelOrder = (value, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/cancel-order',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: value.orderId,
            reason: value.reason,
        })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to rate order');
      }
      const resData = await response.json();
      // console.log("Rate orders resData", resData);
      dispatch({ type: CANCEL_ORDER, data: resData });
      return resData;
    } catch (error) {
      console.error("Cancel orders error", error);
      // Optionally dispatch an action to update the state with the error
    }
  };
};

export const reportIssue = (value, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/report-issue',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: value.orderId,
            issue: value.reason,
        })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to report issue');
      }
      const resData = await response.json();
      // console.log("Rate orders resData", resData);
      dispatch({ type: REPORT_ISSUE, data: resData });
      return resData;
    } catch (error) {
      console.error("Report issue error", error);
      // Optionally dispatch an action to update the state with the error
    }
  };
};


export const trackInfo = (orderId, accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/track-order/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch track info');
      }
      const resData = await response.json();
      console.log("get track resData", resData);
      dispatch({ type: TRACK_ORDER, data: resData });
      return resData;
    } catch (error) {
      console.error("Get track error", error);
    }
  };
};

export const getCouponInfo = (productList, accessToken) => {
  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/coupons/?productId=${productList}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      const resData = await response.json();
      console.log("get Couppon info", resData);
      return resData;
    } catch (error) {
      console.error("Get Couppon info error", error);
    }
  }
}
export const getCouponTnC = (couponId) => {
  return async dispatch => {
  try {
    const response = await fetch(`api/coupons/t&c/${couponId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      }
    );
    const resData = await response.json();
    console.log("get Couppon info", resData);
    return resData;
  } catch (error) {
    console.error("Get Couppon info error", error);
  }
} }

export const applyCoupon = (productList, couponCode) => {
  return async dispatch => {
    try {
      const response = await fetch(`api/coupons/apply?products=${productList}&code=${couponCode}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      const resData = await response.json();
      console.log("get Couppon info", resData);
      return resData;
    } catch (error) {
      console.error("Get Couppon info error", error);
    }
  } 
}