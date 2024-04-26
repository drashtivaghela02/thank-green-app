import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';

const PaymentScreen = props => {
  return (
    <View style={styles.container} >
      <CustomHeader label='Payment' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
          <View style={styles.logoContainer} >
            <Image source={require('../../assets/Credit_Card_Payment-cuate.png')} style={styles.logo} />
            <Text style={styles.bodyMainText}>No Saved Cards</Text>
            <Text style={styles.bodyText}>All cards added will be saveed here.</Text>
            <Text style={styles.bodyText}>In case you want to edit them later.</Text>
          </View>

          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('AddNewCard') }}>
            <Text style={styles.verifyButton}>ADD NEW CARD</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingBottom: 30,
  },
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 10
  },
  logoContainer: {
    justifyContent:'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#b4b4b4',
    // paddingVertical: 20


  },
  email: {
    color: '#b4b4b4',
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    paddingVertical: 6
  },
  verify: {
    marginTop: 40,
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
    fontWeight: '400'

  },
  submit: {
    marginVertical: 20
  },
  submitButton: {
    borderRadius: 10
  },
  orData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  lines: {
    backgroundColor: 'white',
    height: 2,
    flex: 1
  },
  GoogleLogo: {
    marginTop: 15,
    width: 40,
    height: 40
  },
  FacebookLogo: {
    width: 70,
    height: 70
  },
});