import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SetPasswordScreen = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Validate new password and confirmation
    if (!newPassword || !confirmPassword) {
      Alert.alert('Please enter a new password and confirm it');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Call your API to reset password using token and new password
    // Replace with your API call logic
    console.log('Token:', token);
    console.log('New Password:', newPassword);

    // Navigate back to HomeScreen or wherever needed
    // navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default SetPasswordScreen;
