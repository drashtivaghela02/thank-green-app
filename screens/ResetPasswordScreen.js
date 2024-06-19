import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import * as authActions from '../store/actions/Auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const ResetPasswordScreen = props => {
  const route = useRoute();
  const { token } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();


  console.log("getting token", token)
  handleSubmit = (newPassword,confirmPassword ) => {
    if (!newPassword && !confirmPassword) {
      Alert.alert('password is required');
      return;
    }
    dispatch(authActions.resetPassword(newPassword, token)).then((state) => {
      if (state.status === 'success') {
        setIsLoading(false);
        props.navigation.navigate('FormNavigator');
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

  return (
    <View style={styles.container} >
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      >
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={28} color='white' />
          <Text style={styles.heading}>Reset Password</Text>
          <Text style={styles.subHeading}>Enter the password</Text>
        </View>
      </LinearGradient>

      <View style={styles.body} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer} >
            <Image source={require('../assets/Secure_login-pana.png')} style={styles.logo} />
            <Text style={styles.bodyText}>Enter the passwords and secure your account.</Text>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={styles.email} >Enter new password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Text style={styles.email} >Confirm new password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.verify} onPress={() => handleSubmit(newPassword, setConfirmPassword)}>

            <Text style={styles.verifyButton}>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

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
    marginTop: 30
  },
  logo: {
    width: 280,
    height: 250
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#b4b4b4',
    // paddingTop: 20


  },
  email: {
    color: '#b4b4b4',
    fontSize: 16,
    marginTop: 20
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    paddingVertical: 6
  },
  verify: {
    marginTop: 20,
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
  submit: {
    marginVertical: 20
  },
  submitButton: {
    borderRadius: 10
  }
});