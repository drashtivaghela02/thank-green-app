import { GET_INFO, UPDATE_INFO } from "../actions/User";

const initialState = {
  data: "hello", error:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      console.log("user store: ", action)
      return {
        ...state,
        data: action.data || initialState.data,
        error: action.error
      }
    case UPDATE_INFO:
      console.log("reducer update info : ",action.data)
      return {
        ...state
      }
    default:
      return state;
  }
};