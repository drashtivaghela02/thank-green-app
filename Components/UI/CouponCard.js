// CouponCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const CouponCard = ({ param, onApply, onShowTerms, NotApplyable }) => {
  const data = param
  console.log("Coupon data in card ", data);
  return (
    // <View style={styles.card}>
    <View style={{ flex: 1, paddingLeft: 10 }}>

      <ImageBackground source={{ uri: "https://static.gostor.com/images/images/apply-coupon.png" }} resizeMode="stretch" style={styles.coupon}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',width: '100%', paddingHorizontal: 30 }}>
          <View style={{ alignItems: 'flex-start' }}>

            {/* <View> */}
            <Text style={styles.code}>{data?.code}</Text>
            <Text style={{ fontSize: 13 }}>{data?.description}</Text>
            {/* </View> */}
            <TouchableOpacity style={styles.button} onPress={onShowTerms}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>T&C</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.applybutton} disabled={NotApplyable} onPress={onApply}>
            <Text style={[styles.buttonText, NotApplyable && styles.disabledText]}>Apply</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  // card: {
  //   padding: 20,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  //   elevation: 5,
  //   alignItems: 'center',
  //   marginVertical: 10,
  // },
  code: {
    fontWeight: 'bold',

    color: '#1e4c5e',

  },
  coupon: {
    height: 80,
    justifyContent: 'center',
    // width: '100%',
    // flex: 1,
    // padding: 10
    
    // marginBottom: 10,

  },

  button: {
    // margin: 10,
    // marginRight: 0,

    // paddingLeft: 30,
    // right: -10
    // borderRadius: 5,
    // width: '80%',
    // alignItems: 'center',
  }, applybutton: {
    // margin: 10,
    // marginRight: 0,

    // paddingLeft: 30,
    right: -10
    // borderRadius: 5,
    // width: '80%',
    // alignItems: 'center',
  },
  buttonText: {
    color: '#2c843e',
    fontSize: 16,
    fontWeight: '500',
    // paddingLeft: 5
  },
  disabledText: {
    color: '#888',
  },
});

export default CouponCard;
