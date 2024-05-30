import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FilterContext } from './FilterContext';
import { useDispatch } from 'react-redux';
import * as filter from '../../store/actions/Products'


const SortByScreen = ({ route }) => {
  const { resData } = route.params;
  const deliveryTime = resData?.deliveryTimeFilter[0]?.delivery_time
  const dispatch = useDispatch();

  const sheetRef = useRef(null);
  const [value, setValue] = useState('');
  const [delivery, setDelivery] = useState('-Select Time-');
  const [sortValue, setSortValue] = useState('ASC');
  console.log("delivery time", delivery, sortValue)

  return (
    <View>
      <RadioButton.Group
        onValueChange={newValue => {
          setValue(newValue)
          // dispatch(filter.SortBy({deliveryTimeFilter: delivery}))
        }} value={value} >
        <View style={styles.radio_button}>
          <RadioButton value="first" color='#2c843e' />
          <Text>Delivery Time</Text>
        </View>
        {value == 'first' &&
          <TouchableOpacity onPress={() => sheetRef.current.open()}>
            <Text style={[styles.deliveryText, value === 'first' ? styles.selectedDeliveryText : null]}>{delivery}</Text>
          </TouchableOpacity>
        }
      </RadioButton.Group>

      <Text style={styles.sheetHeader}>Sort By Price</Text>
      <RadioButton.Group
        onValueChange={newValue => {
          setSortValue(newValue)
          dispatch(filter.SortBy({ deliveryTimeFilter: delivery, priceOrderFilter: newValue }))
        }

        } value={sortValue} >
        <View style={styles.radio_button}>
          <RadioButton value="ASC" color='#2c843e' />
          <Text>Price - Low to High</Text>
        </View>
        <View style={styles.radio_button}>
          <RadioButton value="DESC" color='#2c843e' />
          <Text>Price - High to Low</Text>
        </View>
      </RadioButton.Group>

      <RBSheet
        ref={sheetRef}
        customStyles={{ container: styles.sheet }}
        height={320}
        // draggable={true}
        // dragOnContent={true}
        closeDuration={350}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetHeader}>Delivery Time</Text>
          <ScrollView>

            <RadioButton.Group
              onValueChange={newValue => {
                setDelivery(newValue)
                dispatch(filter.SortBy({ deliveryTimeFilter: newValue, priceOrderFilter: sortValue }))
                sheetRef.current.close();
              }}
              value={delivery} >
              <View style={styles.radio_button}>
                <RadioButton value="" color='#2c843e' status='checked' disabled />
                <Text style={styles.sheetItems}>-Select Time-</Text>
              </View>
              {deliveryTime.map((item, index) => (
                <View style={styles.radio_button} key={index}>
                  <RadioButton value={item} color='#2c843e' />
                  <Text style={styles.sheetItems}>{item}</Text>
                </View>
              ))}

            </RadioButton.Group>
          </ScrollView>
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
    padding: 10,
    paddingTop: 10,
    paddingBottom: 0
  },
  deliveryText: {
    margin: 10,
    marginLeft: 40,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#2c843e',
    borderRadius: 5,
    marginTop: 5,
  },
  selectedDeliveryText: {
    color: '#2c843e',
    backgroundColor: 'white',
    fontSize: 15
  },
  sheet: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  sheetContent: {
    padding: 10,
    paddingBottom: 40
  },
  sheetHeader: {
    fontSize: 19,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  sheetItems: {
    fontSize: 15,
    fontWeight: '500'
  }
});
