import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader"
import { Divider, RadioButton } from "react-native-paper"
import { useState } from "react"
import { FontAwesome5, Zocial } from "@expo/vector-icons"

const ReportIssue = (props) => {
  const [value, setValue] = useState('')
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
  return (
    <View style={styles.container}>
      <CustomHeader label="Report Issue" press={() => props.navigation.goBack()} />
      <ScrollView>
        <View style={styles.body}>

          <View style={styles.card}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
              {reportIssueData.map((item, index) => (
                <View style={styles.radio_button}>
                  <RadioButton value={item.value} color='#2c843e' />
                  <Text style={{ fontWeight: '500', fontSize: 14.5 }}>{item.value}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>


          <TouchableOpacity style={styles.verify} onPress={() => { console.log(value); }}>
            <Text style={styles.verifyButton}>REPORT ISSUE</Text>
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
    paddingTop: 10,
    left: -5
  },

  card: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 16,
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
export default ReportIssue