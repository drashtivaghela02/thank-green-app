import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyOrderScreen from "../screens/MyAccount/MyOrderScreen";
import OrderDetails from "../screens/Orders/OrderDetails";
import PastOrder from "../screens/Orders/PastOrder";
import CurrentOrder from "../screens/Orders/CurrentOrder";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomHeader from "../Components/UI/CustomHeader";
import { Dimensions, View } from "react-native";
import CancelOrder from "../screens/Orders/CancelOrder";
import TrackOrder from "../screens/Orders/TrackOrder";
import ReportIssue from "../screens/Orders/ReportIssue";

const Stack = createStackNavigator();
export const Orders = () => {
  return (
    <NavigationContainer independent={true}>
   <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <CustomHeader
            label="My Order"
            press={() => props.navigation.goBack()}
          />
        ),
        headerStyle: {
          height: Dimensions.get('window').height * 0.17, // Adjust header height
          // You can add more custom styles here
        },
        headerTintColor: 'white', // Customize header text color
        headerTitleStyle: {
          fontWeight: '500', // Customize header title font weight
          fontSize: 30, // Customize header title font size
          // You can add more custom styles here
        },
      }}
    >
      <Stack.Screen name='MyOrderScreens' component={MyTabs} />
        <Stack.Screen name='OrderDetails' component={OrderDetails} options={{ headerShown: false }} />
        <Stack.Screen name='CancelOrder' component={CancelOrder} options={{ headerShown: false }} />
        <Stack.Screen name='TrackOrder' component={TrackOrder} options={{ headerShown: false }} />
        <Stack.Screen name='ReportIssue' component={ReportIssue} options={{ headerShown: false }} />


        
    </Stack.Navigator>
      
    </NavigationContainer>
  )
}


const Tab = createMaterialTopTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CurrentOrder"
      screenOptions={{
        tabBarActiveTintColor: '#2c843e',
        tabBarInactiveTintColor: '#8b8b8b',
        tabBarLabelStyle: { fontSize: 16 , fontWeight: '500'},
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: {backgroundColor: '#2c843e'},
      }}
    >
      <Tab.Screen
        name="CurrentOrder"
        component={CurrentOrder}
        options={{ tabBarLabel: 'Current Order' }}
      />
      <Tab.Screen
        name="PastOrder"
        component={PastOrder}
        options={{ tabBarLabel: 'Past Order' }}
      />

      </Tab.Navigator>
      

  );
}