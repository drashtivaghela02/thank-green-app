import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../Constant/Colors";
import moment from "moment";
const CouponHome = ({ param, onShowTerms }) => {
  console.log("coupon data coming", param)
  const date = param?.expiry_date
  return (
    <View style={{flex:1, paddingLeft: 15}}>

    <ImageBackground source={{ uri: "https://static.gostor.com/images/images/apply-coupon.png" }} resizeMode="stretch" style={styles.coupon}>
      <View style={styles.textContainer}>
        <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.code}>{ param?.code}</Text>
            <Text style={styles.text}>{param?.description} </Text>
            <Text style={styles.validity}>Valid untill {moment(date).format("MMMM Do YYYY")}{" "} </Text>
          </View>
          <TouchableOpacity onPress={onShowTerms}>
          
            <Text style={styles.textTNC}>T&C</Text>
            </TouchableOpacity>
      </View>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  coupon: {
    height: 80,
    // alignItems: 'center',
    // marginRight: 10,
    width: Dimensions.get('window').width*0.85,
    // flex: 1,
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
  validity: {
    textAlign: 'center',
    color: '#666'
  },
  code: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e4c5e',

  },
  textTNC: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.green,
    textDecorationLine: "underline"
  },
})

export default CouponHome;