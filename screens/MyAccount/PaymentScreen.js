import { Text } from "react-native";
import { StyleSheet, View } from "react-native"

const PaymentScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Payment Screen</Text>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PaymentScreen;