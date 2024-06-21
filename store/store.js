import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk';
import logger from "redux-logger";

import authReducer, {  saveStateMiddleware } from './reducer/Auth';
import userReducer from './reducer/User';
import productReducer from './reducer/Products';
import cart from './reducer/Cart';
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  cart: cart
});

export const store = createStore(rootReducer, applyMiddleware(thunk, saveStateMiddleware,logger));
export const useAppDispatch = () => store.dispatch();
export const useAppSelector = useSelector;