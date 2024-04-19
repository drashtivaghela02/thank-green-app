 import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; // Correct import for NavigationContainer
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

import SignIn from '../Components/Form/SignIn'
import SignUp from '../screens/SignUp';
import Home from '../screens/HomePage/Home';
import MyAccount from '../screens/HomePage/MyAccount';
import VerificationCode from '../screens/VerificationCode';
import ForgetPassword from '../screens/ForgetPassword';
import Colors from '../Constant/Colors';
import PersonalInformationScreen from '../screens/MyAccount/PersonalInformationScreen';
import SavedAddressScreen from '../screens/MyAccount/SavedAddressScreen';
import PaymentScreen from '../screens/MyAccount/PaymentScreen';
import MyOrderScreen from '../screens/MyAccount/MyOrderScreen';
import FavoritesScreen from '../screens/MyAccount/FavoritesScreen';
import ReferAFriendScreen from '../screens/MyAccount/ReferAFriendScreen';
import FAQScreen from '../screens/MyAccount/FAQScreen';
import ChangePasswordScreen from '../screens/MyAccount/ChangePasswordScreen';
import LogoutScreen from '../screens/MyAccount/LogoutScreen'
import ContactUsScreen from '../screens/HomePage/ContactUsScreen';
import ShopCategoryScreen from '../screens/HomePage/ShopCategoryScreen';
import AddNewCardDetailsScreen from '../screens/Payment/AddNewCardDetailsScreen';
import CategoryList from '../screens/Shop/CategoryList';
import CheckOutScreen from '../screens/HomePage/CheckOutScreen';

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
        <AuthStack.Screen name="FormNavigator" component={FormNavigator}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="VerificationCode" component={VerificationCode} options = {{headerShown: false}} />
        <AuthStack.Screen name="Home" component={TabsNavigator}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="SignUp" component={SignUp}  options = {{headerShown: false}}/>
        <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} options = {{headerShown: false}} />
      </AuthStack.Navigator>
    </NavigationContainer>
  ); 
};

const HomeStack = createStackNavigator();
const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} options = {{headerShown: false}} />
    </HomeStack.Navigator>
  )
}

const PaymentStack = createStackNavigator();
const PaymentDetailScreen = () => {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen name='PaymentScreen' component={PaymentScreen} options={{ headerShown: false }} />
      <PaymentStack.Screen name='AddNewCard' component={AddNewCardDetailsScreen} options={{ headerShown: false }} />

    </PaymentStack.Navigator>
  )
}
const ShopCategory = createStackNavigator();
const ShopScreens = () => {
  return (
  <ShopCategory.Navigator>
    <ShopCategory.Screen name='ShopCategory' component={ShopCategoryScreen} options={{ headerShown: false }} />
    <ShopCategory.Screen name='CategoryList' component={CategoryList} options={{ headerShown: false }} />
  </ShopCategory.Navigator>
)}
const MyAccountStack = createStackNavigator();
const MyAccountScreen = () => {
  return (
    <MyAccountStack.Navigator>
      <MyAccountStack.Screen name='MyAccountScreen' component={MyAccount} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Personal Information' component={PersonalInformationScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='SavedAddress' component={SavedAddressScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Payment' component={PaymentDetailScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='MyOrders' component={MyOrderScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='ReferAFriends' component={ReferAFriendScreen} options={{ headerShown: false , }} />
      <MyAccountStack.Screen name='FAQ' component={FAQScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Logout' component={LogoutScreen} options={{ headerShown: false }} />
    </MyAccountStack.Navigator>
  )
}

const BottomTab = createMaterialBottomTabNavigator();
const TabsNavigator = () => {
  return (
    <BottomTab.Navigator
      // shifting={true}
      activeColor={Colors.green}
      inactiveColor='#AFAFAF'
      // barStyle={{ backgroundColor: 'white' }}
      
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={26} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Shop"
        component={ShopScreens}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-store" size={26} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="CheckOut"
        component={CheckOutScreen}
        options={{
          tabBarLabel: 'CheckOut',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart-variant" size={26} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Contact"
        component={ContactUsScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="help" size={26} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          tabBarLabel: 'MyAccount',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={26} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
 
  )
}


export default AuthNavigator;
