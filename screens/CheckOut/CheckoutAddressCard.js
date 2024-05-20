import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";

const CheckoutAddressCard = ({ param, selected, onPress }) => {
  const data = param;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, selected && styles.selectedCard]}>
      <View style={[styles.detail, { gap: 15 }]}>
        <View>
          <Image source={require('../../assets/location-pin.png')} style={{ height: 40, width: 15 }} />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.title}>{data.address_type} {data.landmark ? '- ' + data.landmark : ''}</Text>
          <Text style={[styles.subTitle, { fontSize: 12 }]}>{data.address}, {data.zip_code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutAddressCard;

const styles = StyleSheet.create({
  card: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.80,
    padding: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: 5
  },
  selectedCard: {
    borderColor: '#2c843e',
    borderWidth: 2
  },
  detail: {
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  }
});
