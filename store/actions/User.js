import makeApiCall from './../api';
export const GET_INFO = 'GET_INFO';
export const UPDATE_INFO = 'UPDATE_INFO';
export const GET_ADDRESS = 'GET_ADDRESS';
export const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
export const EDIT_ADDRESS = 'EDIT_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const GET_CARD = 'GET_CARD';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';

export const getInfo = (accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/info', 'GET', null, accessToken);
      console.log("getinfo resData", resData);
      dispatch({
        type: GET_INFO,
        userdata: resData?.data[0],
        name: resData?.data[0].name,
        email: resData?.data[0].email,
        phone_number: resData?.data[0].phone_number,
        profileImageUrl: resData?.data[0].profileImageUrl
      });
      return resData;
    } catch (error) {
      console.log("Get Info error", error);
      dispatch({ type: GET_INFO, error: error.message });
    }
  };
};

export const updateInfo = (formData, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/info', 'PUT', formData, accessToken);
      console.log('update info resdata: ', resData);
      dispatch({ type: UPDATE_INFO, data: resData });
      return resData;
    } catch (error) {
      console.error('Error Update Information : ', error);
    }
  };
};

export const getAddress = (accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/address', 'GET', null, accessToken);
      console.log("getAddress resData", resData?.data[0]);
      dispatch({ type: GET_ADDRESS, data: resData?.data[0] });
      return resData;
    } catch (error) {
      console.error("Get Address error", error);
      dispatch({ type: GET_ADDRESS, error: error.message });
    }
  };
};

export const addNewAddress = (values, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/add-address', 'POST', values, accessToken);
      console.log("add new address resData", resData);
      dispatch({ type: ADD_NEW_ADDRESS });
      return resData;
    } catch (error) {
      console.error("add new address error", error);
    }
  };
};

export const editAddress = (id, values, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`userprofile/update-address/${id}`, 'PUT', values, accessToken);
      console.log("edit address resData", resData);
      dispatch({ type: EDIT_ADDRESS });
      return resData;
    } catch (error) {
      console.error("edit address error", error);
    }
  };
};

export const deleteAddress = (addressId, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`userprofile/delete-address/${addressId}`, 'DELETE', null, accessToken);
      console.log("Delete address resData", resData);
      dispatch({ type: DELETE_ADDRESS });
      return resData;
    } catch (error) {
      console.error("Delete Address error", error);
    }
  };
};

export const getCard = (accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/card', 'GET', null, accessToken);
      console.log("getCard resData", resData);
      dispatch({ type: GET_CARD, data: resData });
      return resData;
    } catch (error) {
      console.error("Get Card error", error);
      dispatch({ type: GET_CARD, error: error.message });
    }
  };
};

export const addNewCard = (values, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('userprofile/add-card', 'POST', values, accessToken);
      console.log("add new card resData", resData);
      dispatch({ type: ADD_NEW_CARD });
      return resData;
    } catch (error) {
      console.error("add new card error", error);
    }
  };
};

export const editCard = (id, values, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`userprofile/update-card/${id}`, 'PUT', values, accessToken);
      console.log("edit card resData", resData);
      dispatch({ type: EDIT_CARD });
      return resData;
    } catch (error) {
      console.error("edit card error", error);
    }
  };
};

export const deleteCard = (cardId, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall(`userprofile/delete-card/${cardId}`, 'DELETE', null, accessToken);
      console.log("Delete card resData", resData);
      dispatch({ type: DELETE_CARD });
      return resData;
    } catch (error) {
      console.error("Delete Card error", error);
    }
  };
};
