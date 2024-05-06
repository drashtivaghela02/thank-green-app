import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader"
import { Divider, RadioButton } from "react-native-paper"
import { useState } from "react"
import { FontAwesome5, Zocial } from "@expo/vector-icons"
import * as orderAction from '../../store/actions/Orders';
import { useDispatch, useSelector } from "react-redux"


const CancelOrder = (props) => {

  const id = props.route.params.Id
  console.log(id)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [otherValue, setOtherValue] = useState('')

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const cancelOrder = [
    { id: 1, value: 'I want to order a different product' },
    { id: 2, value: 'Not Interested Anymore' },
    { id: 3, value: 'I want to re-order using promo code' },
    { id: 4, value: 'Order delivery delayed' },
    { id: 5, value: 'Found a better deal' },
    { id: 6, value: 'Order duplicate/wrong Items' },
    { id: 7, value: 'Other' },

  ]

  const cancelOrderHandler = () => {
    const data = (value === "Other") ? (value + ' : ' + otherValue) : value
    console.log(data)
    const values = { orderId: id, reason: data }
    console.log("gu7ygt7yig", values);
    dispatch(orderAction.cancelOrder(values, accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        // setPastOrders(response.data.pastOrders); // Set fetched data to state
        Alert.alert("", response.msg)
        console.log(response);
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        console.error("Error fetching user information:", error);
      });

  }


  return (
    <View style={styles.container}>
      <CustomHeader label="Cancel Order" press={() => props.navigation.goBack()} />
      <ScrollView>
        <View style={styles.body}>

          <Text style={{ fontSize: 17, paddingBottom: 30, paddingHorizontal: 20, alignSelf: 'center', textAlign: 'center', fontWeight: '500' }}>We are sorry to see you are cancelling your order. Tell us why and we'll improve.</Text>

          <View style={styles.card}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
              {cancelOrder.map((item, index) => (
                <View style={styles.radio_button} key={index}>
                  <RadioButton value={item.value} color='#2c843e' />
                  <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.value}</Text>
                </View>
              ))}
              <View style={styles.card1}>
                <TextInput
                  editable={value === "Other" ? true : false}
                  style={{ fontWeight: '500', fontSize: 14, color: 'black' }}
                  placeholder="Other Reason eg. I placed order by mistake"
                  onChangeText={(value) => setOtherValue(value)}
                />
              </View>



            </RadioButton.Group>
            <Divider />
            <View style={[styles.detail, { gap: 10 }]}>
              <View style={{ gap: 8 }}>
                <Text style={styles.title}>Want to edit order then call us on this number. </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="phone-alt" size={20} color='#2c843e' />
                  <Text style={styles.subTitle}>  +011 - 8893023406</Text>
                </View>

              </View>
            </View>
          </View>


          <TouchableOpacity
            disabled={value === '' || (value === 'Other' && otherValue === '')}
            style={styles.verify}
            onPress={cancelOrderHandler}>
            {isLoading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.verifyButton}>CANCEL ORDER</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    // marginBottom: 30
  },
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    left: -5
  },

  card: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    overflow: 'hidden',
    alignSelf: 'center'

  },

  card1: {
    elevation: 5,

    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center'

  },
  detail: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    // gap: 10
  },
  title: {
    fontWeight: '500',
    fontSize: 16, textAlign: 'center',
    paddingTop: 30
  },
  subTitle: {
    fontWeight: '700',
    fontSize: 18,
  },




  verify: {
    marginTop: 30,
    // marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c843e',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
})
export default CancelOrder