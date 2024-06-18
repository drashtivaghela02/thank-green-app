import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView } from "react-native";
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
import * as cartItem from '../../store/actions/Cart'


const PlaceOrder = (props) => {
  const orderData = props.route.params.OrderData;
  const SummaryData = props.route.params.SummaryData;
  const useReferralBonus = props.route.params.useReferral;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [value, setValue] = useState('card');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const accessToken = useSelector(state => state.auth.accessToken);
  const [time, setTime] = useState('   -');
  const [date, setDate] = useState('   -');
  const [APIDate, setAPIDate] = useState('');
  const [orderId, setOrderId] = useState('')
  const [details, setDetails] = useState();

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


  const handleSuccess = (id) => {
    console.log("testtesttesting", id)
    setIsLoading(true);
    dispatch(orderAction.getOrderDetailsInfo(id, accessToken))
      .then((response) => {
        if (response.status === 'success') {
          Alert.alert("", response.msg)
        }
        setDetails(response.data);
        console.log("order details getting", response);
        setIsLoading(false);
        props.navigation.navigate('OrderDetails', { Id: id, Details: response, order: true })
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information ewftwe:", error);
      });

    dispatch(cartItem.resetState())

  }


  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const initializePaymentSheet = async (data) => {
    const { paymentIntent_client_secret } = data;
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
        Alert.alert("Success", "Payment was successful", [{ text: 'cancel', style: 'cancel' }, { text: 'Ok', onPress: () => handleSuccess(orderId) }]);
      }
    } else {
      console.error("Error initializing payment sheet:", error);
      Alert.alert(`Error initializing payment sheet: ${error.message}`);
    }

    // props.navigation.navigate('OrderDetailsCheckout')
    // dispatch(cartItem.resetState())
  };

  const pickOnDeliveryTimeHandler = () => {
    props.navigation.navigate('DeliveryTimeScreen', {
      onGoBack: (time, date) => {
        setTime(time);
        setDate(`${date.split(' ')[3]} ${date.split(' ')[1]} ${date.split(' ')[2]}`);
        setAPIDate(`${date.split(' ')[7]} ${time.split(' ')[2]}`)
        console.log("Delivery time final ", `${date.split(' ')[7]} ${time.split(' ')[2]}`);
      },
    });
  }

  const handlePlaceOrder = () => {
    if (selectedAddressId === null) {
      Alert.alert('', 'Please select a delivery address.');
      return;
    }

    if (value === null) {
      Alert.alert('', 'Please select a payment method.');
      return;
    }

    if (APIDate === null) {
      Alert.alert('', 'Please select a Delivery Time.');
      return;
    }

    const values = {
      address_id: selectedAddressId,
      products: SummaryData,
      delivery_on: APIDate,
      payment_method: value,
      use_referral_bonus: useReferralBonus
    };

    setIsLoading(true);
    dispatch(orderAction.postFinalOrder(values, accessToken))
      .then((response) => {
        setIsLoading(false);
        if (response.statusCode === 200) {
          setOrderId(response.data.order_id)
          if (value === 'card') { initializePaymentSheet(response.data); }


          else {
            Alert.alert("Success", "Order successful", [{ text: 'cancel', style: 'cancel' }, { text: 'Ok', onPress: () => handleSuccess(response.data.order_id) }]);
          }
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
      <ScrollView contentContainerStyle={styles.body}>
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
            <TouchableOpacity style={styles.paymentOption}
              onPress={pickOnDeliveryTimeHandler
                // () => props.navigation.navigate("DeliveryTimeScreen")
              }>
              <EvilIcons name="calendar" size={45} color="black" />
              <View>
                <Text style={styles.timeTitle}>Date</Text>
                <Text>{date}</Text>
              </View>
              <View>
                <Text>Time</Text>
                <Text>{time}</Text>
              </View>
            </TouchableOpacity>
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
                  <RadioButton value="COD" color='#2c843e' />
                  <Text>Cash or EBT</Text>
                </View>
              </View>
            </RadioButton.Group>
            {value === 'COD' && (<View style={styles.paymentOption}>
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
              <Text>Discount Amount</Text>
              <Text>${orderData ? orderData?.discount_amount : '00.00'}</Text>
            </View>
            {orderData?.referral_bonus && useReferralBonus && <View style={styles.summaryRow}>
                <Text>Referral Discount Amount</Text>
                <Text>${orderData ? orderData?.referral_bonus : '00.00'}</Text>
              </View>}
            <View style={styles.summaryRow}>
              <Text>Delivery Charges</Text>
              <Text>${orderData ? orderData.delivery_charges : '00.00'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${(orderData?.referral_bonus && useReferralBonus) ? orderData?.total - orderData?.referral_bonus : orderData?.total}</Text> 
            </View>
          </View>

          <TouchableOpacity style={styles.verify} onPress={handlePlaceOrder}>
            {isLoading ? <ActivityIndicator color='white' size={26} /> : <Text style={styles.verifyButton}>PLACE ORDER</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
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
    paddingTop: 5
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
    borderRadius: 5,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.90,
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  timeTitle: {

  }
});
