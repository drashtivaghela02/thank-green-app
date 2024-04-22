import { MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

const SortByScreen = () => {
  const sheetRef = useRef(null);
  const [value, setValue] = useState('');
  const [delivery, setDelivery] = useState('-Select Time-');
  const handleLogout = () => {
    // Add logout logic here
    props.navigation.navigate('FormNavigator');
    console.log('logout');
    // Close the bottom sheet
    sheetRef.current.close();
  };

  return (
    <View>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
        <View style={styles.radio_button}>
          <RadioButton value="first" color='#2c843e' />
          <Text>Delivery Time</Text>
        </View>
        {value == 'first' &&
          <TouchableOpacity onPress={() => sheetRef.current.open()}>
            <Text style={[styles.deliveryText, value === 'first' ? styles.selectedDeliveryText : null]}>{delivery}</Text>
          </TouchableOpacity>
        }
        <View style={styles.radio_button}>
          <RadioButton value="second" color='#2c843e' />
          <Text>Price - Low to High</Text>
        </View>
        <View style={styles.radio_button}>
          <RadioButton value="third" color='#2c843e' />
          <Text>Price - High to Low</Text>
        </View>
      </RadioButton.Group>

      <RBSheet
        ref={sheetRef}
        customStyles={{ container: styles.sheet }}
        height={320}
      >
        <View style={styles.sheetContent}>
          <Text>Delivery Time</Text>
          <RadioButton.Group onValueChange={newValue => setDelivery(newValue)} value={delivery} >
            <View style={styles.radio_button}>
              <RadioButton value="07:00 AM to 09:30 AM" color='#2c843e' />
              <Text>07:00 AM to 09:30 AM</Text>
            </View>

            <View style={styles.radio_button}>
              <RadioButton value="09:30 AM to 11:00 AM" color='#2c843e' />
              <Text>09:30 AM to 11:00 AM</Text>
            </View>
            <View style={styles.radio_button}>
              <RadioButton value="11:00 AM to 07:30 AM" color='#2c843e' />
              <Text>11:00 AM to 07:30 AM</Text>
            </View>
            <View style={styles.radio_button}>
              <RadioButton value="07:30 AM to 10:00 AM" color='#2c843e' />
              <Text>07:30 AM to 10:00 AM</Text>
            </View>
          </RadioButton.Group>
        </View>
      </RBSheet>
    </View>
  );
};

export default SortByScreen;

const styles = StyleSheet.create({
  radio_button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  deliveryText: {
    margin: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2c843e',
    borderRadius: 5,
    marginTop: 5,
  },
  selectedDeliveryText: {
    color: '#2c843e',
    backgroundColor: 'white',
  },
});
