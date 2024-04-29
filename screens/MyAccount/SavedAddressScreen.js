import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';

const SavedAddressScreen = props => {



  return (
    <View style={styles.container} >
      <CustomHeader label='Saved Address' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >

          <View style={styles.logoContainer} >
            <Image source={require('../../assets/Navigation-pana.png')} style={styles.logo} />
            <Text style={styles.bodyMainText}>No Saved Addresses</Text>
            <Text style={styles.bodyText}>All addresses added will be saveed here.</Text>
            <Text style={styles.bodyText}>In case you want to edit them later.</Text>
          </View>

          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('LocationPicker') }}>
            <Text style={styles.verifyButton}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
        {/* <LocationPicker /> */}
      </View>
    </View>
  );
};

export default SavedAddressScreen;

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
    alignItems: 'center'
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


});