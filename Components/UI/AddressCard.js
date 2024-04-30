import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";


const PastOrderScreen = (param) => {
  data = param.param
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  console.log("ARE you sure? ", data.id)

  const deleteHandler = () => { 
    console.log(data.id)
    try {
      dispatch(userAction.deleteAddress(data.id, accessToken)).then((state) => {
        console.log("Staet sign up =====> ", state)
        if (state.status == 'success') {
          setIsLoading(false)
          Alert.alert('Success!!', state.msg)
        }
        else {
          Alert.alert('Alert', state.msg || state.error || error, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
          setIsLoading(false)
        }
      }
      )


    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity useForeground style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>


        <View style={styles.product}>
          <View>
            <View style={styles.detail}>
              < MaterialCommunityIcons name="timer-settings-outline" size={29} color="#888" style={{ padding: 5 }} />
              <Text style={styles.title}>{data.address_type}</Text>

            </View>
            <Text style={styles.price}>{data.address}, {data.zip_code}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 10 }}>
            <TouchableOpacity  >
              <Text>EDIT</Text>
            </TouchableOpacity>

            <Text>|</Text>
            <TouchableOpacity onPress={deleteHandler} >
              <Text>DELETE</Text>
            </TouchableOpacity>
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
    height: 120,
    width: '100%',
    // margin: 20,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    gap: 10
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingHorizontal: 20,
    gap: 15
  },
  title: {
    fontSize: 16,
    // lineHeight: 24,
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
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 24,
    color: '#888',
    paddingLeft: 10
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