import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <CustomHeader label='Cart' />

      <View style={styles.body}>
        <View style = {{elevation: 2, overflow: 'hidden' }}>
        <View style={{borderColor: 'white', borderRadius: 20, padding: 20, gap: 10, }}>
          
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text>Order Dtae : </Text>
          <Text>$00.00</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text>Order Number : </Text>
          <Text>$00.00</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{fontWeight:'bold'}}>Order Status</Text>
          <Text style={{fontWeight:'bold'}}>$00.00</Text>
        </View>
        </View>
        </View>
      
        <View>
          <TouchableOpacity style={styles.verify} onPress={() => { console.log('Pressed'); }}>
            <Text style={styles.verifyButton}>TRACK ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verify1} onPress={() => { console.log('Pressed'); }}>
            <Text style={styles.verifyButton1}>Cancel Order</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.17
  },
  heading: {
    fontWeight: '500',
    fontSize: 30,

    color: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#f1f0f5',
    // marginTop: 20,
    // marginBottom: 30
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#b4b4b4',
    paddingVertical: 20
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


  verify1: {
    marginTop: 10,
    // marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton1: {
    color: '#2c843e',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
});

export default OrderDetails;