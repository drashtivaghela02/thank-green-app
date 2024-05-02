import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <CustomHeader label='Order Details' />

      <View style={styles.body}>


        <View style={styles.card}>
          <View style={styles.detail}>
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>Order Date : </Text>
              <Text style={styles.title}>Order Number : </Text>
              <Text style={styles.title}>Order Status</Text>
            </View>

            <View style={{gap: 8}}>
              <Text style={styles.subTitle}>18th March 2020</Text>
              <Text style={styles.subTitle}>406-7288</Text>
              <Text style={styles.subTitle}>Order Delivered</Text>

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

  body: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#f1f0f5',
    // marginBottom: 30
  },

  card: {
    elevation: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 110,
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center'
    
  },
  title: {
    fontWeight: '500',
    fontSize: 15
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#888'
  },
  detail: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    gap: 10
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