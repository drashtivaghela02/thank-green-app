import { Text } from "react-native";
import { StyleSheet, View } from "react-native"

const MyOrderScreen = props => {
  return (
    <View style={styles.container}>
      <Text>My orders Screen</Text>
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

export default MyOrderScreen;