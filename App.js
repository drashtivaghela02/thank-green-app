import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './navigation/Navigator'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import authReducer, { loadInitialState, saveStateMiddleware } from './store/reducer/Auth';
import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import userReducer from './store/reducer/User';
import productReducer from './store/reducer/Products';
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product : productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, saveStateMiddleware));
export default function App() {

  useEffect(() => {
    store.dispatch(loadInitialState());
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={store} >
      <AuthNavigator />
      <FlashMessage position="bottom" />
      <StatusBar style="auto" />

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});