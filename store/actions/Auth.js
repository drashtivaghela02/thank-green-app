import { Alert } from "react-native";

export const SIGNUP = 'SIGNUP';
export const LOGINEMAIL = 'LOGINEMAIL';
export const LOGINCONTACT = 'LOGINCONTACT';
export const VERIFYOTP = 'VERIFYOTP';
export const RESENDOTP = 'RESENDOTP';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

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
      console.log("resData", resData);
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
    console.log("response ", response);
    const resData = await response.json();
    console.log('otpVerify', resData);
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
        body: JSON.stringify({ otpId: otpId }), // Send only the otpId
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
      return resData;
    } catch (error) {
      console.error('Resend OTP error:', error);
      // Handle error, dispatch an action if needed ex. resend again
    }
  };
};


export const loginEmail = (email, password) => {
  return async dispatch => {
    try{
    console.log("action values", email, password)
    const response = await fetch('https://thankgreen.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    );
    console.log("login response", response)
    const resData = await response.json();
    console.log("response data", resData);
    dispatch({ type: LOGINEMAIL, status: resData.status, accessToken: resData.data.accessToken, refreshToken: resData.data.refreshToken });
      return resData;
    }
    catch (error) {
      console.error("login error", error)
    }
  };
};


export const loginContact = (contact, password) => {
  return async dispatch => {
    console.log("action contact values", contact, password)
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
    console.log("login response", response)
    const resData = await response.json();
    console.log("response data", resData);
    if (resData.status === 'error' || resData.error) {
      return resData;
    }
    dispatch({ type: LOGINCONTACT, status: resData.status, accessToken: resData.data.accessToken, refreshToken: resData.data.refreshToken });
    return resData;
  };
};

export const changePassword = (value, accessToken) => {
  return async dispatch => {
    try {
      // console.log("action contact values", contact, password)
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
            confirmNewPassword: value.cnewPassword
          })
        }
      );
      console.log("change password", response)
      const resData = await response.json();
      console.log("response change data", resData);
      dispatch({ type: CHANGE_PASSWORD, newPassword: resData });
      return resData;
    } catch (error) {
      console.error("change password error",error)
    }
  };
};