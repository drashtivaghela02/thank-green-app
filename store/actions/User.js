const GET_INFO = 'GET_INFO';
const UPDATE_INFO = 'UPDATE_INFO';
const GET_ADDRESS = 'GET_ADDRESS';
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
const EDIT_ADDRESS = 'EDIT_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';


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

export const getAddress = (accessToken) => {

  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/userprofile/address',
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
      console.log("getAddress resData", resData?.data[0]);
      dispatch({ type: GET_ADDRESS, data: resData?.data[0] });
      return resData;
    } catch (error) {
      console.error("Get Info error", error);
      // Optionally dispatch an action to update the state with the error
      dispatch({ type: GET_ADDRESS, error: error.message });
    }
  };
  
};



export const addNewAddress = (values, accessToken) => {

  return async dispatch => {
    try {
      console.log('sdfugy', values);
      const response = await fetch('https://thankgreen.onrender.com/api/userprofile/add-address',

        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address_type: values.address_type,
            address: values.address,
            landmark: values.landmark,
            zip_code: values.zip_code,
            latitude: values.latitude,
            longitude: values.longitude,
          })
        }
      );
      const resData = await response.json();
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
      // console.log('edit', values);
      const response = await fetch(`https://thankgreen.onrender.com/api/userprofile/update-address/${id}`,

        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address_type: values.address_type,
            address: values.address,
            landmark: values.landmark,
            zip_code: values.zip_code,
            latitude: values.latitude,
            longitude: values.longitude,
          })
        }
      );
      const resData = await response.json();
      console.log("edit address resData", resData);
      dispatch({ type: EDIT_ADDRESS });
      return resData;
    } catch (error) {
      console.error("edit address error", error);
    }
  };
};



export const deleteAddress = (addressId, accessToken) => {
console.log("action a data:  >>>>>>", addressId, accessToken)
  return async dispatch => {
    try {
      console.log('sdfugy', addressId);
      const response = await fetch(`https://thankgreen.onrender.com/api/userprofile/delete-address/${addressId}`,

        {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
         
        }
      );
      const resData = await response.json();
      console.log("Delete address resData", resData);
      dispatch({ type: DELETE_ADDRESS });
      return resData;
    } catch (error) {
      console.error("Sign up error", error);
    }
  };
};