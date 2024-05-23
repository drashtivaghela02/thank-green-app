import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGINCONTACT,
  LOGINEMAIL,
  RESENDOTP,
  SIGNUP,
  VERIFYOTP,
  CHANGE_PASSWORD,
  LOAD_STATE,
  SIGNOUT
} from '../actions/Auth';

const initialState = {
  signUpData: null, 
  otpVerificationStatus: null, 
  status:null,
  accessToken: null,
  refreshToken: null,

};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATE:
      return {
        ...state,
        ...action.state.auth // Merge the loaded state into the current state
      };
    case LOGINEMAIL:
      console.log("heya",action)
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        status: action.status,
      };
    case LOGINCONTACT:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        status: action.status,
      };
    case SIGNUP:
      return {
        ...state,
        signUpData: action.signup,
        otpID: action.otpId
      };
    case VERIFYOTP:
      return {
        ...state,
        otpVerificationStatus: action.resData.status
      }
    case RESENDOTP:
      return {
        ...state,
        otpVerificationStatus: action.resData.status
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password,
      } 
    case SIGNOUT: 
      return {
        signUpData: null, 
        otpVerificationStatus: null, 
        status:null,
        accessToken: null,
        refreshToken: null,
      }
    default:
      return state;
  }
};


// AsyncStorage


export const loadInitialState = () => {
  return async (dispatch) => {
    try {
      const serializedState = await AsyncStorage.getItem('reduxState');
      if (serializedState !== null) {
        const state = JSON.parse(serializedState);
        console.log('Data in async storage: ',state);
        dispatch({ type: 'LOAD_STATE', state });
      }
      else {
        console.log('Data not found in async storage')
      }
    } catch (error) {
      console.error('Error loading state from AsyncStorage:', error);
    }
  };
};

// Middleware to save state to AsyncStorage whenever it changes
export const saveStateMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state);
    console.log("reducer state of async",serializedState);
    AsyncStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('Error saving state to AsyncStorage:', error);
  }
  return result;
};