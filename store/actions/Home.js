import makeApiCall from './../api'; 

const HOME = 'HOME';

export const getHome = (past,reco,accessToken) => {
  return async (dispatch) => {
    try {
      const resData = await makeApiCall('home', 'GET', null, accessToken, {
        categoryPage: 1,
        pastOrdersPage: past,
        recommendedProductsPage: reco,
      });

      console.log("get Home resData", resData);
      dispatch({ type: HOME, data: resData });
      return resData;
    } catch (error) {
      console.error("Get Home error", error);
    }
  };
};

export const getBannerProducts = (id, page, accessToken) => {
  return async (dispatch) => {
    try {
      const resData = await makeApiCall(`home/banner/${id}`, 'GET', null, accessToken,{page});

      console.log("get Banner resData", resData);
      dispatch({ type: HOME, data: resData });
      return resData;
    } catch (error) {
      console.error("Get banner error", error);
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
