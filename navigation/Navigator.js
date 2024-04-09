 import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; // Correct import for NavigationContainer
import SignIn from '../Components/Form/SignIn'
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import VerificationCode from '../screens/VerificationCode';
import ForgetPassword from '../screens/ForgetPassword';

const FormStack = createStackNavigator();
const FormNavigator = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name="SignIn" component={SignIn}  options = {{headerShown: false}}/>
    </FormStack.Navigator>
  );
}

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignUp" component={SignUp}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="VerificationCode" component={VerificationCode} options = {{headerShown: false}} />
        <AuthStack.Screen name="FormNavigator" component={FormNavigator}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="Home" component={Home}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} options = {{headerShown: false}} />
      </AuthStack.Navigator>
    </NavigationContainer>
  ); 
};


export default AuthNavigator;
