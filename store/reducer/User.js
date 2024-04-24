import { GET_INFO } from "../actions/User";

const initialState = {
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      console.log("user store: ", action)
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
};