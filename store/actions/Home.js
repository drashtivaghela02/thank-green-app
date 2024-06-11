import makeApiCall from './../api'; 

const HOME = 'HOME';

export const getHome = (accessToken) => {
  return async (dispatch) => {
    try {
      const resData = await makeApiCall('home', 'GET', null, accessToken, {
        categoryPage: 1,
        pastOrdersPage: 1,
        recommendedProductsPage: 1,
      });

      console.log("get Home resData", resData);
      dispatch({ type: HOME, data: resData });
      return resData;
    } catch (error) {
      console.error("Get Home error", error);
    }
  };
};

export const getReferral = (accessToken) => {
  return async (dispatch) => {
    try {
      const resData = await makeApiCall('home/referral', 'GET', null, accessToken);

      console.log("get referral resData", resData);
      dispatch({ type: HOME, data: resData });
      return resData;
    } catch (error) {
      console.error("Get referral error", error);
    }
  };
};
