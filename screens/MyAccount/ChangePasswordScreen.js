import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from "react-native-flash-message";

import CustomHeader from '../../Components/UI/CustomHeader';
import * as authActions from '../../store/actions/Auth';

const ChangePasswordScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    console.log("change password state", accessToken)

    const Validation = Yup.object({
        oldPassword: Yup.string()
            .min(6, '*Must be at least 6 characters')
            .matches(/(?=.*[0-9])/, '*Password must contain a number.')
            .matches(/(?=.*[a-z])/, '*Password must contain a lowercase letter.')
            // .matches(/(?=.*[A-Z])/, '*Password must contain an uppercase letter.')
            // .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a Symbol')
            .required('*Password is Required'),
        newPassword: Yup.string()
            .min(6, '*Must be at least 6 characters')
            .matches(/(?=.*[0-9])/, '*Password must contain a number.')
            .matches(/(?=.*[a-z])/, '*Password must contain a lowercase letter.')
            .matches(/(?=.*[A-Z])/, '*Password must contain an uppercase letter.')
            // .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a Symbol')
            .notOneOf([Yup.ref('oldPassword'), null], '*New password must be different from the old password.')
            .required('*New Password is Required'),
        newCPassword: Yup.string()
            .min(6, '*Must be at least 6 characters')
            .oneOf([Yup.ref('newPassword'), null], '*Passwords must match')
            .required('*Confirm New Password is Required')
    });

    const SubmitHandler = (values) => {
        setError(null);
        setIsLoading(true);
        try {

            dispatch(authActions.changePassword(values, accessToken))
                .then(response => {
                    if (response.status === 'error') {
                        setIsLoading(false)
                        Alert.alert("Alert!", response.msg || error)
                        showMessage({
                            message: "Failed to change password",
                            description: response.msg,
                            type: "danger",
                            animationDuration: 2000
                        });
                    }

                    if (response.status === "success") {
                        setIsLoading(false)
                        showMessage({
                            message: "Password changed successfully!!",
                            type: "success",
                            animationDuration: 2000
                        });
                        props.navigation.navigate('MyAccountScreen')
                    }
                })
        }
        catch (error) {
            console.error('Change password error!! : ', error)
            setError(error.message);
            setIsLoading(false);
        };
    }

    return (
        <View style={styles.container} >
            <CustomHeader label='Change Password' press={() => { props.navigation.goBack() }} />

            <View style={{ flex: 1 }}>
                <Formik
                    initialValues={{ oldPassword: '', newPassword: '', newCPassword: '' }}
                    validationSchema={Validation}
                    onSubmit={SubmitHandler}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <ScrollView contentContainerStyle={styles.body}>
                            <View>
                                <Text style={[styles.label]} >Old Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('oldPassword')}
                                    onBlur={handleBlur('oldPassword')}
                                    value={values.oldPassword}
                                />
                                {touched.oldPassword && errors.oldPassword ? (
                                    <Text style={styles.errorText}>{errors.oldPassword}</Text>
                                ) : null}

                                <Text style={styles.label} >New Password</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    style={styles.textInput}
                                />
                                {touched.newPassword && errors.newPassword ? (
                                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                                ) : null}

                                <Text style={styles.label} >Re-enter New Password</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newCPassword')}
                                    onBlur={handleBlur('newCPassword')}
                                    value={values.newCPassword}
                                    style={styles.textInput}
                                />
                                {touched.newCPassword && errors.newCPassword ? (
                                    <Text style={styles.errorText}>{errors.newCPassword}</Text>
                                ) : null}

                            </View>
                            <TouchableOpacity style={styles.verify} onPress={handleSubmit}>
                                {isLoading ?
                                    <ActivityIndicator size={25} color='white' /> :
                                    <Text style={styles.verifyButton}>SAVE</Text>
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Formik>
            </View>
        </View >
    );
};

export default ChangePasswordScreen;

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
        fontSize: 20,
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