import { ScrollView, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator, Alert } from "react-native";
import React, { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
// import OtpInput from "../../Components/UI/OtpInput";
// import { Clipboard } from '@react-native-community/clipboard'; // Import Clipboard module
import { useRef } from "react";
import OTPTextInput from 'react-native-otp-textinput';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../store/actions/Auth';
import { useWindowDimensions } from "react-native";
import Colors from "../Constant/Colors";
import { LinearGradient } from "expo-linear-gradient";

const VerificationCode = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [copiedText, setCopiedText] = useState('');
    const _otpRef = useRef(null);
    const [otp, setOTP] = useState('');
    const [wholeOTP, setWholeOTP] = useState('');

    const dispatch = useDispatch();
    const statusOfOtp = useSelector(state => state.auth.signUpData);

    const state = useSelector(state => state.auth.otpID);
    console.log("state reducer", state)

    const handleOTPText = () => {
        setError(null);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('profileImage', {
            uri: statusOfOtp.profileImage,
            type: 'image/jpeg', // adjust the type according to your image
            name: 'photo.jpg',
        });
        formData.append('name', statusOfOtp.name);
        formData.append('email', statusOfOtp.email);
        formData.append('countryCode', statusOfOtp.countryCode);
        formData.append('phoneNumber', statusOfOtp.phoneNumber);
        formData.append('password', statusOfOtp.password);
        formData.append('otpId', state);
        formData.append('otp', otp);

        try {
            dispatch(authActions.verifyOTP(formData)).then((state) => {
                if (state.status == 'success') {
                    setIsLoading(false);
                    props.navigation.navigate('FormNavigator');
                }
                else {
                    Alert.alert('Alert', state.msg || state.error , [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])
                    setIsLoading(false);
                }
            })
        } catch (err) {
            setError(err.message);
            Alert.alert('Alert', err, [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
            setIsLoading(false);
        }

    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c843e', '#1e4c5e']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.7, y: 1 }}
            >
                <View style={styles.header}>
                    <AntDesign name="arrowleft" size={28} color='white' />
                    <Text style={styles.heading}>Phone Verification</Text>
                    <Text style={styles.subHeading}>Enter your OTP code here</Text>
                </View>
            </LinearGradient>

            <View style={styles.body}>
                <OTPTextInput
                    inputCount={4}
                    inputCellLength={1}
                    handleTextChange={text => setOTP(text)}
                    onFilled={text => setWholeOTP(text)}
                />

                <TouchableOpacity disabled={isLoading} style={styles.verify} onPress={handleOTPText}>
                    {isLoading ?
                        <ActivityIndicator size={25} /> :
                        <Text style={styles.verifyButton}>Verify</Text>
                    }
                </TouchableOpacity>

                <View style={styles.resendContainer}>
                    <Text>Didn't Receive code?</Text>
                    <TouchableOpacity onPress={() => dispatch(authActions.resendOTP(state))}>
                    {/* <TouchableOpacity onPress={resendOTPHandler}> */}

                        <Text style={styles.resendText}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default VerificationCode;

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
        fontWeight: '500',
        fontSize: 30,
        paddingTop: 8,
        color: 'white',
    },
    subHeading: {
        paddingTop: 4,
        color: 'white',
        fontWeight: 'bold',
        fontWeight: '400'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
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
        alignSelf: 'center'

    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    resendText: {
        color: Colors.green,
        fontWeight: 'bold'
    }
});