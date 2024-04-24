const GET_INFO = 'GET_INFO';


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
      const resData = await response.json();
      console.log("getinfo resData", resData?.data[0]);
      dispatch({ type: GET_INFO, data: resData?.data[0] });
      return resData;
    } catch (error) {
      console.error("Get Info error", error);
    }
  };
};