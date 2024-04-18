import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';

const PaymentScreen = props => {
  return (
    <View style={styles.container} >
      <CustomHeader label='Payment' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
        {/* <ScrollView> */}
          <View style={styles.logoContainer} >
            <Image source={require('../../assets/Secure_login-pana.png')} style={styles.logo} />
            <Text style={styles.bodyMainText}>No Saved Cards</Text>
            <Text style={styles.bodyText}>All cards added will be saveed here.</Text>
            <Text style={styles.bodyText}>In case you want to edit them later.</Text>
          </View>

          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('AddNewCard') }}>
            <Text style={styles.verifyButton}>ADD NEW CARD</Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
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
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.20
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 8,
    color: 'white',
  },
  subHeading: {
    paddingTop: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    paddingVertical: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  logo: {
    width: 280,
    height: 280
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#b4b4b4',
    paddingVertical: 20


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
    marginBottom: 60,
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