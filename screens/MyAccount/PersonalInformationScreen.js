import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';

const PersonalInformationScreen = props => {
  return (
    <View style={styles.container} >
      <CustomHeader label='Personal Information' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
        {/* <ScrollView> */}
          <View>
            <Text style={styles.label} >Full Name</Text>
            <TextInput
              keyboardType='default'
              style={styles.textInput}
            />
            <Text style={styles.label} >Email</Text>
            <TextInput
              keyboardType='email-address'
              style={styles.textInput}
            />
            <Text style={styles.label} >Contact Number</Text>
            <TextInput
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.verify} onPress={() => { console.log('Pressed'); }}>

            <Text style={styles.verifyButton}>SAVE</Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default PersonalInformationScreen;

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
  body: {
      flex: 1,
      justifyContent: 'space-between',
      // alignItems: 'center',
      paddingHorizontal: 30,
      paddingBottom: 30,
      // marginTop: 20,
      // marginBottom: 30
  },
  bodyText: {
      textAlign: 'center',
      fontSize: 17,
      color: '#b4b4b4',
      paddingVertical: 20
  },
  label: {
      color: '#b4b4b4',
      fontSize: 16,
      // marginTop: 10,
      paddingTop: 30
  },
  textInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#b4b4b4',
      fontSize: 20,
      // paddingVertical: 6,
      padding: 3
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
      fontWeight: '500'
  },

});