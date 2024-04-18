import { Text } from "react-native";
import { StyleSheet, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader";

const FAQScreen = props => {
  return (
    <View style={styles.container} >
      <CustomHeader label='My Order' press={() => { props.navigation.goBack() }} />
      </View>

  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
},
});

export default FAQScreen;