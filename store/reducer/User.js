import { GET_INFO, UPDATE_INFO } from "../actions/User";

const initialState = {
  data : [],
  name: '',
  email: '',
  contactNo : '',
  imageUrl: '',
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      console.log("user store: ", action)
      return {
        ...state,
        data: action.userdata,
        name: action.name,
        email: action.email,
        contactNo : action.phone_number,
        imageUrl: action.profileImageUrl,
        error: action.error
      }
    case UPDATE_INFO:
      console.log("reducer update info : ",action.data)
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
};