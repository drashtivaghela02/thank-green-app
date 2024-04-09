export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const VERIFYOTP = 'VERIFYOTP';

export const signup = (formData) => {

  return async dispatch => {
    const response = await fetch(
      'https://thankgreen.onrender.com/api/auth/signup',
      {
        method: 'POST',
        body: formData
      }
    )
    .then(response => response.json())
    .then(data => {
        if(data.success){
            verifyOTP(data);
        }
    })

    if (!response.ok) {
    //   const errorResData = await response.json();
    //   const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("resData",resData);
    // "resData.otpId": "Otp_A3FF3C5EB6BD4F4F89499034CF7ABEAC", 
    // "resData.password": "$2a$10$O9Qn2HZFBRleS2rNIAsa8eS/zZRNXxMEYe.eYBBEVKTttlSx1nJle"
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};


export const verifyOTP = (data) => {
    return async dispatch => {
      const response = await fetch(
        'https://thankgreen.onrender.com/api/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            otpId: data.otpId,
            otp: data.otp,
            returnSecureToken: true
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        
        throw new Error(message);
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: VERIFYOTP, token: resData.idToken, userId: resData.localId });
    };
  };
  



export const login = (email, phoneNumber, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://thankgreen.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
    //   const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
