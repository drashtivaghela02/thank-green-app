import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/Auth';

const ChangePasswordScreen = props => {
    
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);

    console.log("change password state",accessToken)
    const submitHandler = () => {
        const value = {"oldPassword": "Test123", "newPassword": "Test123", "cnewPassword": "Test123"}
        dispatch(authActions.changePassword(value, accessToken))
    }
    return (
        <View style={styles.container} >
            <CustomHeader label='Change Password' press={() => { props.navigation.goBack() }} />

            <View style={styles.body} >
                {/* <ScrollView> */}
                <View>
                    <Text style={[styles.label]} >Old Password</Text>
                    <TextInput
                        value='oldPassword'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                    <Text style={styles.label} >New Password</Text>
                    <TextInput
                        value='newPassword'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                    <Text style={styles.label} >Re-enter New Password</Text>
                    <TextInput
                        value='newCPassword'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity style={styles.verify} onPress={submitHandler}>
                    <Text style={styles.verifyButton}>SAVE</Text>
                </TouchableOpacity>
                {/* </ScrollView> */}
            </View>
        </View>
    );
};

export default ChangePasswordScreen;

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
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 8,
        color: 'white',
    },
    body: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 30,
        // marginTop: 20,
        // marginBottom: 30
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#b4b4b4',
        paddingVertical: 20
    },
    label: {
        color: '#b4b4b4',
        fontSize: 16,
        // marginTop: 10,
        paddingTop: 30
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#b4b4b4',
        fontSize: 20,
        // paddingVertical: 6,
        padding: 3
    },
    verify: {
        marginTop: 40,
        // marginBottom: 60,
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

});