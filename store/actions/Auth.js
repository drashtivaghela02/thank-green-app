import { Alert } from "react-native";

export const SIGNUP = 'SIGNUP';
export const LOGINEMAIL = 'LOGINEMAIL';
export const LOGINCONTACT = 'LOGINCONTACT';
export const VERIFYOTP = 'VERIFYOTP';
export const RESENDOTP = 'RESENDOTP';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOAD_STATE = 'LOAD_STATE';
export const SIGNOUT = 'SIGNOUT';
export const SET_LOADING = 'SET_LOADING';
export const signup = (values) => {

  return async dispatch => {
    try {
      console.log('sdfugy', values);
      const response = await fetch('https://thankgreen.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber,
            password: values.password,
            confirmPassword: values.confirmPassword,
          })
        }
      );
      const resData = await response.json();
      console.log("Signup resData", resData);
      dispatch({ type: SIGNUP, signup: values, otpId: resData.data.otpId });
      return resData;
    } catch (error) {
      console.error("Sign up error", error);
    }
  };
};


export const verifyOTP = (values) => {

  return async dispatch => {
    // try {
    console.log("verify otp values ", values);
    const response = await fetch('https://thankgreen.onrender.com/api/auth/verify-otp', {
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const resData = await response.json();
    console.log('otpVerify resData', resData);
    dispatch({ type: VERIFYOTP, resData: resData })
    return resData;
  };

}


export const resendOTP = (otpId) => {
  console.log(otpId)
  return async (dispatch) => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otpId: otpId }),
      });

      console.log("resend response : ", response);
      const resData = await response.json();
      console.log("res data resend: ", resData);
      dispatch({ type: RESENDOTP, resData: resData });
      if (resData.status === 'error') {
        Alert.alert('Alert', resData.msg, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      }
      else if (resData.status === 'success') {
        Alert.alert('Success!', resData.msg)
      }
      return resData;
    } catch (error) {
      console.error('Resend OTP error:', error);
      // Handle error, dispatch an action if needed ex. resend again
    }
  };
};


export const loginEmail = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const resData = await response.json();
      console.log("Login email response data", resData);

      if (resData.status === 'error' || resData.error) {
        return resData;
      }

      dispatch({
        type: LOGINEMAIL,
        status: resData.status,
        accessToken: resData.data.accessToken,
        refreshToken: resData.data.refreshToken,
        password: password
      });
      return resData;

    } catch (error) {
      Alert.alert('Alert', error, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
      // console.error("login error", error)
    }
  };
};


export const loginContact = (contact, password) => {
  return async dispatch => {
    const response = await fetch('https://thankgreen.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: contact,
          password: password
        })
      }
    );

    const resData = await response.json();
    console.log("Login Contact response data", resData);

    if (resData.status === 'error' || resData.error) {
      return resData;
    }

    dispatch({
      type: LOGINCONTACT,
      status: resData.status,
      accessToken: resData.data.accessToken,
      refreshToken: resData.data.refreshToken,
      password: password
    });
    return resData;
  };
};

export const changePassword = (value, accessToken) => {
  return async dispatch => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/auth/change-password',
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldPassword: value.oldPassword,
            newPassword: value.newPassword,
            confirmNewPassword: value.newCPassword
          })
        }
      );
      const resData = await response.json();
      console.log("response change data", resData);
      if (resData.status === 'error' || resData.error) {
        return resData;
      }

      dispatch({ type: CHANGE_PASSWORD, password: value.newPassword });
      return resData;

    } catch (error) {
      console.error("change password error", error)
    }
  };
};




export const loadInitialState = () => {
  return async (dispatch) => {
    try {
      const serializedState = await AsyncStorage.getItem('reduxState');
      if (serializedState !== null) {
        const state = JSON.parse(serializedState);
        dispatch({ type: LOAD_STATE, state });
      }
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      console.error('Error loading state from AsyncStorage:', error);
    }
  };
};

export const signOut = () => {
  return {type : SIGNOUT};
}