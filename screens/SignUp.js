import React, { useRef, useState } from 'react';
import { Button, Image, TextInput, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import PhoneInput from "react-native-phone-number-input";
import ImagePicker from '../Components/Image/ImagePicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as authActions from '../store/actions/Auth';
import {useDispatch} from 'react-redux';

const SignUp = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [formatedNumber, setFormatedNumber] = useState(''); //for phone number with code
    const [validate, setValidate] = useState(true)
    const phoneInput = useRef()
    const [phoneNumber, setPhoneNumber] = useState('');

    const Validation = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Name is Required'),
        email: Yup.string()
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, ' Email address is not valid')
            .required('Email is Required'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.')
            .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter.')
            .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter.')
            .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a Symbol')
            .required('Password is Required'),
        cpassword: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Password is Required')
            // .matches(values.password, 'Confirm Password must be match with Password')
    });
    // console.log(validationSchema)
    const SubmitHandler = (values) => {
        const countryCode = '+' + phoneInput.current?.getCallingCode()
        values.phoneNumber = phoneNumber
        values.countryCode = countryCode
        console.log(values);
        const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
        setValidate(checkValid ? checkValid : false)
        
        let action;
        const formData = new FormData();

            formData.append('image',values.image);
            formData.append('name',values.name);
            formData.append('countryCode',values.countryCode);
            formData.append('phoneNumber',values.phoneNumber);
            formData.append('email',values.email);
            formData.append('password',values.password);
            formData.append('cpassword',values.cpassword);
        // console.log(formData);
        
        setError(null);
        setIsLoading(true);
        try {
            if(dispatch(authActions.signup(formData))){
                if (checkValid === true) {
                    props.navigation.navigate('VerificationCode')
                }
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
        

    }
    

    return (
        <LinearGradient colors={['#2c843e', '#1e4c5e']} style={styles.gradient} >
            <View style={styles.screen}>
                <KeyboardAvoidingView>
                <Formik
                    initialValues={{image: '', name: '', email: '',countryCode: '', phoneNumber: '', password: '', cpassword: ''}} //after setup add image
                    validationSchema={Validation}
                    onSubmit={SubmitHandler}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <ScrollView>
                            <View style={styles.image}>
                                <ImagePicker  />
                            </View>     
                                       
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput 
                                    style={styles.input} 
                                    keyboardType='default'
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder="Enter your Name"
                                />
                                {touched.name && errors.name ? (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                ) : null}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput 
                                    style={styles.input}
                                    keyboardType ='email-address'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Enter your email"
                                />
                                {touched.email && errors.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                            </View>
                        
                            <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                                <View>
                                    <PhoneInput     //make setup for formik 
                                        ref={phoneInput}
                                        defaultCode='IN'
                                        defaultValue={phoneNumber}
                                        onChangeText={(text) => setPhoneNumber(text)}
                                        onChangeFormattedText={(text) => setFormatedNumber(text)}
                                        withShadow
                                        containerStyle= {{
                                            width: '100%', 
                                            borderRadius:10,
                                            borderWidth: 1,
                                            borderColor: 'white',
                                            backgroundColor: '#1e4c5e',
                                        }}
                                        textContainerStyle={[contact.countryCodeInput, contact.phoneNumberInput]}
                                        textInputStyle={{color: 'white'}}
                                        codeTextStyle={{color: 'white'}}
                                        flagButtonStyle ={{olor: 'white'}}
                                    />
                                </View>

                                {!validate ? <Text style={styles.errorText}>Phone number is Required</Text> : null}
                                {/* <Text style={styles.label}>Contact Number</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={contact.countryCodeContainer}>
                                        <TextInput
                                            style={[contact.countryCodeInput, contact.phoneNumberInput]}
                                            value={countryCode}
                                            onChangeText={handleCountryCodeChange}
                                        />
                                    </View>
                                    <View style={contact.phoneNumberContainer}>
                                        <TextInput
                                            style={contact.phoneNumberInput}
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChangeText={handlePhoneNumberChange}
                                            keyboardType="phone-pad"
                                        />
                                    </View>
                                </View> */}
                            </View>


                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="Enter password"
                                />
                                {touched.password && errors.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                            </View>
                            
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    onChangeText={handleChange('cpassword')}
                                    onBlur={handleBlur('cpassword')}
                                    value={values.cpassword}
                                    placeholder="Enter confirm password"
                                />
                                {touched.cpassword && errors.cpassword ? (
                                    <Text style={styles.errorText}>{errors.cpassword}</Text>
                                ) : null}
                            </View>
                            <View style = {{marginTop: 10}}>
                                <Button 
                                    title="SIGN UP" 
                                    color='#2c843e' 
                                    onPress={handleSubmit} />
                            </View>
                        </ScrollView> 
                    )}
                </Formik>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Already have account? </Text>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('SignIn')} >
                        <Text style={[styles.signUpText, styles.signUpLink]}>SignIn</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        width: '100%',
        padding: 20,
        flex:1,
        marginVertical: 30
    },
    image:{
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10
    },
    label: {
        color: 'white',
        marginBottom: 8,
        fontSize:16
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1e4c5e',
        borderColor: 'white',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    signUpText: {
        color: 'white',
        marginBottom: 8,
        fontSize:14
    },
    signUpLink: {
        marginLeft: 5,
        color: '#2c843e',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

const contact = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
            padding: 10,
        },
        countryCodeContainer: {
            marginRight: 10,
        },
        countryCodeInput: {
            width: 80,
        },
        phoneNumberContainer: {
            flex: 1,
        },
        phoneNumberInput: {
            borderRadius: 10,
            backgroundColor: '#1e4c5e',
            paddingHorizontal: 10,
            paddingVertical: 8
        },
    
});