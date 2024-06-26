import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions, NavigationContainer, StackActions } from '@react-navigation/native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Fontisto, AntDesign, Feather, Entypo } from '@expo/vector-icons';

import { ActivityIndicator, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import CustomHeader from '../Components/UI/CustomHeader';

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
// import MyOrderScreen from '../screens/MyAccount/MyOrderScreen';
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
import FilterScreen from '../screens/Shop/FilterScreen';
import LocationPicker from '../Components/Location/LocationPicker';
import Map from '../Components/Location/Map';
import OrderDetails from '../screens/Orders/OrderDetails';
import CancelOrder from '../screens/Orders/CancelOrder';
import TrackOrder from '../screens/Orders/TrackOrder';
import ReportIssue from '../screens/Orders/ReportIssue';
import CurrentOrder from '../screens/Orders/CurrentOrder';
import PastOrder from '../screens/Orders/PastOrder';
import NotificationScreen from '../screens/Home/NotificationScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDrawer from '../Components/Drawer/CustomDrawer';
import ProductsListing from '../screens/Shop/ProductsListing';
import ProductDescription from '../screens/Shop/ProductDescription';
import PlaceOrder from '../screens/CheckOut/PlaceOrder';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialState } from '../store/actions/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckOutIntent from '../screens/CheckOut/CheckOutIntent';
import CustomIntent from '../screens/CheckOut/CustomIntent';
import DeliveryTimeScreen from '../screens/CheckOut/DeliveryTimeScreen';
import CategoryProducts from '../screens/Shop/CategoryProducts';
import BannerScreen from '../screens/Home/BannerScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import { Linking } from 'react-native';
// import WebViewScreen from '../Components/Form/WebViewScreen';


const FormStack = createStackNavigator();
const FormNavigator = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      {/* <FormStack.Screen name="WebViewScreen" component={WebViewScreen} options={{ headerShown: false }} /> */}
    </FormStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

const linking = {
  prefixes: ['exp://192.168.1.7:8081/--/'],
  config: {
    screens: {

      ResetPassword: "ResetPassword/:resetToken"
    },
  },
};

