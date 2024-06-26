import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { store } from "../store";

export const SIGNUP = 'SIGNUP';
export const LOGINEMAIL = 'LOGINEMAIL';
export const LOGINCONTACT = 'LOGINCONTACT';
export const VERIFYOTP = 'VERIFYOTP';
export const RESENDOTP = 'RESENDOTP';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOAD_STATE = 'LOAD_STATE';
export const SIGNOUT = 'SIGNOUT';
export const SET_LOADING = 'SET_LOADING';
export const GET_ACCESSTOKEN = 'GET_ACCESSTOKEN';
export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN'

export const google_signin = () => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/google', 'GET');
      console.log("Google resData", resData);
    } catch (error) {
      console.error("Google error", error);
      // Alert.alert('Error', error.message);
    }
  };
};

export const signup = (values, signupData) => {
  return async dispatch => {
    try {
      console.log('sdfugy', values);
      const response = await fetch('https://thankgreen.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData)
        }
      );
      const resData = await response.json();
      console.log("Signup resData", resData);
      if (resData.status == 'success') {
        dispatch({ type: SIGNUP, signup: values, otpId: resData.data.otpId });
      }
      return resData;
    } catch (error) {
      // console.error("Sign up error", error);
      console.log("Sign up error", error);

    }
  };
};


export const verifyOTP = (values) => {
  return async dispatch => {
    try {
      console.log("verify otp values ", values);
      const response = await fetch('https://thankgreen.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: values,
      });

      // if (!response.ok) {
      //   const errorResponse = await response.json();
      //   throw new Error(errorResponse.message || 'Failed to verify OTP');
      // }

      const resData = await response.json();
      console.log('otpVerify resData', resData);

      dispatch({ type: VERIFYOTP, resData });
      return resData;
    } catch (error) {
      // console.error('Verify OTP error:', error);
      console.log('Resend OTP error:', error);

      if (error.message === 'Network request failed') {
        throw new Error('Network request failed. Please check your internet connection.');
      }
      throw error;
    }
  };
};



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
      dispatch({
        type: LOGINEMAIL,
        status: resData.status,
        accessToken: resData.data.accessToken,
        refreshToken: resData.data.refreshToken,
      });
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
      // console.error('Resend OTP error:', error);
      console.log('Resend OTP error:', error);

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

export const accessTokenGenerate = (contact, password) => {
  return async dispatch => {
    const response = await fetch('https://thankgreen.onrender.com/api/auth/store-device-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deviceToken: contact
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
      console.log('Resend OTP error:', error);

      // console.error("change password error", error)
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
      // console.error('Error loading state from AsyncStorage:', error);
      console.log('Error loading state from AsyncStorage:', error);

    }
  };
};

export const signOut = () => {
  return { type: SIGNOUT };
}

export const resetPassword = (password, resetToken) => {
  return async dispatch => {
    try {
      console.log("verify otp values ", password, resetToken);
      const response = await fetch(`https://thankgreen.onrender.com/api/auth/reset-password/${resetToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: password
        }),
      });

      const resData = await response.json();
      console.log('new password reset', resData);

      return resData;
    } catch (error) {
      console.log('new password reset:', error);
      // console.error('new password reset:', error);

      if (error.message === 'Network request failed') {
        throw new Error('Network request failed. Please check your internet connection.');
      }
      throw error;
    }
  };
};

export const forgetPassword = (email) => {
  return async dispatch => {
    try {
      console.log("forgetPassword values ", email);
      const response = await fetch(`https://thankgreen.onrender.com/api/auth/reset-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });

      const resData = await response.json();
      console.log('forgetPassword resData', resData);

      return resData;
    } catch (error) {
      // console.error('forgetPassword error:', error);
      console.log('forgetPassword error:', error);

      if (error.message === 'Network request failed') {
        throw new Error('Network request failed. Please check your internet connection.');
      }
      throw error;
    }
  };
};

export const refreshAccessToken = async () => {
  const refreshToken = store.getState();
  console.log('refreshtyuruyrtu', refreshToken.auth.accessToken)

  return async dispatch => {
    try {
      const response = await fetch(`https://thankgreen.onrender.com/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshToken.auth.accessToken}),
      });

      console.log("refreshing aasdsgildh",response)
      if (!response.ok) {
        Alert.alert('Failed to refresh token', "You have to Sign in again");
      }
      const resData = await response.json();
      dispatch({
        type: GET_ACCESSTOKEN,
        accessToken: resData.data.accessToken,
      });
      return resData.accessToken;
    } catch (error) {
      console.log('Error refreshing access token:', error);
      throw error;
    }
  }
};

