import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from '../../Components/UI/CustomHeader';
import CheckoutAddressCard from "./CheckoutAddressCard";
import { RadioButton } from "react-native-paper";
import { Image } from "react-native";
import * as orderAction from '../../store/actions/Orders';

const PlaceOrder = props => {
  orderData = props.route.params.OrderData;
  SummaryData = props.route.params.SummaryData;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [value, setValue] = useState('card');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(userAction.getAddress(accessToken))
      .then((response) => {
        setIsLoading(false);
        setAddress(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert("Error fetching user information:", error);
      });
  }, [accessToken, isFocused]);

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handlePlaceOrder = () => {
    const values = {
      address_id: selectedAddressId,
      products: SummaryData,
      delivery_on: '2024-06-29 09:30:00',
      payment_method: 'cod'
  }
    if (selectedAddressId === null) {
      Alert.alert('Please select a delivery address.');
      return;
    }
    else if (value === null) {
      Alert.alert('Please select a value .');
      return;
    }
    else{
    console.log("Final checkout", values);
    setIsLoading(true);
    dispatch(orderAction.postFinalOrder(values, accessToken))
      .then((response) => {
        console.log("Success fully placed order", response);
        // Alert(response.msg, 'It may take some time to reflect order detalis...')
        setIsLoading(false);
        if (response.statusCode === 200) {
          props.navigation.navigate("CheckOutIntent")
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });}
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Checkout' press={() => { props.navigation.goBack() }} />
      <View style={styles.body}>
        <View>
          <Text style={styles.headingTitle}>Delivery Address</Text>
          <View style={{ paddingVertical: 10 }}>
            <FlatList
              data={address}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              horizontal={true}
              renderItem={({ item }) =>
                <CheckoutAddressCard
                  param={item}
                  selected={item.id === selectedAddressId}
                  onPress={() => handleAddressSelect(item.id)}
                />}
            />
          </View>

          <View>
            <Text style={styles.headingTitle}>Schedule Delivery</Text>
          </View>

          <View>
            <Text style={styles.headingTitle}>Payment Method</Text>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
              <View style={styles.radioButtoncontainer} >
                <View style={styles.radio_button}>
                  <RadioButton value="card" color='#2c843e' />
                  <Text>Card</Text>
                </View>
                <View style={styles.radio_button}>
                  <RadioButton value="cod" color='#2c843e' />
                  <Text>Cash or EBT</Text>
                </View>
              </View>
            </RadioButton.Group>
            {value === 'cod' && (<View style={styles.paymentOption}>
              <Image source={require('../../assets/Cash-PNG-File.png')} style={{ height: 65, width: 65 }} />
              <Text style={styles.codTitle}>Cash on Delivery</Text></View>)}
            {value === 'card' && (<View style={styles.paymentOption}>                                                             
              <Image source={require('../../assets/card.png')} style={{ height: 65, width: 65 }} />
              <Text style={styles.codTitle}>Card Payment</Text></View>)}
          </View>
        </View>

        <View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text>Sub Total</Text>
              <Text>${orderData ? orderData?.sub_total : '00.00'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Charges</Text>
              <Text>${orderData ? orderData?.delivery_charges : '00.00'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${orderData ? orderData?.total : '00.00'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.verify} onPress={handlePlaceOrder}>
            <Text style={styles.verifyButton}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  radioButtoncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 30
  },
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10
  },
  headingTitle: {
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 10
  },
  codTitle: {
    fontWeight: '400',
    fontSize: 20,
    color: '#888'
  },

  summaryContainer: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 15,
    gap: 20,
    marginTop: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  verify: {
    justifyContent: 'flex-end',
    marginVertical: 20,
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
  paymentOption: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.90,
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});
