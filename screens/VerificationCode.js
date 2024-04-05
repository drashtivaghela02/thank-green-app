import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OtpInput from "../Components/UI/OtpInput" ;
import { Clipboard } from '@react-native-community/clipboard'; // Import Clipboard module
import { useRef } from "react";

const VerificationCode = props => {
    const [copiedText, setCopiedText] = useState('');
    const _otpRef = useRef(null);

    const [otp, setOTP] = useState('');
    const copyToClipboard = () => {
        Clipboard.setString(copiedText); // Set the text you want to copy to clipboard
    };
    
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    const handleVerify = () => {
        // Call fetchCopiedText to get the text from the clipboard
        fetchCopiedText();
        // Proceed with verification using the copied text if necessary
    };

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

                <OtpInput />

                {/* <OTPInputView
                    style={{width: "100%", height: 200, paddingHorizontal: 32}}
                    pinCount={4}
                    autoFocusOnLoad
                    keyboardType='decimal-pad'
                    codeInputFieldStyle={{
                        width: 30,
                        height: 45,
                        color: 'black',
                        borderWidth: 8,
                        borderBottomWidth: 3,
                        borderBottomColor: '#3e4854'
                    }}
                    codeInputHighlightStyle={{
                        borderColor: 'black'
                    }}
                    onCodeFilled={(code)=> {console.log(`code is ${code}`)}}
                 /> */}

                {/* Call copyToClipboard function onPress */}
                <TouchableOpacity style={styles.verify} onPress={copyToClipboard}> 
                    <Text style={styles.verifyButton}>Verify</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30}}>
                    <Text>Didn't Received code?</Text>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}>
                        <Text>Resend</Text>
                    </TouchableOpacity>

                </View>
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
