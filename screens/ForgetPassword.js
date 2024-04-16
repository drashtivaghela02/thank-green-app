import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

const ForgetPassword = props => {
    return (
        <View style={styles.container} >
              <LinearGradient
                colors={['#2c843e', '#1e4c5e']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.7, y: 1}}                
            >
                <View style={styles.header}>
                    <AntDesign name="arrowleft" size={28} color='white' />
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.subHeading}>Enter the email address</Text>
                </View>
            </LinearGradient>

            <View style={styles.body} > 
                <ScrollView>
                <View style={styles.logoContainer} >
                <Image source={require('../assets/Secure_login-pana.png')} style={styles.logo} />
                    <Text style={styles.bodyText}>Enter the email address associated with your account.</Text>
                </View>
                <View>
                    <Text style={styles.email} >Email id</Text>
                    <TextInput 
                        keyboardType="email-address"
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity style={styles.verify} onPress={()=>{console.log('Pressed');}}> 

                                            <Text style={styles.verifyButton}>SUBMIT</Text>
                                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: Dimensions.get('window').height*0.20
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 8,
        color: 'white',
    },
    subHeading: {
        paddingTop: 4,
        color: 'white',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 30
    },
    logo: {
        width: 280,
        height: 280
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#b4b4b4',
        paddingVertical: 20
        

    },
    email:{
        color: '#b4b4b4',
        fontSize: 16,
    },
    textInput : {
        borderBottomWidth: 1, 
        borderBottomColor: '#b4b4b4',
        fontSize: 16,
        paddingVertical: 6
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
        alignSelf: 'center',
        fontWeight: '500'

    },
    submit : {
        marginVertical: 20
    },
    submitButton: {
        borderRadius: 10
    }
});