import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from "../../Components/UI/CustomHeader";
import RadioGroup, { RadioButton } from 'react-native-paper';
import SortByScreen from './SortByScreen';


function FilterByScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current Order!</Text>
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
        name="FilterBy"
        component={FilterByScreen}
        options={{ tabBarLabel: 'Filter By' }}
      />
      <Tab.Screen
        name="SortBy"
        component={SortByScreen}
        options={{ tabBarLabel: 'Sort By' }}
      />

    </Tab.Navigator>
  );
}
export default function FilterScreen(props) {
  return (
    <NavigationContainer independent={true}>
      <CustomHeader label='Filter' press={() => { props.navigation.goBack() }} />
      <MyTabs />
    </NavigationContainer>
  );
}

const styles=  StyleSheet.create({
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
})