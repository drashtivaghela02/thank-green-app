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
import categoryReducer from './store/reducer/Products';
import cart from './store/reducer/Cart';
import { StripeProvider } from '@stripe/stripe-react-native';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: categoryReducer,
  cart: cart
});

const store = createStore(rootReducer, applyMiddleware(thunk, saveStateMiddleware,logger));
export default function App() {

  useEffect(() => {
    store.dispatch(loadInitialState());
    store.dispatch(loadInitialState());
  }, []);

  const STRIPE_KEY = 'pk_test_51OtpDySFzAljgqh0jL1bAOJvq5AJY5DrBpYBApU1pgCEC7Dfh04icMpLT2MgbGs3iA842eWlSq0xHyqtQwbtTQqQ003jRpIWpE'

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={store} >
      <StripeProvider
        publishableKey={STRIPE_KEY}
      >
        <AuthNavigator />
        <FlashMessage position="bottom" />
      </StripeProvider>
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