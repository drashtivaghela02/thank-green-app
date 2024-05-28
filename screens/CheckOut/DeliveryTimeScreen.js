import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import CustomHeader from '../../Components/UI/CustomHeader';
import Colors from '../../Constant/Colors';
import { Divider } from 'react-native-paper';

const DeliveryTimeScreen = () => {
  // Function to get the next 7 dates from the current date
  const getNextSevenDays = () => {
    const dates = [];
    let currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 10; i++) {
      const date = currentDate.getDate();
      const day = days[currentDate.getDay()];
      const month = months[currentDate.getMonth()];
      dates.push(`${month} ${date} ${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle date selection
  const handleDateSelection = (date) => {
    if (selectedDate === date && dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setSelectedDate(date);
      setDropdownOpen(true);
    }
  };

  // Function to generate time slots
  const timeSlots = ['06:00 to 08:00', '08:00 to 13:00', '07:30 to 13:00'];

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader label="Delivery Time" />
      <ScrollView style={{ backgroundColor: 'white', paddingBottom: 60 }}>
        {getNextSevenDays().map((item) => (
          <View key={item}>
            <TouchableOpacity onPress={() => handleDateSelection(item)}>
              <View style={{ flexDirection: 'row', height: Dimensions.get('window').width * 0.18 }}>
                <View style={{ backgroundColor: selectedDate === item ?'#2c843e': '#0e2b44', width: Dimensions.get('window').width * 0.19, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white' , fontSize: 17,fontWeight: '500',}}>{item.split(' ')[0]}</Text>
                  <Text style={{ color: 'white' , fontSize: 17 }}>{item.split(' ')[1]}</Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ paddingHorizontal: 20,fontWeight: '500', fontSize: 18 }}>{item.split(' ')[2]}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            {selectedDate === item && dropdownOpen && (
              <View style={{ paddingLeft: 20 }}>
                {timeSlots.map((slot, index) => (
                  <TouchableOpacity key={index} onPress={() => {}}>
                    <Text style={{ padding: 10, backgroundColor: '#d3d3d3', marginVertical: 2 }}>{slot}</Text>
                  </TouchableOpacity>
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
