// // --------------- LIBRARIES ---------------
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
// // --------------- ASSETS ---------------
import rootReducer from './slices';
import rootSaga from './sagas';
import { useDispatch, useSelector } from 'react-redux';
// // Root reducer with persist config
const reducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['Auth', 'Location'],
  },
  rootReducer,
);
// Middlewares setup
const sagaMiddleware = createSagaMiddleware();
const middlewares = [];
if (__DEV__) {
  middlewares.push(sagaMiddleware, logger); // With logger
} else {
  middlewares.push(sagaMiddleware); // without logger
}
export const Store = configureStore({
  reducer: reducers,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
// // PersistStore contains all the data from store ----->>>>>
export const Persistor = persistStore(Store);
sagaMiddleware.run(rootSaga); // Run Saga