const AuthNavigator = () => {

  const authState = useSelector(state => state.auth.accessToken);
  const isLoading = useSelector(state => state.auth.isLoading);

  // const accessToken = useSelector((state) => state.accessToken);
  // console.log("navigator", authState)

  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('reduxState');
        if (storedAccessToken) {
          dispatch(loadInitialState(storedAccessToken));
          console.log("navigator", storedAccessToken.auth.accessToken)
        }
        else {
          console.log("No access token available")
        }
      } catch (error) {
        // console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={50} color={Colors.green} />
    </View>);
  }

  return (
    <NavigationContainer linking={linking}>
      <AuthStack.Navigator >
        {(authState)
          ?
          <AuthStack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
          :
          (
            <AuthStack.Screen name="auth" component={AuthState} options={{ headerShown: false }} />
          )
        }
        {/* <AuthStack.Screen name="FormNavigator1" component={FormNavigator} options={{ headerShown: false }} /> */}
        {/* <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} /> */}

        <AuthStack.Screen name='ReferAFriends' component={ReferAFriendScreen} options={{ headerShown: false, }} />
        <AuthStack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <AuthStack.Screen name='LocationPicker' component={LocationPicker} options={{ headerShown: false }} />
        <AuthStack.Screen name='TrackOrder' component={TrackOrder} options={{ headerShown: false }} />
        <AuthStack.Screen name='ProductDescription' component={ProductDescription} options={{ headerShown: false }} />
        <AuthStack.Screen name='PlaceOrder' component={PlaceOrder} options={{ headerShown: false }} />
        <AuthStack.Screen name='OrderDetails' component={OrderDetails} options={{ headerShown: false }} />

        <AuthStack.Screen name='CheckOutIntent' component={CheckOutIntent} options={{ headerShown: false }} />
        <AuthStack.Screen name='CustomIntent' component={CustomIntent} options={{ headerShown: false }} />
        <AuthStack.Screen name='DeliveryTimeScreen' component={DeliveryTimeScreen} options={{ headerShown: false }} />


      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
const AuthStateStack = createStackNavigator();

const AuthState = () => {
  return (
    <AuthStateStack.Navigator>

      <AuthStateStack.Screen name="FormNavigator" component={FormNavigator} options={{ headerShown: false }} />
      <AuthStateStack.Screen name="VerificationCode" component={VerificationCode} options={{ headerShown: false }} />
      <AuthStateStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <AuthStateStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
      <AuthStateStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <AuthStateStack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
    </AuthStateStack.Navigator>)
}

const LocationStack = createStackNavigator();
const LocationScreen = () => {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen name='SavedAddresses' component={SavedAddressScreen} options={{ headerShown: false }} />
      {/* (location picker + Map) screen in auth navigator */}
    </LocationStack.Navigator>
  )
}


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        swipeEnabled: false,
        drawerStyle: {
          width: Dimensions.get('window').width * 0.85,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name='HomeDrawer' component={TabsNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}


const HomeStack = createStackNavigator();
const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="HomeSearch" component={SearchScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='Filters' component={FilterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='CategoryList' component={CategoryList} options={{ headerShown: false }} />
      <HomeStack.Screen name='ProductsListing' component={ProductsListing} options={{ headerShown: false }} />
      <HomeStack.Screen name='CategoryProducts' component={CategoryProducts} options={{ headerShown: false }} />
      <HomeStack.Screen name='BannerScreen' component={BannerScreen} options={{ headerShown: false }} />

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
      <ShopCategory.Screen name='ProductsListing' component={ProductsListing} options={{ headerShown: false }} />
      {/* <ShopCategory.Screen name='ProductDescription' component={ProductDescription} options={{ headerShown: false }} /> */}
      <ShopCategory.Screen name='Filters' component={FilterScreen} options={{ headerShown: false }} />

    </ShopCategory.Navigator>
  )
}

const ContactUs = createStackNavigator();
const ContactUsScreens = () => {
  return (
    <ContactUs.Navigator>
      <ContactUs.Screen name='Contact' component={ContactUsScreen} options={{ headerShown: false }} />
      <ContactUs.Screen name='FAQ' component={FAQScreen} options={{ headerShown: false }} />
    </ContactUs.Navigator>
  )
}

const OrderTopTabBar = createMaterialTopTabNavigator();
const Tabs = () => {
  return (
    <OrderTopTabBar.Navigator
      initialRouteName="CurrentOrder"
      screenOptions={{
        tabBarActiveTintColor: '#2c843e',
        tabBarInactiveTintColor: '#8b8b8b',
        tabBarLabelStyle: { fontSize: 16, fontWeight: '500' },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { backgroundColor: '#2c843e' },
      }}
    >
      <OrderTopTabBar.Screen
        name="CurrentOrder"
        component={CurrentOrder}
        options={{ tabBarLabel: 'Current Order' }}
      />
      <OrderTopTabBar.Screen
        name="PastOrder"
        component={PastOrder}
        options={{ tabBarLabel: 'Past Order' }}
      />

    </OrderTopTabBar.Navigator>
  );
}

const OrderStack = createStackNavigator();
export const OrdersScreens = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        header: (props) => (
          <CustomHeader
            label="My Order"
            press={() => props.navigation.goBack()}
          />
        )
      }}
    >
      <OrderStack.Screen name='MyOrderScreens' component={Tabs} />
      <OrderStack.Screen name='OrderDetails' component={OrderDetails} options={{ headerShown: false }} />
      <OrderStack.Screen name='CancelOrder' component={CancelOrder} options={{ headerShown: false }} />
      <OrderStack.Screen name='ReportIssue' component={ReportIssue} options={{ headerShown: false }} />
    </OrderStack.Navigator>
  )
}

const MyAccountStack = createStackNavigator();
const MyAccountScreen = () => {
  return (
    <MyAccountStack.Navigator>
      <MyAccountStack.Screen name='MyAccountScreen' component={MyAccount} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Personal Information' component={PersonalInformationScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='SavedAddress' component={LocationScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Payment' component={PaymentDetailScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='MyOrders' component={OrdersScreens} options={{ headerShown: false }} />
      {/* <MyAccountStack.Screen name='OrderDetail' component={OrderDetails} options={{ headerShown: false }} /> */}
      <MyAccountStack.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='FAQ' component={FAQScreen} options={{ headerShown: false }} />
      <MyAccountStack.Screen name='Logout' component={LogoutScreen} options={{ headerShown: false }} />
    </MyAccountStack.Navigator>
  )
}

const BottomTab = createMaterialBottomTabNavigator();
const TabsNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const HandleLogout = (props) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'auth' }
        ],
      })
    );
    console.log('logout');
  };
  const authState = useSelector(state => state.auth.accessToken);
  return (
    <BottomTab.Navigator
      // shifting={true}
      activeColor={Colors.green}
      inactiveColor='#AFAFAF'
      barStyle={{ backgroundColor: 'white' }}
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
        name="ContactUS"
        component={ContactUsScreens}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="help" size={26} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyAccount"
        component={authState ? MyAccountScreen : HandleLogout}
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
