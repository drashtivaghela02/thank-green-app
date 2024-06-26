import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const SignIn = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState();
    const [selected, setSelected] = useState(true);
    const dispatch = useDispatch();


    const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: '383741119267-dpo3amhvf5v4k4pmbbi4o191jtrvoe0t.apps.googleusercontent.com',
    androidClientId: "383741119267-f5fgfjo5lksk11s6dumm8ff87nip3kn3.apps.googleusercontent.com",
    // iosClientId: "",

  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
      if (!user) {
        console.log("user2", user, response)
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally", user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
        console.log("setuserinfo", user)
    } catch (error) {
      // Add your own error handler here
    }
  };


    // const [request, responseType, promptAsync] = Google.useAuthRequest({
    //     androidClientId: '383741119267-f5fgfjo5lksk11s6dumm8ff87nip3kn3.apps.googleusercontent.com',
    //     // webClientId: '383741119267-dpo3amhvf5v4k4pmbbi4o191jtrvoe0t.apps.googleusercontent.com',
    // });

    // useEffect(() => {
    //     console.log("dsklfjl;sd;fk",responseType)

    //     if (responseType?.type === 'success') {
    //         const { authentication } = responseType; 

    //         console.log("dsklfjl;sd;fk",responseType)
    //         handleGoogleSignIn(authentication.accessToken);
    //     }
    // }, [responseType]);

    // const handleGoogleSignIn = async (accessToken) => {
    //     try {
    //         const res = await fetch('https://thankgreen.onrender.com/api/auth/google/callback', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 token: 'ya29.a0AXooCgu3iqFeN0Jh0TCXrpopQFEi5_h3j3HgPMGyv5iGfsKP1YisHHJQMBKasrqcu2tr7oqNsrQTmI4pxy4IzYXYaLOOeAXJ9YXGmV7ZubACs91uyjUYGu3OlLdjrvfXPGbrmVpBpq33d5LXRD1n80DD-Msow9ZOdelHaCgYKAXUSARASFQHGX2MiV0vfbgq4RchpfmWyc-A2aQ0171',
    //             }),
    //         });

    //         const data = await res.json();
    //         if (data.status === 'success') {
    //             props.navigation.navigate('Home');
    //         } else {
    //             Alert.alert('Alert', data.msg || data.error, [
    //                 {
    //                     text: 'Cancel',
    //                     onPress: () => console.log('Cancel Pressed'),
    //                     style: 'cancel',
    //                 },
    //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
    //             ]);
    //         }
    //     } catch (error) {
    //         console.error('Error authenticating with backend', error);
    //     }
    // };

    const Validation = Yup.object({
        emailOrContact: Yup.string()
            .test(
                'is-email-or-phone',
                'Invalid email or phone number',
                value => {
                    // Check if it's an email
                    if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value)) {
                        return true;
                    }
                    // Check if it's a phone number (assuming it's a US phone number)
                    else if (/^\d{10}$/.test(value)) {
                        return true;
                    }
                    return false;
                }
            )
            .required('Email or Contact number is Required'),
        password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.')
            .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter.')
            .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter.')
            .required('Password is Required'),
    });

    const SubmitHandler = async (values) => {
        let value = {};
        setError(null);
        setIsLoading(true);

        if (isNaN(values.emailOrContact)) {
            value['email'] = values['emailOrContact'];
            value['password'] = values['password'];

            try {
                await dispatch(authActions.loginEmail(value.email, value.password)).then((state) => {
                    if (state.status === 'success') {
                        setIsLoading(false);
                        props.navigation.navigate('Home');
                    } else {
                        Alert.alert('Alert', state.msg || state.error, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                        setIsLoading(false);
                    }
                });
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        } else {
            value['contact'] = values['emailOrContact'];
            value['password'] = values['password'];

            dispatch(authActions.loginContact(value.contact, value.password)).then((state) => {
                if (state.status === 'success') {
                    setIsLoading(false);
                    props.navigation.navigate('Home');
                } else {
                    Alert.alert('Alert', state.msg || state.error, [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', color: 'pink', onPress: () => console.log('OK Pressed') },
                    ]);
                    setIsLoading(false);
                }
            });
        }
    };

    return (
        <LinearGradient
            colors={['#2c843e', '#205065']}
            style={styles.gradient}
        >
            <View style={styles.screen} >
                <KeyboardAvoidingView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableOpacity disabled={isLoading} onPress={() => props.navigation.navigate('Home')}>
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
                                        <Text style={styles.label}>Email ID or Mobile Number</Text>
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
                                        <MaterialCommunityIcons name={selected ? "checkbox-outline" : "checkbox-blank-outline"} size={24} color="white" />
                                        <Text style={styles.checkboxText}> Remember me</Text>
                                    </View>

                                    <TouchableOpacity disabled={isLoading} style={styles.verify} onPress={handleSubmit}>
                                        {isLoading ?
                                            <ActivityIndicator size={25} color="white" /> :
                                            <Text style={styles.verifyButton}>SIGN IN</Text>}
                                    </TouchableOpacity>

                                </View>
                            )}
                        </Formik>

                        <View style={styles.orData}>
                            <View style={styles.lines}></View>
                            <View><Text style={{ color: 'white', marginHorizontal: 15 }}> OR CONNECT WITH </Text></View>
                            <View style={styles.lines}></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 15, gap: 40 }}>
                            <TouchableOpacity onPress={() => promptAsync()}>
                                <Image source={require('../../assets/google_logo.png')} style={styles.GoogleLogo} />
                            </TouchableOpacity>
                            <Image source={require('../../assets/facebook_logo.png')} style={styles.FacebookLogo} />
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
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        width: '100%',
        padding: 20,
        paddingHorizontal: 30,
        flex: 1,
        marginTop: 30
    },
    skipText: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 16,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 200
    },
    GoogleLogo: {
        width: 40,
        height: 40
    },
    FacebookLogo: {
        width: 40,
        height: 40
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        color: 'white',
        marginBottom: 8,
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1C4858',
        borderColor: '#1e4c5e',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        color: 'white'
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
        fontWeight: '500',
        alignSelf: 'center'
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    checkbox: {
        flexDirection: 'row', alignItems: 'center'
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
    btntext: {
        color: "#fff",
        fontWeight: "bold"
    },
    signUpText: {
        color: 'white'
    },
    signUpLink: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4fd970'
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default SignIn;
