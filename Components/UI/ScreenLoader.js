import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../Constant/Colors";

const ScreenLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={40} color={Colors.green} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ScreenLoader;