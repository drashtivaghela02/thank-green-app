import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const CartIcon = (props) => {
  const cartItems = useSelector(state => state?.cart?.items)
  const cartCount = cartItems ? Object.keys(cartItems).length : 0;
  console.log("count for cartitems ",cartItems)
  return (
    <View>
      <MaterialCommunityIcons name="cart-variant" size={28} color='white' onPress={props.press} />
      {cartItems && cartCount > 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            {cartCount}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#f2ac35',
    width: 16,
    height: 16,
    borderRadius: 15 / 2,
    right: -4,
    top: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    fontSize: 10,
    fontWeight: 'bold'
  }
})
export default CartIcon;