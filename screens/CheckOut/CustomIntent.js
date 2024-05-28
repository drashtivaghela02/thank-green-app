import { usePaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import { Screen } from "react-native-screens";

export default function CustomIntent(props) {
  const { initPaymentSheet, presentPaymentSheet, } = usePaymentSheet();
  const [loading, setLoading] = useState(false);
  const data = props.route.params.response.data;
  console.log("Data cominmg dsfhlh", data)
  const ephemeralKey = data.order_id;
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  
  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`${API_URL}/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    const { paymentIntent_client_secret, paymentIntent_id} = data
    // const { ephemeralKey, customer } = data
    return {
      paymentIntentClientSecret: paymentIntent_client_secret,
      paymentIntentId: paymentIntent_id,
      // ephemeralKey,
      // customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntentClientSecret,
      paymentIntentId,
      // ephemeralKey,
      // customer,
      // publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: data.order_id,
      customerEphemeralKeySecret: paymentIntentId,
      paymentIntentClientSecret: paymentIntentClientSecret,

      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };


  return (
    <View style={{flex:1, justifyContent: 'center'}}>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}