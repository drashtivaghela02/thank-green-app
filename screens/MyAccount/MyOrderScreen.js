import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from "../../Components/UI/CustomHeader";
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import PastOrderScreen from '../Orders/PastOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import * as orderAction from '../../store/actions/Orders';


function CurrentOrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current Order!</Text>
    </View>
  );
}

const PastOrderScreens = () => {
  const [isLoading, setIsLoading] = React.useState(false); // Set an initial value
  const [pastOrders, setPastOrders] = React.useState([]); // State to hold past orders
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.getOrderInfo(accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        setPastOrders(response.data.pastOrders); // Set fetched data to state
        console.log(response.data.pastOrders);
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        console.error("Error fetching user information:", error);
      });
  }, [accessToken]);

  console.log("pastOrders ==>", pastOrders); // Logging pastOrders instead of isLoading

  return (
    <FlatList 
      data={pastOrders} // Passing pastOrders as data
      keyExtractor={item => item.order_number} // Adjust keyExtractor as per your data structure
      renderItem={itemData => 
        <PastOrderScreen
          amount={itemData.item.total_amount}
          order_status={itemData.item.order_status}
          total_quantity={itemData.item.total_quantity}
          delivery_on={itemData.item.delivery_on}
        />
      }
    />
  );
}



const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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
        component={CurrentOrderScreen}
        options={{ tabBarLabel: 'Current Order' }}
      />
      <Tab.Screen
        name="PastOrder"
        component={PastOrderScreens}
        options={{ tabBarLabel: 'Past Order' }}
      />

    </Tab.Navigator>
  );
}

const MyOrderScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  React.useEffect(() => {
    setIsLoading(true);
    dispatch(orderAction.getOrderInfo(accessToken))
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data.pastOrders)
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken]);

  return (
    <NavigationContainer independent={true}>
      <CustomHeader label='My Order' press={() => { props.navigation.goBack() }} />
      <MyTabs />
    </NavigationContainer>
  );
}


export default MyOrderScreen;