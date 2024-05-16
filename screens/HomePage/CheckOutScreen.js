import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { useSelector } from "react-redux";
import { useState } from "react";

const CheckOutScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
    // const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
      // console.log(state.cart.items)
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId : key,
                productTitle : state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity : state.cart.items[key].quantity,
                sum : state.cart.items[key].sum 
            });
        }
      console.log(transformedCartItems)
        return transformedCartItems; //.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });


  return (
    <View style={styles.container}>
      <CustomHeader label='Cart' press={() => props.navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.body}>
        {/* <View style={{}}> */}
          <View style={{
            elevation: 8,
            borderRadius: 10,
            backgroundColor: 'white',
            // height: 130,
            width: '100%',
            padding: 10,
          overflow: 'hidden',
            gap: 10
            // alignSelf: 'flex-end',
          }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
              <Text>Sub Total</Text>
              <Text>$00.00</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Deliver Charges</Text>
              <Text>$00.00</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total Amount</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>$00.00</Text>
            </View>
          </View>
        {/* </View> */}

        <View style={{paddingHorizontal: 10}}>
          <TouchableOpacity style={styles.verify} onPress={() => { console.log('Pressed'); }}>
            <Text style={styles.verifyButton}>CHECKOUT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verify1} onPress={() => { console.log('Pressed'); }}>
            <Text style={styles.verifyButton1}>Continue Shopping</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f1f0f5',
    // width: '100%'
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

export default CheckOutScreen;