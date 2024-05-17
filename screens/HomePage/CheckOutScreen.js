import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartProduct from "../../Components/UI/CartProduct";
import * as cartItem from '../../store/actions/Cart'

const CheckOutScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.items)
  console.log("redux item:  ufhsi",cartItems)
  const transformedCartItems = [];
  for (const key in cartItems) {
    transformedCartItems.push({ 
      productId: key,
      productData: cartItems[key].productData,
      productPrice: cartItems[key].productPrice,
      quantity: cartItems[key].quantity,
      sum: cartItems[key].sum
    });
  }
  console.log("cart products :", transformedCartItems)
  // return transformedCartItems; //.sort((a,b) => a.productId > b.productId ? 1 : -1);



  return (
    <View style={styles.container}>
      <CustomHeader label='Cart' press={() => props.navigation.goBack()} />
      <ScrollView contentContainerStyle={{
        // flex:1,
        flexGrow: 1
        // minHeight: Dimensions.get('window').height * 0.763
      }}>
        <View style={styles.body}>
          <View>
            <Text>Products</Text>
            <FlatList
              data={transformedCartItems}
              keyExtractor={(item) => item?.productId}
              renderItem={itemData =>
                <CartProduct
                  param={itemData?.item}
                  // onSelect={onProductSelectHandler}
                  onRemoveItem={()=> {dispatch(cartItem.removeFromCart(itemData?.item?.productId))}}
                  onDeleteItem={() => { dispatch(cartItem.deleteFromCart(itemData?.item?.productId)) }}
                />
              }
              scrollEnabled={false}
            />

          </View>
          <View>

            <View style={{
              elevation: 8,
              borderRadius: 5,
              backgroundColor: 'white',
              // height: 130,
              width: '100%',
              padding: 15,
              overflow: 'hidden',
              gap: 20
              // alignSelf: 'flex-end',
            }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text>Sub Total</Text>
                <Text>$00.00</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Deliver Charges</Text>
                <Text>$00.00</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total Amount</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$00.00</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
              <TouchableOpacity style={styles.verify} onPress={() => { console.log('Pressed'); }}>
                <Text style={styles.verifyButton}>CHECKOUT</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.verify1} onPress={() => { console.log('Pressed'); }}>
                <Text style={styles.verifyButton1}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>

          </View>
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
    backgroundColor: 'white',
    // width: '100%'
    // marginTop: 20,
    paddingBottom: 0
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