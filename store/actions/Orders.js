const GET_ORDER_INFO = 'GET_ORDER_INFO';

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