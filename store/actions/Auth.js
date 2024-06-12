import { Alert } from "react-native";
import makeApiCall from './../api';

export const SIGNUP = 'SIGNUP';
export const LOGINEMAIL = 'LOGINEMAIL';
export const LOGINCONTACT = 'LOGINCONTACT';
export const VERIFYOTP = 'VERIFYOTP';
export const RESENDOTP = 'RESENDOTP';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOAD_STATE = 'LOAD_STATE';
export const SIGNOUT = 'SIGNOUT';
export const SET_LOADING = 'SET_LOADING';
export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN'

export const google_signin = () => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/google', 'GET');
      console.log("Google resData", resData);
    } catch (error) {
      console.error("Google error", error);
      Alert.alert('Error', error.message);
    }
  };
};

export const signup = (values) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/signup', 'POST', values);
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
    try {
      const resData = await makeApiCall('auth/verify-otp', 'POST', values, null, { 'Content-Type': 'multipart/form-data' });
      console.log('otpVerify resData', resData);
      dispatch({ type: VERIFYOTP, resData: resData })
      return resData;
    } catch (error) {
      console.error("Verify OTP error", error);
    }
  };
};

export const resendOTP = (otpId) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/resend-otp', 'POST', { otpId: otpId }, null, { 'Content-Type': 'application/json' });
      console.log("Resend OTP resData", resData);
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
      } else if (resData.status === 'success') {
        Alert.alert('Success!', resData.msg)
      }
      return resData;
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };
};

export const loginEmail = (email, password) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/login', 'POST', { email, password });
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
    }
  };
};

export const loginContact = (contact, password) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/login', 'POST', { phoneNumber: contact, password });
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
    } catch (error) {
      console.error("Login Contact error", error);
    }
  };
};

export const changePassword = (value, accessToken) => {
  return async dispatch => {
    try {
      const resData = await makeApiCall('auth/change-password', 'PUT', value, accessToken);
      console.log("Change Password response data", resData);
      if (resData.status === 'error' || resData.error) {
        return resData;
      }
      dispatch({ type: CHANGE_PASSWORD, password: value.newPassword });
      return resData;
    } catch (error) {
      console.error("Change Password error", error);
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
    }
  };
};

export const signOut = () => {
  return {type : SIGNOUT};
}