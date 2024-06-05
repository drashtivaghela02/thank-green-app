import { ImageBackground, StyleSheet, Text, View } from "react-native"
import Colors from "../../Constant/Colors";

const CouponHome = () => {
  return (
    <ImageBackground source={{ uri: "https://static.gostor.com/images/images/apply-coupon.png" }} resizeMode="stretch" style={styles.coupon}>
      <View style={styles.textContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={styles.text}>code: </Text>
          <Text style={styles.text}>Description </Text>
        </View>
        <Text style={styles.textTNC}>T&C</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  coupon: {
    height: 70,
    width: '100%',
    flex: 1,
    // padding: 10
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTNC: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.green,
    textDecorationLine: "underline"
  },
})

export default CouponHome;