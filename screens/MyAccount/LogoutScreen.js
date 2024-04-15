import { Text } from "react-native";
import { StyleSheet, View } from "react-native"

const LogoutScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Logout Screen</Text>
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

export default LogoutScreen;