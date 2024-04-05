import React, { useRef } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

const OtpInput = () => {
    const [otp, setOtp] = useState('');

    const handleOTPText =(text)=>{
        setOtp(text);
        console.log(text)
    }

    return (
        <View>
            <OTPTextInput 
                inputCount = {4}
                inputCellLength = {1}
                onTextChange={handleOTPText}
            />
        </View>
    );
}

export default OtpInput;