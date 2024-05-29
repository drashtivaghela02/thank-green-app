import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import CustomHeader from '../../Components/UI/CustomHeader';
import Colors from '../../Constant/Colors';
import { Divider } from 'react-native-paper';

const DeliveryTimeScreen = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const timeSlots = ['09:00 to 10:00', '10:00 to 11:00', '11:00 to 12:00', '12:00 to 01:00', '01:00 to 02:00', '02:00 to 03:00', '03:00 to 04:00', '04:00 to 05:00', '05:00 to 06:00'];

  const getNextTenDays = () => {
    const dates = [];
    let currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 10; i++) {
      const date = currentDate.getDate();
      const day = days[currentDate.getDay()]; //currentDate.toDateString();
      const shortDay = currentDate.toDateString();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const mon = currentDate.getMonth();

      dates.push(`${day} ${month} ${date} ${shortDay} ${year}-${String(mon).padStart(2,'0')}-${date}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const saveDateTimeHandler = useCallback(() => {
    if (!selectedTime || !selectedDate) {
      Alert.alert(
        "Delivery Times",
        "You have to pick Date and Time slot"
      );
      return;
    }
    console.log("Selected Date", selectedDate, selectedTime)

    props.route.params.onGoBack(selectedTime, selectedDate);
    props.navigation.goBack();

  }, [selectedDate, selectedTime]);

  const handleDateSelection = (date) => {
    if (selectedDate === date && dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setSelectedDate(date);
      setDropdownOpen(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader label="Delivery Time" press={saveDateTimeHandler} />
      <ScrollView style={{ backgroundColor: 'white', paddingBottom: 60 }}>
        {getNextTenDays().map((item) => (
          <View key={item}>
            <TouchableOpacity onPress={() => handleDateSelection(item)}>
              <View style={{ flexDirection: 'row', height: Dimensions.get('window').width * 0.18 }}>
                <View style={{ backgroundColor: selectedDate === item ? '#2c843e' : '#0e2b44', width: Dimensions.get('window').width * 0.19, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 17, fontWeight: '500', }}>{item.split(' ')[1]}</Text>
                  <Text style={{ color: 'white', fontSize: 17 }}>{item.split(' ')[2]}</Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ paddingHorizontal: 20, fontWeight: '500', fontSize: 18 }}>{item.split(' ')[0]}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            {selectedDate === item && dropdownOpen && (
              <View style={{ paddingHorizontal: 20 , padding: 10, gap: 10,}}>
                {timeSlots.map((slot, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    onPress={() => { setSelectedTime(slot) }}>
                    <Text style={{ backgroundColor: 'white', marginVertical: 2,fontSize:15 , fontWeight:'500', paddingLeft: 30}}>{slot}</Text>
                    <TouchableOpacity
                      onPress={() => { setSelectedTime(slot) }}>
                      <View style={{ backgroundColor: '#2c843e' , padding: 5, paddingHorizontal: 20, borderRadius:7}}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>SELECT</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DeliveryTimeScreen;