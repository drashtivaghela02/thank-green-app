import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignIn = (props) => {

    const Validation = Yup.object({
        emailOrContact: Yup.string()
            .required('Email or Contact number is Required'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.')
            .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter.')
            .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter.')
            .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a Symbol')
            .required('Password is Required'),
    });
    // console.log(validationSchema)
    const SubmitHandler = (values) => {
        console.log(values);
        if(isNaN(values.emailOrContact)){
            values['email'] = values['emailOrContact']
            delete values['emailOrContact']
        }
        else{
            values['contact'] = values['emailOrContact']
            delete values['emailOrContact']
        }
        console.log(values)
        // props.navigation.navigate('Home')
    }


    return (
        <LinearGradient colors={['#2c843e', '#1e4c5e']} style={styles.gradient}>
            <View style={styles.screen} >
            <KeyboardAvoidingView>
                <ScrollView>
                    <TouchableOpacity onPress={() => console.log('pressed')}>
                        <Text style={styles.skipText}>SKIP</Text>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/Thanks_Green-removebg-preview.png')} style={styles.logo} />
                    </View>

                    <Formik
                        initialValues={{ emailOrContact: '', password: '' }}
                        validationSchema={Validation}
                        onSubmit={SubmitHandler}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email/ContactNumber</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={values.emailOrContact}
                                        onBlur={handleBlur('emailOrContact')}
                                        onChangeText={handleChange('emailOrContact')}
                                        keyboardType='email-address'
                                    />
                                    {touched.emailOrContact && errors.emailOrContact ? (
                                    <Text style={styles.errorText}>{errors.emailOrContact}</Text>
                                ) : null}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry={true}
                                    />
                                    {touched.password && errors.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                                </View>

                                <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPassword')} style={styles.forgotPasswordContainer}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <View style={styles.checkbox}>
                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" />
                                    <Text style={styles.checkboxText}> Remember me</Text>
                                </View>
                            
                            
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.btntext}>Sign IN</Text>
                            </TouchableOpacity>
                            </View>
                    )}
                    </Formik>

                    <View style={styles.orData}>
                        <View style={styles.lines}></View>
                        <View><Text style={{ color: 'white', marginHorizontal: 15 }}> OR CONNECT WITH </Text></View>
                        <View style={styles.lines}></View>
                    </View>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                            <Text style={[styles.signUpText, styles.signUpLink]}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
            </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}

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
    skipText: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 16,
        marginBottom: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    logo: {
        width: 250,
        height: 200
    },
    inputContainer: {
        marginBottom: 10
    },
    label: {
        color: 'white',
        marginBottom: 8
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
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 10
    },
    forgotPasswordText: {
        color: 'white'
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    checkbox: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    checkboxText: {
        fontSize: 14,
        color: 'white'
    },
    orData: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    lines: {
        backgroundColor: 'white',
        height: 2,
        flex: 1
    },
    button: {
        alignSelf: "stretch",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#59cbbd",
        borderBottomWidth: 1
    },
    btntext: {
        color: "#fff",
        fontWeight: "bold"
    },

    signUpText: {
        color: 'white'
    },
    signUpLink: {
        marginLeft: 5,
        textDecorationLine: 'underline',
        color: '#2c843e'
    }
});

export default SignIn;
