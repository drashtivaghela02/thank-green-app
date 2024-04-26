const GET_INFO = 'GET_INFO';
const UPDATE_INFO = 'UPDATE_INFO';



export const getInfo = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/userprofile/info',
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
      console.log("getinfo resData", resData?.data[0]);
      dispatch({ type: GET_INFO, data: resData?.data[0] });
      return resData;
    } catch (error) {
      console.error("Get Info error", error);
      // Optionally dispatch an action to update the state with the error
      dispatch({ type: GET_INFO, error: error.message });
    }
  };
};

export const updateInfo = (formData, accessToken) => {
  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/userprofile/info',
        {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'multipart/form-data',
          }
        });
        const resData = await response.json();
        console.log('update info resdata: ', resData);
        dispatch({ type: UPDATE_INFO, data: resData })
        return resData;
    } catch (error) {
      console.error('Error UPdate Information : ', error);
    }
  }
}