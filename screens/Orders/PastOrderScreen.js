import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";


const PastOrderScreen = (amount) => {
 console.log("ARE you sure? ",amount)
  return (
    <View style={{ flex: 1, justifyContent: 'center',margin: 20 }}>
      <Text style={styles.statusTitle}>{amount.delivery_on}</Text>
      <TouchableOpacity useForeground style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 8 }}>
        {/* {pastOrders ? */}
          {/* <MaterialCommunityIcons name="timer-settings-outline" size={30} color="#888" style={{ padding: 5 }} /> */}
          {/* : */}
          <AntDesign name="checkcircle" size={24} color="#2c843e" style={{ padding: 6 }} />
        {/* } */}
        <View style={styles.product}>
          <View style={styles.detail}>
            <View>
              <Text style={styles.title}>Order Number : </Text>
              <Text style={styles.title}>Order Itens : </Text>
              <Text style={styles.title}>Total Amount : </Text>
            </View>
            <View>
              <Text style={styles.price}>{amount.order_number}</Text>
              <Text style={styles.price}>{amount.total_quantity} items</Text>
              <Text style={styles.price}>${amount.amount}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.orderStatus}>
            <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: 'black' }}></View>
            <Text style={styles.statusTitle}>{amount.order_status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PastOrderScreen;

const styles = StyleSheet.create({
  product: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 130,
    width: '88%',
    // margin: 20,
    overflow: 'hidden',
    alignSelf: 'flex-end'
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    gap: 50
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingHorizontal: 20,
    gap: 15
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500'
  },
  statusTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500'
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    color: '#888',
  },

})