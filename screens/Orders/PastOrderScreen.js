import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";


const PastOrderScreen = (param) => {
  data = param.param
  console.log("ARE you sure? ", data)
  const sheetRef = useRef(null);

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text style={styles.statusTitle}>{data.delivery_on}</Text>
      <TouchableOpacity useForeground style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        {data.order_status === 'delivery'
          ? <AntDesign name="checkcircle" size={24} color="#2c843e" style={{ padding: 6 }} />
          :
          < MaterialCommunityIcons name="timer-settings-outline" size={30} color="#888" style={{ padding: 5 }} />
        }
        <View style={styles.product}>
          <View style={styles.detail}>
            <View>
              <Text style={styles.title}>Order Number : </Text>
              <Text style={styles.title}>Order Itens : </Text>
              <Text style={styles.title}>Total Amount : </Text>
            </View>
            <View>
              <Text style={styles.price}>{data.order_number}</Text>
              <Text style={styles.price}>{data.total_quantity} items</Text>
              <Text style={styles.price}>${data.total_amount}</Text>
            </View>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.orderStatus}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: '#2c843e' },
                data.order_status == 'shipped' && { backgroundColor: '#fc7634' },
                data.order_status == 'placed' && { backgroundColor: '#FFF20D' },
                data.order_status == 'packed' && { backgroundColor: '#1e486c' },
              ]}>
              </View>
              <Text style={styles.statusTitle}>{data.order_status}</Text>
            </View>
            <View style={styles.orderStatus}>
              {data.order_status === 'delivery'
                &&
                (<TouchableOpacity onPress={() => { sheetRef.current.open() }}>
                  <Text style={styles.RateOrderText}>Rate Order</Text>
                </TouchableOpacity>)}


            </View>
          </View>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={sheetRef}
        customStyles={{ container: styles.sheet }}
        height={510}
        draggable={true}
        dragOnContent={true}
        closeDuration={350}
      >
        <View style={styles.sheetContent}>

          <Text style={styles.title}>Rate Your Order</Text>

          <TouchableOpacity onPress={() => sheetRef.current.close()}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>RATE ORDER</Text>
            </View>
          </TouchableOpacity>

        </View>
      </RBSheet>
    </View>

  );
}

export default PastOrderScreen;

const styles = StyleSheet.create({

  sheet: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
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
  RateOrderText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
    color: '#2c843e'

  },
  statusIndicator: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: '#888'
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    color: '#888',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2c843e',
    borderColor: '#2c843e',
},
btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
},

})