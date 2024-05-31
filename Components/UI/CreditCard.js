import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import * as userAction from '../../store/actions/User';

import { useDispatch, useSelector } from "react-redux";

// const CreditCard = () => {

  const CreditCard = (param) => {
    data = param.param
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    console.log("ARE you sure? ", data)
    const Id = data.id
    const editData = data


    const deleteHandler = () => {
      console.log("delete prtersdfaw")
      console.log(Id, accessToken)
      setIsLoading(true)
      try {
        dispatch(userAction.deleteCard(Id, accessToken))
          .then((state) => {
            console.log("Staet sign up =====> ", state)
            if (state.status == 'success') {
              setIsLoading(false)
              Alert.alert('Success!!', state.msg)
            }
            else {
              Alert.alert('Alert', state.msg || state.error || error, [
                { text: 'Cancel', style: 'cancel' },
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <View style={styles.product}>
            <View style={{ width: '100%', height: 40, paddingTop: 10 }}>
              <Image source={require('../../assets/visaCard.png')} style={{ height: '100%', width: 100 }} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={styles.cardNumber}>•••• •••• •••• </Text>
                <Text style={styles.cardHolder}>{String(data.number).slice(-4)}</Text>

              </View>
              <View style={styles.detail}>
                <Text style={styles.title}>{data.holder_name}</Text>
                <Text style={styles.cardHolder}>Valid Through : {data.expiry}</Text>
              </View>
            </View>
            <Divider />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
              onPress={() => param.onEdit(Id, editData)}
              >
                <MaterialIcons name="mode-edit-outline" size={20} color="#888" />
                <Text style={{ fontSize: 16, fontWeight: '500' }}>EDIT</Text>
              </TouchableOpacity>

              <Text>|</Text>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "You want to delete card...",
                    [
                      { text: 'NO', style: 'cancel' },
                      { text: 'YES', onPress: ()=> param.onDelete(Id) }
                    ])

                }} >
                {isLoading
                  ? <ActivityIndicator size={22} color="#2c843e" />
                  : (
                    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                      <AntDesign name="delete" size={20} color="#888" />
                      <Text style={{ fontSize: 16, fontWeight: '500' }}> DELETE</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>


          </View>
        </View>

      </View>

    );
  }

  export default CreditCard;

  const styles = StyleSheet.create({

    product: {
      elevation: 8,
      borderRadius: 10,
      backgroundColor: 'white',
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
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom: 10
    },
    cardNumber: {
      alignItems: 'center',
      // paddingHorizontal: 10,
      color: '#777',
      fontSize: 25,

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
    cardHolder: {
      fontSize: 13,
      fontWeight: '600',
      // lineHeight: 24,
      color: '#888',
      // paddingLeft: 10
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