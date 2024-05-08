import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import * as orderAction from '../../store/actions/Orders';


const PastOrderScreen = (param) => {
  data = param.param
  console.log("ARE you sure? ", data)
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const Id = data.order_number
  // data = {
  //   "order_number": 1,
  //   "order_status": 'delivery',
  //   "total_quantity": 2,
  //   "total_amount": 8,
  //   "delivery_on": "2024-04-29 09:30:00",
  //   "payment_method": "online",
  //   "rating": null
  // }

  const sheetRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleRating = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleRateOrder = () => {

    let value = {};
    value.order_id = data.order_number
    value.rating = rating
    value.feedback = feedback

    setError(null);
    setIsLoading(true);
    try {

      dispatch(orderAction.rateOrder(value, accessToken))
        .then(response => {
          if (response.status === 'error') {
            setIsLoading(false)
            Alert.alert("Alert!", response.msg || error)

          }

          if (response.status === "success") {
            setIsLoading(false)
            Alert.alert("Success!", response.msg)
          }
        })
    }
    catch (error) {
      console.error('rste order error!! : ', error)
      setError(error.message);
      setIsLoading(false);
    };

    sheetRef.current.close();
  };



  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text style={styles.statusTitle}>{data.delivery_on}</Text>
      <TouchableOpacity useForeground style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }} onPress={() => param.onSelect(Id)}>
        {data.order_status === 'delivered' || data.order_status === 'cancel'
          ? (data.order_status === 'delivered'
            ? <AntDesign name="checkcircle" size={24} color="#2c843e" style={{ padding: 6 }} />
            : <AntDesign name="checkcircleo" size={24} color="red" style={{ padding: 6 }} />
          )
          : < MaterialCommunityIcons name="timer-settings-outline" size={30} color="#888" style={{ padding: 5 }} />
        }
        <View style={styles.product}>
          <View style={styles.detail}>
            <View>
              <Text style={styles.title}>Order Number : </Text>
              <Text style={styles.title}>Order Items : </Text>
              <Text style={styles.title}>Total Amount : </Text>
            </View>
            <View>
              <Text style={styles.price}>{data.order_number}</Text>
              <Text style={styles.price}>{data.total_quantity} items</Text>
              <Text style={styles.price}>${data.total_amount}</Text>
            </View>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
            <View style={styles.orderStatus}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: '#2c843e' },
                data.order_status == 'shipped' && { backgroundColor: '#fc7634' },
                data.order_status == 'placed' && { backgroundColor: '#FFF20D' },
                data.order_status == 'packed' && { backgroundColor: '#1e486c' },
                data.order_status == 'cancel' && { backgroundColor: 'red' },

              ]}>
              </View>
              <Text style={styles.statusTitle}>Order {data.order_status}</Text>
            </View>
            <View style={styles.orderStatus}>
              {data.order_status === 'delivered' && (
                data.rating === null ? (
                  <TouchableOpacity onPress={() => { sheetRef.current.open() }}>
                    <Text style={styles.RateOrderText}>Rate Order</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <View key={value}>
                        {value <= data.rating ? (
                          <AntDesign name="star" size={24} color="#FFD700" />
                        ) : (
                          <AntDesign name="star" size={24} color="#C0C0C0" />
                        )}
                      </View>
                    ))}
                  </View>
                )
              )}

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

          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/RateOrder.png')} style={styles.logo} />
            <Text style={styles.ratingText}>Rate Your Order</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                  {value <= rating ? (
                    <AntDesign name="star" size={35} color="#FFD700" />
                  ) : (
                    <AntDesign name="star" size={35} color="#C0C0C0" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.feedbackContainer}>
            <TextInput
              style={styles.feedbackInput}
              multiline
              placeholder="Write Comment..."
              value={feedback}
              onChangeText={handleFeedbackChange}
            />
          </View>
          <TouchableOpacity onPress={handleRateOrder}>
            <View style={styles.btn}>
              {isLoading
                ? <ActivityIndicator size="large" color="white" />
                :
                <Text style={styles.btnText}>RATE ORDER</Text>}
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
    // height: 130,
    width: '88%',
    // margin: 20,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 8,
    // paddingHorizontal: 10,
    gap: 50
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingHorizontal: 10,
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
  sheetContent: {
    padding: 24,
    alignItems: 'stretch',
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackContainer: {
    marginVertical: 40,
  },
  feedbackInput: {
    height: 100,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top'
  },


})