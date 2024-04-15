export const SIGNUP = 'SIGNUP';
export const LOGINEMAIL = 'LOGINEMAIL';
export const LOGINCONTACT = 'LOGINCONTACT';
export const VERIFYOTP = 'VERIFYOTP';
export const RESENDOTP = 'RESENDOTP';

export const signup = (formData) => {
  
  return async dispatch => {
    try {
      console.log('sdfugy', formData);
      const response = await fetch('https://thankgreen.onrender.com/api/auth/signup',
        {
          method: 'POST',
          body: formData
        }
      );
      // if (!response.ok) {
      //   // const errorResData = await response.json();
      //   // const errorId = errorResData.error.message;
      //   let message = 'Something went wrong!';
        
      //   throw new Error(message);
      // }
      // console.log(response);
      const resData = await response.json();
      console.log("resData",resData);
      dispatch({ type: SIGNUP, resData});
      
    } catch (error) {
        console.error("Sign up error", error);
    }
  };
};

  
export const verifyOTP = (values) => {

    return async dispatch => {
      // try {
          console.log("verify otp values ",values);
            const response = await fetch('https://thankgreen.onrender.com/api/auth/verify-otp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values),
            });
            console.log("response ",response);
            const resData = await response.json();
            console.log('otpVerify',resData);
            dispatch({type: VERIFYOTP, resData})
    };

}


export const resendOTP = (otpId) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://thankgreen.onrender.com/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otpId }), // Send only the otpId
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }
      console.log("resend response : ",response);
      const resData = await response.json();
      console.log("res data resend: ", resData);
      dispatch({ type: RESENDOTP, resData });
    } catch (error) {
      console.error('Resend OTP error:', error);
      // Handle error, dispatch an action if needed
    }
  };
};


export const loginEmail = (email, password) => {
  return async dispatch => {
    console.log("action values",email, password)
    const response = await fetch('https://thankgreen.onrender.com/api/auth/login',{
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
    console.log("login response",response)
    const resData = await response.json();
    console.log("response data",resData);
    dispatch({ type: LOGINEMAIL, resdata: resData.status, token: resData.idToken, userId: resData.localId });
    return resData;
  };
};
 

export const loginContact = (contact, password) => {
  return async dispatch => {
    console.log("action contact values",contact, password)
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
    console.log("login response",response)
    const resData = await response.json();
    console.log("response data",resData);
    dispatch({ type: LOGINCONTACT, token: resData.idToken, userId: resData.localId });
    return resData;
  };
};