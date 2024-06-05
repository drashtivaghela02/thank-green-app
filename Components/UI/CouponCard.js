// CouponCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const CouponCard = ({ onApply, onShowTerms }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: "https://static.gostor.com/images/images/apply-coupon.png" }} resizeMode="contain" style={styles.coupon}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center', paddingVertical: 13, paddingLeft: 20 }}>
          <View>
            <Text>Code : Description</Text>
            <TouchableOpacity style={styles.button} onPress={onShowTerms}>
              <Text style={styles.buttonText}>T&C</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.applybutton} onPress={onApply}>
            <Text style={styles.buttonText}>Apply</Text>
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
  coupon: {
    height: 70,
    alignItems: 'center'
    // width: '100%',
    // flex: 1,
    // padding: 10
  },

  button: {
    // margin: 10,
    // marginRight: 0,

    // paddingLeft: 30,
    // right: -10
    // borderRadius: 5,
    // width: '80%',
    // alignItems: 'center',
  },  applybutton: {
    margin: 10,
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
    paddingLeft: 5
  },
});

export default CouponCard;
