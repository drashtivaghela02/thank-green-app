import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from "../../Components/UI/CustomHeader";
import RadioGroup, { RadioButton } from 'react-native-paper';
import SortByScreen from './SortByScreen';
import FilterByScreen from './FilterByScreen';
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../store/actions/Products";
import Colors from "../../Constant/Colors";


const Tab = createMaterialTopTabNavigator();

function MyTabs({ data }) {
  return (
    <Tab.Navigator
      initialRouteName="CurrentOrder"
      screenOptions={{
        tabBarActiveTintColor: '#2c843e',
        tabBarInactiveTintColor: '#8b8b8b',
        tabBarLabelStyle: { fontSize: 16, fontWeight: '500' },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { backgroundColor: '#2c843e' },
      }}
    >
      <Tab.Screen
        name="FilterBy"
        component={FilterByScreen}
        options={{ tabBarLabel: 'Filter By' }}
        initialParams={{ resData: data }}
      />
      <Tab.Screen
        name="SortBy"
        component={SortByScreen}
        options={{ tabBarLabel: 'Sort By' }}
        initialParams={{ resData: data }}
      />
    </Tab.Navigator>
  );
}

export default function FilterScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);

  const sortedData = useSelector(state => state?.product)
  console.log("sort data from redux", sortedData)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.showFilter())
      .then((response) => {
        console.log("filter => ", response?.data);
        setResdata(response?.data);
        setPriceRange([response?.data?.priceFilter?.minPrice, response?.data?.priceFilter?.maxPrice])
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, []);
  const handleFilter = () => {

    const filteredItems = {};
    for (const [key, val] of Object.entries(sortedData)) {
      if (val.length > 0) { 
        filteredItems[key] = val;
        console.log("filteritem check", filteredItems, val, key)
      }
      
    }

    props.route.params.onGoBack(filteredItems);
    props.navigation.goBack();
  }

  return (

    <NavigationContainer independent={true}>
      <CustomHeader label='Filter' press={() => { props.navigation.goBack() }} />
      {isLoading
        ? <ActivityIndicator style={{ flex: 1 }} color={Colors.green} size={40} />
        : <MyTabs data={resData} />
      }
      <TouchableOpacity style={styles.verify} onPress={handleFilter}>
        <Text style={styles.verifyButton}>APPLY</Text>
      </TouchableOpacity>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  verify: {
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c843e',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',

  },
  verifyButton: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
})