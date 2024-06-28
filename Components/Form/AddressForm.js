import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { useDispatch, useSelector } from "react-redux";
import * as userAction from '../../store/actions/User';
import { ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';


const AddressForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [tag, setTag] = useState(null)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();

  const Validation = Yup.object({
    address: Yup.string()
      .required('*Address is Required'),
    zip_code: Yup.string()
      .matches(/^\d{6}$/, 'Invalid Indian ZIP code')
      .required('*Zip Code is Required'),
    address_type: Yup.string()
      .required('*Select Address type')
  });

  const SubmitHandler = (values) => {
    setError(null);
    setIsLoading(true);

    const val = {
      "address_type": "home",
      "address": "adajan, surat",
      "landmark": "singanpore",
      "zip_code": "395009",
      "latitude": "10.2",
      "longitude": "10.2"
    }
    try {
      dispatch(userAction.addNewAddress(val, accessToken)).then((state) => {
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

    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ address: '', zip_code: '', address_type: '', landmark: '' }}
        validationSchema={Validation}
        onSubmit={SubmitHandler}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
          <ScrollView contentContainerStyle={styles.body1}>
            <View>
              <Text style={[styles.label]} >Street Name, Flat no.,Society/Office Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {touched.address && errors.address ? (
                <Text style={styles.errorText}>{errors.address}</Text>
              ) : null}

              <Text style={styles.label} >Zip Code</Text>
              <TextInput
                onChangeText={handleChange('zip_code')}
                onBlur={handleBlur('zip_code')}
                value={values.zip_code}
                style={styles.textInput}
              />
              {touched.zip_code && errors.zip_code ? (
                <Text style={styles.errorText}>{errors.zip_code}</Text>
              ) : null}

              <Text style={styles.label} >Nearest Landmark(Optional)</Text>
              <TextInput
                onChangeText={handleChange('landmark')}
                onBlur={handleBlur('landmark')}
                value={values.landmark}
                style={styles.textInput}
              />
              {touched.landmark && errors.landmark ? (
                <Text style={styles.errorText}>{errors.landmark}</Text>
              ) : null}

              <Text style={styles.sheetHeader}>Tag this address as:</Text>
              <RadioButton.Group onValueChange={newValue => {
                setTag(newValue)
              }} value={values.address_type = tag}
              >
                <View style={{ flexDirection: 'row', left: -10, gap: 20 }}>
                  <View style={styles.radio_button}>
                    <RadioButton value="Home" color='#2c843e' />
                    <Text style={styles.sheetItems}>Home</Text>
                  </View>

                  <View style={styles.radio_button}>
                    <RadioButton value="Work" color='#2c843e' />
                    <Text style={styles.sheetItems}>Work</Text>
                  </View>
                  <View style={styles.radio_button}>
                    <RadioButton value="Other" color='#2c843e' />
                    <Text style={styles.sheetItems}>Other</Text>
                  </View>

                </View>
              </RadioButton.Group>
              {touched.address_type && errors.address_type ? (
                <Text style={styles.errorText}>{errors.address_type}</Text>
              ) : null}
            </View>
            <TouchableOpacity disabled={isLoading} style={styles.verify} onPress={handleSubmit}>
              {isLoading ?
                <ActivityIndicator size={25} /> :
                <Text style={styles.verifyButton}>ADD ADDRESS</Text>
              }
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  sheetHeader: {
    fontWeight: '600',
    fontSize: 16,
    paddingTop: 1
  },
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },
  body1: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  label: {
    color: '#b4b4b4',
    fontSize: 16,
    paddingTop: 15,
    fontWeight: '400',

  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    padding: 3,
    fontWeight: '500',
  },
  verify: {
    marginBottom: 30,
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
  errorText: {
    color: 'red',
    // marginBottom: 5,
  },

});