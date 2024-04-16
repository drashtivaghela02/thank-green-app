import { LOGIN, LOGINCONTACT, LOGINEMAIL, RESENDOTP, SIGNUP, VERIFYOTP } from '../actions/Auth';

const initialState = {
  signUpData: null, // Initial state for signed up data
  source: null,
  otpVerificationStatus: null, // Initial state for OTP verification status
  status:null,
  msg: null,
  statusCode: null,
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGINEMAIL:
      return {
        ...state,
        token: action.token,
        status: action.resData,
        msg: action.msg,
        statusCode: action.statusCode,
      };
    case LOGINCONTACT:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        status:action.status,
        msg: action.msg,
        statusCode: action.statusCode,
      };
    case SIGNUP:
      return {
        ...state,
        source: action.source,
        signUpData: action.values,
        otpID: action.resData
      };
    case VERIFYOTP:
      return {
        ...state,
        status:action.status,
        msg: action.msg,
        statusCode: action.statusCode,
        otpVerificationStatus: action.otpVerificationStatus
      }
    case RESENDOTP:
      return {
        ...state,
        status:action.status,
        msg: action.msg,
        statusCode:action.statusCode
      }
    default:
      return state;
  }
};
