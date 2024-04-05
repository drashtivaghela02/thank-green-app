import { AntDesign } from '@expo/vector-icons';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const ForgetPassword = props => {
    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <View>
                    <AntDesign name="arrowleft" size={28} color="black" />
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.subHeading}>Enter the email address</Text>
                </View>
            </View>
            <View style={styles.body} > 
                <ScrollView>
                <View style={styles.bodyImage} >
                    <Image /> 
                    <Text style={styles.bodyText}>Enter the email address associated with your account.</Text>
                </View>
                <View>
                    <Text style={styles.email} >Email id</Text>
                    <TextInput 
                        keyboardType="email-address"
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.submit}>
                    <Button title="Submit" color='#2c843e' style={styles.submitButton} />
                </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ForgetPassword;

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
    submit : {
        marginVertical: 20
    },
    submitButton: {
        borderRadius: 10
    }
});