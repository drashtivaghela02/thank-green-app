import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { useDispatch, useSelector } from "react-redux";
import * as userAction from '../../store/actions/User';
import { ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from 'yup';
import { showMessage } from "react-native-flash-message";

const PersonalInformationScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [resData, setResdata] = useState();
  const accessToken = useSelector(state => state.auth.accessToken)
  const data = useSelector(state => state.user.data)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(userAction.getInfo(accessToken))
      .then((response) => {
        setIsLoading(false);
        setResdata(response?.data[0]);
        setName(response?.data[0]?.name);
        setEmail(response?.data[0]?.email);
        setContact((response?.data[0].phone_number)?.toString());
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken]);

  function getSendingObject(obj1, obj2) {
    const intersection = {};
    const formData = new FormData();
    for (const key in obj1) {
      if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
        intersection[key] = obj2[key];
        formData.append( key, obj2[key] )
      }
    }
    return formData;
  }

  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  const Validation = Yup.object({
    name: Yup.string()
      .max(15, '*Must be 15 characters or less')
      .required('*Name is Required'),
    email: Yup.string()
      .email('*Please enter valid Email')
      .required('*Email is Required'),
    contactNumber: Yup.string()
      // .matches(phoneRegex, '*Invalid phone number')
      .required('*Contact Number is Required')
  });

  const SubmitHandler = (values) => {
    console.log(resData)

    const val = getSendingObject(resData, values)
    console.log(val)
    
    dispatch(userAction.updateInfo(val, accessToken)).then(response => {
      console.log('Personal info update : :: ', response);
      if (response.status === 'error') {
        setIsLoading(false)
        Alert.alert("Alert!", response.msg || error)
        showMessage({
            message: "Failed to update details!",
            description: response.msg,
            type: "danger",
            animationDuration: 2000
        });
    }

    if (response.status === "success") {
        setIsLoading(false)
        showMessage({
            message: "User Details updated successfully!!",
            type: "success",
            animationDuration: 2000
        });
        props.navigation.navigate('MyAccountScreen')
    }
    })
  }
  return (
    <View style={styles.container} >
      <CustomHeader label='Personal Information' press={() => { props.navigation.goBack() }} />

      <View style={{ flex: 1 }}>
        <Formik
          enableReinitialize={true}
          initialValues={{ name: name, email: email, contactNumber: contact }}
          validationSchema={Validation}
          onSubmit={SubmitHandler}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <ScrollView contentContainerStyle={styles.body}>
              <View>
                <Text style={[styles.label]} >Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}

                <Text style={styles.label} >Email</Text>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.textInput}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <Text style={styles.label} >Contact Number</Text>
                <TextInput
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  value={values.contactNumber}
                  style={styles.textInput}
                />
                {touched.contactNumber && errors.contactNumber ? (
                  <Text style={styles.errorText}>{errors.contactNumber}</Text>
                ) : null}

              </View>
              <TouchableOpacity disabled={!dirty} style={styles.verify} onPress={handleSubmit}>
                {isLoading ?
                  <ActivityIndicator size={25} /> :
                  <Text style={styles.verifyButton}>SAVE</Text>
                }
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
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
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  label: {
    color: '#b4b4b4',
    fontSize: 16,
    paddingTop: 30
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    padding: 3
  },
  verify: {
    marginTop: 40,
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
    marginBottom: 5,
},

});