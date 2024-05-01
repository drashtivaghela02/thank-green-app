const GET_ORDER_INFO = 'GET_ORDER_INFO';
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

// export const updateInfo = (formData, accessToken) => {
//   return async dispatch => {
//     try {
//       const response = await fetch('https://thankgreen.onrender.com/api/userprofile/info',
//         {
//           method: 'PUT',
//           body: formData,
//           headers: {
//             'Authorization': 'Bearer ' + accessToken,
//             'Content-Type': 'multipart/form-data',
//           }
//         });
//         const resData = await response.json();
//         console.log('update info resdata: ', resData);
//         dispatch({ type: UPDATE_INFO, data: resData })
//         return resData;
//     } catch (error) {
//       console.error('Error UPdate Information : ', error);
//     }
//   }
// }


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
            order_id: value.order_id,
            rating: value.rating,
            feedback: value.feedback
        })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to rate order');
      }
      const resData = await response.json();
      console.log("Rate orders resData", resData);
      dispatch({ type: RATE_ORDER, data: resData });
      return resData;
    } catch (error) {
      console.error("Rate orders error", error);
      // Optionally dispatch an action to update the state with the error
      dispatch({ type: RATE_ORDER, error: error.message });
    }
  };
};