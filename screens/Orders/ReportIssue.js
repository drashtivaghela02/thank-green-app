import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader"
import { Divider, RadioButton } from "react-native-paper"
import { useState } from "react"
import { FontAwesome5, Zocial } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import * as orderAction from '../../store/actions/Orders';

const ReportIssue = (props) => {
  const id = props.route.params.Id
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const reportIssueData = [
    { id: 1, value: 'I have received a low/bad quality' },
    { id: 2, value: 'I have not received a product, but it is billed' },
    { id: 3, value: 'I have received a product nearing expiry' },
    { id: 4, value: 'I have received an expired product' },
    { id: 5, value: 'Product has been charged more than MRP' },
    { id: 6, value: "I didn't receive my order, but I got an SMS stating it is delivered " },
    { id: 7, value: 'I have received a wrong product' },
    { id: 8, value: "My return was picked up but i haven't received my refund yet" }
  ]

  const ReportIssueHandler = () => {
    const values = { orderId: id, reason: value }
    dispatch(orderAction.reportIssue(values, accessToken))
    .then((response) => {
      setIsLoading(false); // Set loading state to false after fetching data
      // setPastOrders(response.data.pastOrders); // Set fetched data to state
      Alert.alert("", response.msg)
      console.log(response);
      props.navigation.navigate('PastOrder')
    })
    .catch(error => {
      setIsLoading(false); // Set loading state to false in case of error
      console.error("Error Report Issue:", error);
    });

  }

  return (
    <View style={styles.container}>
      <CustomHeader label="Report Issue" press={() => props.navigation.goBack()} />
      <ScrollView>
        <View style={styles.body}>

          <View style={styles.card}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
              {reportIssueData.map((item, index) => (
                <View key={item.id} style={styles.radio_button}>
                  <RadioButton value={item.value} color='#2c843e' />
                  <Text style={{ fontWeight: '500', fontSize: 15,  }}>{item.value}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>


          <TouchableOpacity style={styles.verify} onPress={ReportIssueHandler}>
          {isLoading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.verifyButton}>REPORT ISSUE</Text>}
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
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: 'white',
    // marginBottom: 30
  },
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    left: -5,
    width: '90%'
  },

  card: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    paddingBottom: 20,
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
    fontSize: 16, textAlign: 'center'
  },
  subTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  verify: {
    marginTop: 30,
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
export default ReportIssue