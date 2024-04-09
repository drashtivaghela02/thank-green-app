import {ScrollView,  Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
import OtpInput from "../Components/UI/OtpInput" ;
import { Clipboard } from '@react-native-community/clipboard'; // Import Clipboard module
import { useRef } from "react";
import OTPTextInput from 'react-native-otp-textinput';

const VerificationCode = props => {
    // const {width, height} = Dimensions.getWindow();
    // console.log(height, width)
    const [copiedText, setCopiedText] = useState('');
    const _otpRef = useRef(null);

    const [otp, setOTP] = useState('');
    const [wholeOTP, setWholeOTP] = useState('');
    
    const handleOTPText =(text)=>{
        console.log(otp);
        console.log('w', wholeOTP);

    }
    
    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <View>
                    <AntDesign name="arrowleft" size={28} color="black" />
                    <Text style={styles.heading}>Phone Verification</Text>
                    <Text style={styles.subHeading}>Enter your otp code here</Text>
                </View>
            </View>
            
            <View style={styles.body} > 
                <ScrollView>
                {/* <OtpInput /> */}

                <OTPTextInput
                    inputCount = {4}
                    inputCellLength = {1}
                    handleTextChange={text => setOTP(text)}
                    onFilled={text => setWholeOTP(text)}
                />
                
                <TouchableOpacity style={styles.verify} onPress={handleOTPText}> 
                    <Text style={styles.verifyButton}>Verify</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30}}>
                    <Text>Didn't Received code?</Text>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}>
                        <Text>Resend</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default VerificationCode;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        // justifyContent: 'space-around',
        // alignItems: 'center'
    },
    header: {
        height: '20%',
        backgroundColor: '#2c843e',
        paddingTop: 30,
        paddingHorizontal: 20,
        flex: 1
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 4
    },
    subHeading: {
        paddingTop: 4
    },
    body: {
        height: '80%',
        paddingHorizontal: 60,
        justifyContent: 'center',
        alignItems: 'center'
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
    },
    bodyImage: {

    },
    bodyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#3e4854',
        paddingVertical: 20
        

    },
    email:{
        color: '#3e4854',
    },
    textInput : {
        borderBottomWidth: 1, 
        borderBottomColor: '#3e4854'
    },
    verify : {
        paddingVertical: 20,
        backgroundColor: '#2c843e',
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',

    },
    verifyButton: {
        borderRadius: 10,
        color: 'white',
        fontSize: 20,
    }
});
