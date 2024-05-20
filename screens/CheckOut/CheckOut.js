import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from '../../Components/UI/CustomHeader';
import CheckoutAddressCard from "./CheckoutAddressCard";
import { RadioButton } from "react-native-paper";

const CheckOut = props => {
  orderData = props.route.params.OrderData;
  SummaryData = props.route.params.SummaryData;
  console.log(orderData);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [value, setValue] = useState();
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
    if (selectedAddressId === null) {
      Alert.alert('Please select a delivery address.');
      return;
    }
    props.navigation.navigate('LocationPicker', { selectedAddressId });
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
              <RadioButton value="Card" color='#2c843e' />
              <Text>Card</Text>
            </View>
            <View style={styles.radio_button}>
              <RadioButton value="COD" color='#2c843e' />
              <Text>Cash or EBT</Text>
            </View>
            </View>
          </RadioButton.Group>
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

export default CheckOut;

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
  radioButtoncontainer : {
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
});
