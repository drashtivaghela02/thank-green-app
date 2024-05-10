import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

function FilterByScreen() {
  return (
    <View style={styles.body}>
      <Text>Categories</Text>
      <ScrollView>
        <Image />
        <Text></Text>
      </ScrollView>
      <TouchableOpacity style={styles.verify} onPress={() => { console.log('Pressed'); }}>
            <Text style={styles.verifyButton}>APPLY</Text>
          </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    // backgroundColor: '#f1f0f5',
    // marginTop: 20,
    marginBottom: 30
  },
  verify: {
    marginTop: 10,
    // marginBottom: 60,
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
    fontWeight: '500'
  },
})


export default FilterByScreen;