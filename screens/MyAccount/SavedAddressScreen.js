import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { FlatList } from "react-native-gesture-handler";
import AddressCard from "../../Components/UI/AddressCard";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

const SavedAddressScreen = props => {

  const [isLoading, setIsLoading] = React.useState(false); // Set an initial value
  const [address, setAddress] = React.useState([]); // State to hold past orders
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(userAction.getAddress(accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        setAddress(response.data); // Set fetched data to state
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        Alert.alert("Error fetching user information:", error);
      });
  }, [accessToken]);

  console.log("address ==>", address);

  const editAddressHandler = (data) => {
    console.log("id in main screen", data)
    props.navigation.navigate('LocationPicker', {addressData: data})
  }




  let productPreview;

  if (address.length === 0) {

    productPreview = (<View style={styles.logoContainer} >
      <Image source={require('../../assets/Navigation-pana.png')} style={styles.logo} />
      <Text style={styles.bodyMainText}>No Saved Addresses</Text>
      <Text style={styles.bodyText}>All addresses added will be saveed here.</Text>
      <Text style={styles.bodyText}>In case you want to edit them later.</Text>
    </View>)
  }
  else {
    productPreview = (
      <FlatList
        data={address} // Passing curent order as data
        keyExtractor={item => item.id} // Adjust keyExtractor as per your data structure
        renderItem={itemData =>
          <AddressCard
            param={itemData.item}
            onEdit={editAddressHandler}
          />}
      />
    )
  }

  return (
    <View style={styles.container} >
      <CustomHeader label='Saved Address' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
        {isLoading
          ?
          <ActivityIndicator style={styles.body} color="#2c843e" size={"large"} />
          :
          (<View style={{ flex: 1, paddingTop: 20 }}>{productPreview}</View>)
        }

        <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('LocationPicker') }}>
          <Text style={styles.verifyButton}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 10
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 350,
    height: 350
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#b4b4b4',
    // paddingVertical: 20
  },
  verify: {
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c843e',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '400'

  },


});