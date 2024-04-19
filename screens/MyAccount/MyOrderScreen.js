import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from "../../Components/UI/CustomHeader";


function CurrentOrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current Order!</Text>
    </View>
  );
}

function PastOrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PastOrder!</Text>
    </View>
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
        component={PastOrderScreen}
        options={{ tabBarLabel: 'Past Order' }}
      />

    </Tab.Navigator>
  );
}
export default function MyOrderScreen(props) {
  return (
    <NavigationContainer independent={true}>
      <CustomHeader label='My Order' press={() => { props.navigation.goBack() }} />
      <MyTabs />
    </NavigationContainer>
  );
}
