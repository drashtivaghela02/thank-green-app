import { Text } from "react-native";
import { StyleSheet, View } from "react-native"

const ChangePasswordScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Change Password Screen</Text>
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

export default ChangePasswordScreen;