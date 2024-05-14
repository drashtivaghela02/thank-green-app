const HOME = 'HOME'

export const getHome = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/home/?categoryPage=1&pastOrdersPage=1&recommendedProductsPage=1',
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch Home info');
      }
      const resData = await response.json();
      console.log("get Home resData", resData);
      dispatch({ type: HOME, data: resData });
      return resData;
    } catch (error) {
      console.error("Get Home error", error);
      // // Optionally dispatch an action to update the state with the error
      // dispatch({ type: HOME, error: error.message });
    }
  };
};
