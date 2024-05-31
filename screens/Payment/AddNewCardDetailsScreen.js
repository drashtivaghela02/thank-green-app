import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView, ActivityIndicator } from 'react-native';
import CustomHeader from '../../Components/UI/CustomHeader';
import * as CardValidator from 'card-validator';
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';

const AddNewCardDetailsScreen = ({ navigation, route }) => {
  const data = route.params ? route.params.cardData : null;
  const editedCard = route.params ? route.params.cardData.id : null
  console.log("dfjoigj;", editedCard, data)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

  const [cardNumber, setCardNumber] = useState(editedCard ? String(data.number) : '');
  const [expirationDate, setExpirationDate] = useState(editedCard ? data.expiry : '');
  const [cvv, setCVV] = useState(editedCard ? String(data.cvv) : '');
  const [cardHolder, setCardHolder] = useState(editedCard ? data.holder_name : '');
  const [value, setValue] = useState(false)

  const handleAddCard = () => {
    // Perform validation
    const cardNumberValidation = CardValidator.number(cardNumber);
    if (!cardNumberValidation.isValid) {
      Alert.alert('Error', 'Please enter a valid card number.');
      return;
    }

    if (cardNumberValidation.card) {
      console.log(cardNumberValidation.card.type); // 'visa'
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

    console.log(cardNumber, expirationDate, cvv, cardHolder, value);

    let values = {
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      cardHolder: cardHolder,
      value: value
    }

    setError(null);
    setIsLoading(true);
    if (editedCard) {
      try {
        dispatch(userAction.editCard(editedCard, values, accessToken)).then((state) => {
          console.log("Staet edit address =====> ", state)
          if (state.status == 'success') {
            setIsLoading(false)
            Alert.alert('Success!!', state.msg)
            navigation.navigate('PaymentScreen')
            
          }
          else {
            Alert.alert('Alert', state.msg || state.error || error, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK' },
            ])
            setIsLoading(false)
          }
        })
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    else {
      try {
        dispatch(userAction.addNewCard(values, accessToken)).then(response => {
            if (response.status === 'error') {
              setIsLoading(false)
              Alert.alert("Alert!", response.msg || error)
            }
            if (response.status === "success") {
              setIsLoading(false)
              navigation.navigate('PaymentScreen')
              Alert.alert('Success!', response.msg)
            }
          })
      }
      catch (error) {
        console.error('Add new card error!! : ', error)
        setError(error.message);
        setIsLoading(false);
      };
    };
  }

  return (
    <View style={styles.container}>
      <CustomHeader label={editedCard ? "Edit Card" : "Add New Card"} press={() => navigation.goBack()} />

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
          {isLoading
            ? <ActivityIndicator size={27} color="white" />
            :<Text style={styles.verifyButton}>{editedCard ? 'EDIT CARD' : 'ADD CARD'}</Text>}
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
    width: 300
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    // marginRight : 5
  },
});

export default AddNewCardDetailsScreen;
