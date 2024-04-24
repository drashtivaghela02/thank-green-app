import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import LocationPicker from "../../Components/Location/LocationPicker";

const SavedAddressScreen = props => {
  return (
    <View style={styles.container}>
      <CustomHeader label='Saved Address' />
      <LocationPicker />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});

export default SavedAddressScreen;