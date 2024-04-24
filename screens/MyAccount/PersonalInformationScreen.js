import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { useDispatch, useSelector } from "react-redux";
import * as userAction from '../../store/actions/User';
import { ActivityIndicator } from "react-native-paper";

const PersonalInformationScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(state => state.auth.accessToken)
  const data = useSelector(state => state.user.data)
  
  useEffect(() => {
    setIsLoading(true)
    dispatch(userAction.getInfo(accessToken))
    setIsLoading(false)

  }, [isLoading]);
  
  if (!isLoading) {
    console.log("user'd data",data)
    
  }
  const dispatch = useDispatch();

  const submitHandler = () => {
    setIsLoading(true)
    console.log("sfehkfhal");
    if (data) {
      setIsLoading(fasle);
}
  //   dispatch(userAction.getInfo( accessToken)).then(response => {
  //   console.log("get information of user: ", response)
  //   setIsLoading(false);
  // })
}
  return (
    <View style={styles.container} >
      <CustomHeader label='Personal Information' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
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
        <TouchableOpacity style={styles.verify} onPress={submitHandler}>
          {isLoading ?
            <ActivityIndicator size={25} /> :
            <Text style={styles.verifyButton}>SAVE</Text> 
          }
          </TouchableOpacity>
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