import React, { useRef, useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { Formik } from 'formik';
import * as Yup from 'yup';

import ImagePicker from '../Components/Image/ImagePicker';
import * as authActions from '../store/actions/Auth';

const SignUp = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [imagePath, setImagePath] = useState(null);
    const [formatedNumber, setFormatedNumber] = useState(''); //for phone number with code
    const [validate, setValidate] = useState(true)
    const phoneInput = useRef()
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleImagePicked = (path) => {
        setImagePath(path);
        // Alert.alert('Image Path Received', `Image Path: ${path}`);
    }

    const state = useSelector(state => state.auth.signUpData);
    console.log(state)
    const Validation = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Name is Required'),
        phoneNumber: Yup.string()
            .required('Please Enter a valid number')
            .matches(/^[0-9]*$/, 'Phone Number must contain number.'),
        email: Yup.string()
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, ' Email address is not valid')
            .required('Email is Required'),
        password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.')
            .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter.')
            .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter.')
            .matches(/^[A-Za-z0-9]*$/, 'Password must not contain a symbol.')
            // .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a Symbol')
            .required('Password is Required'),
        cpassword: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .matches(/^[A-Za-z0-9]*$/, 'In-Valid Password.')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password is Required')
    });

    const SubmitHandler = (values) => {
        setError(null);
        setIsLoading(true);
        const countryCode = '+' + phoneInput.current?.getCallingCode()
        values.phoneNumber = phoneNumber
        values.countryCode = countryCode
        const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
        setValidate(checkValid ? checkValid : false)

        const formData = new FormData();
        formData.append('profileImage', imagePath);
        formData.append('name', values.name);
        formData.append('countryCode', values.countryCode);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('confirmPassword', values.cpassword);

        const value = {
            profileImage: imagePath,
            name: values.name,
            email: values.email,
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber,
            password: values.password,
            confirmPassword: values.cpassword,
        };

        try {
            dispatch(authActions.signup(value)).then((state) => {
                console.log("Staet sign up =====> ", state)
                if (state.status == 'success') {
                    setIsLoading(false)
                    Alert.alert('Success!!', state.msg, [
                        { text: 'OK', onPress: () => props.navigation.navigate('VerificationCode') },
                    ])
                    props.navigation.navigate('VerificationCode');
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
            })
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    return (
        <LinearGradient colors={['#2c843e', '#205065']} style={styles.gradient}>
            <View style={styles.screen}>
                <KeyboardAvoidingView>
                    <Formik
                        initialValues={{ profileImage: '', name: '', email: '', countryCode: '', phoneNumber: '', password: '', cpassword: '' }}
                        validationSchema={Validation}
                        onSubmit={SubmitHandler}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.image}>
                                    <ImagePicker
                                        onImagePicked={handleImagePicked}
                                        value={values.profileImage = imagePath}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput
                                        style={styles.input}
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
                                        keyboardType='email-address'
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
                                        <PhoneInput
                                            ref={phoneInput}
                                            defaultCode='IN'
                                            defaultValue={phoneNumber}
                                            maxLength={10}
                                            value={values.phoneNumber = phoneNumber}
                                            onChangeText={(text) => {
                                                setPhoneNumber(text)
                                                handleChange('phoneNumber')
                                            }}
                                            textInputProps={{ maxLength: 10 }}
                                            onChangeFormattedText={(text) => setFormatedNumber(text)}
                                            withShadow
                                            containerStyle={contact.container}
                                            textContainerStyle={contact.phoneNumberInput}
                                            textInputStyle={{ color: 'white' }}
                                            codeTextStyle={{ color: 'white' }}
                                            flagButtonStyle={{ color: 'white' }}
                                        />
                                    </View>
                                    {touched.phoneNumber && errors.phoneNumber
                                        ? (!phoneInput?.current?.isValidNumber(phoneNumber)
                                                ? <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                                                : null
                                        ) : null}
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
                                
                                <TouchableOpacity disabled={isLoading} style={styles.verify} onPress={handleSubmit}>
                                    {isLoading ?
                                        <ActivityIndicator size={25} /> :
                                        <Text style={styles.verifyButton}>SIGN UP</Text>}
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </Formik>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Already have account? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('FormNavigator')} >
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
        flex: 1,
        marginVertical: 30
    },
    image: {
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10
    },
    label: {
        color: 'white',
        marginBottom: 8,
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1e4c5e',
        borderColor: '#1e4c5e',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    verify: {
        marginTop: 40,
        marginBottom: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2c843e',
        borderRadius: 10,
        width: '100%',
    },
    verifyButton: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    signUpText: {
        color: 'white',
        marginBottom: 8,
        fontSize: 14
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
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1e4c5e',
        backgroundColor: '#1e4c5e',
    },
    countryCodeInput: {
        width: 80,
        marginRight: 10,
    },
    phoneNumberInput: {
        borderRadius: 10,
        backgroundColor: '#1e4c5e',
        paddingHorizontal: 10,
        paddingVertical: 8
    },

});