import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';
import * as orderAction from '../../store/actions/Orders';
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from '../../Components/UI/CustomHeader';
import CheckoutAddressCard from "./CheckoutAddressCard";
import { RadioButton } from "react-native-paper";
import { Image } from "react-native";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const PlaceOrder = (props) => {
  const orderData = props.route.params.OrderData;
  const SummaryData = props.route.params.SummaryData;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [value, setValue] = useState('card');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } = usePaymentSheet();
  const [loadingPaymentSheet, setLoadingPaymentSheet] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(userAction.getAddress(accessToken))
      .then((response) => {
        setIsLoading(false);
        setAddress(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert("Error fetching user information:", error.message);
      });
  }, [accessToken, isFocused]);

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const initializePaymentSheet = async (data) => {
    const { paymentIntent_client_secret} = data;
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      // customerId: order_id,
      paymentIntentClientSecret: paymentIntent_client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    if (!error) {
  console.log("Payment sheet initialized successfully.");
  const { error: presentError } = await presentPaymentSheet();
  if (presentError) {
    if (presentError.code === "Canceled") {
      console.warn("Payment flow canceled by the user.");
      // Display a user-friendly message or handle the cancellation appropriately
      Alert.alert("Payment Canceled", "You have canceled the payment process.");
    } else {
      console.error("Error presenting payment sheet:", presentError);
      Alert.alert(`Error presenting payment sheet: ${presentError.message}`);
    }
  } else {
    console.log("Payment was successful.");
    Alert.alert("Success", "Payment was successful");
  }
} else {
  console.error("Error initializing payment sheet:", error);
  Alert.alert(`Error initializing payment sheet: ${error.message}`);
}


  };

  const handlePlaceOrder = () => {
    if (selectedAddressId === null) {
      Alert.alert('', 'Please select a delivery address.');
      return;
    }

    if (value === null) {
      Alert.alert('', 'Please select a payment method.');
      return;
    }

    const values = {
      address_id: selectedAddressId,
      products: SummaryData,
      delivery_on: '2024-06-29 09:30:00',
      payment_method: value
    };

    setIsLoading(true);
    dispatch(orderAction.postFinalOrder(values, accessToken))
      .then((response) => {
        setIsLoading(false);
        if (response.statusCode === 200) {
          initializePaymentSheet(response.data);
        }
        else {
          Alert.alert('Error', 'Failed to place order');
        }
      })
      // .catch(error => {
      //   setIsLoading(false);
      //   Alert.alert("Error placing order:", error.message);
      // });
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
            <TouchableOpacity style={styles.paymentOption} onPress={() => props.navigation.navigate("DeliveryTimeScreen")}>
            <EvilIcons name="calendar" size={45} color="black" />
              <Text style={styles.codTitle}>Date Time</Text></TouchableOpacity>
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
              <Text>${orderData ? orderData.sub_total : '00.00'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Charges</Text>
              <Text>${orderData ? orderData.delivery_charges : '00.00'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${orderData ? orderData.total : '00.00'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.verify} onPress={handlePlaceOrder}>
            {isLoading ? <ActivityIndicator /> : <Text style={styles.verifyButton}>PLACE ORDER</Text>}
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
    paddingTop: 5,
    gap: 30
  },
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',

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
    borderRadius: 5,
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
    borderRadius: 5,
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
