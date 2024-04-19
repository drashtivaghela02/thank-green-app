import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView } from 'react-native';
import CustomHeader from '../../Components/UI/CustomHeader';
import * as CardValidator from 'card-validator';

const AddNewCardDetailsScreen = props => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [value, setValue] = useState(false)

  const handleAddCard = () => {
    // Perform validation
    const cardNumberValidation = CardValidator.number(cardNumber);
    if (!cardNumberValidation.isValid) {
      Alert.alert('Error', 'Please enter a valid card number.');
      return;
    }

    const expirationDateValidation = CardValidator.expirationDate(expirationDate);
    if (!expirationDateValidation.isValid) {
      Alert.alert('Error', 'Please enter a valid expiration date.');
      return;
    }

    const cvvValidation = CardValidator.cvv(cvv, 3);
    if (!cvvValidation.isValid) {
      Alert.alert('Error', 'Please enter a valid CVV.');
      return;
    }

    if (!cardHolder.trim()) {
      Alert.alert('Error', 'Please enter the cardholder name.');
      return;
    }

    // If validation passes, proceed to add the card
    console.log('Adding card...');
  };

  return (
    <View style={styles.container}>
      <CustomHeader label="Add New Card" press={() => props.navigation.goBack()} />

      <View style={styles.body}>
        <View>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
            placeholder='1234 1234 1234 1234'
          />

          <Text style={styles.label}>Valid Until (MM/YYYY)</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            style={styles.textInput}
            value={expirationDate}
            onChangeText={text => setExpirationDate(text)}
            placeholder='MM/YYYY'
          />

          <Text style={styles.label}>CVV</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            value={cvv}
            onChangeText={text => setCVV(text)}
            place
          />

          <Text style={styles.label}>Card Holder</Text>
          <TextInput
            style={styles.textInput}
            value={cardHolder}
            onChangeText={text => setCardHolder(text)}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Make this my default payment method</Text>
            <Switch
              trackColor={{ true: '#2c843e' }}
              thumbColor='white'
              value={value}
              onValueChange={(value) => setValue(value)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.verify} onPress={handleAddCard}>
          <Text style={styles.verifyButton}>ADD CARD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 30
  },
  label: {
    color: '#b4b4b4',
    fontSize: 16,
    paddingTop: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 18,
    padding: 3,
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
    fontWeight: '500',
  },
  switchLabel: {
    // color: '#b4b4b4',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
});

export default AddNewCardDetailsScreen;
