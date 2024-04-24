import { AntDesign, Fontisto, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';

const ContactUsScreen = props => {
  return (
    <View style={styles.container} >
      <CustomHeader label='Contact Us' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
        <ScrollView>
          <View>
            <View>
              <TouchableOpacity style={styles.itemContainer} onPress={() => { console.log('contact by email') }}>
                <View style={styles.firstContainer}>
                <Fontisto name="email" size={24} color="black" />
                  <Text style={styles.textStyle}>Contact by email</Text>
                </View>
              </TouchableOpacity>

              <View style={{ borderBottomWidth: 0.8, paddingVertical: 4, borderColor: '#eef1f4' }}></View>

              <TouchableOpacity style={styles.itemContainer} onPress={() => { console.log('contact by phone') }}>
                <View style={styles.firstContainer}>
                <MaterialIcons name="phone-android" size={24} color="black" />
                  <Text style={styles.textStyle}>Contact by phone</Text>
                </View>
              </TouchableOpacity>

              <View style={{ borderBottomWidth: 0.8, paddingVertical: 4, borderColor: '#eef1f4' }}></View>

              <View style={styles.secondContainer}>
                <Text style={styles.label1}>Customer Care</Text>
                <Text style={styles.label2}>800-234-2790</Text>
                <Text style={styles.label3}>For the quickest response time, we suggest calling between 1:00 pm and 5:00 pm CT.</Text>
                <View style={styles.label4}>
                  <Octicons name="clock" size={22} color="black" />
                  <Text style={styles.label4_text}>Hours of Operation</Text>
                </View>
                <View style={styles.label5}>
                  <View>
                    <Text style={styles.label5_header}>Days</Text>
                    <Text style={styles.label5_text}>Mon-Fri</Text>
                    <Text style={styles.label5_text}>Sat</Text>
                    <Text style={styles.label5_text}>Sun</Text>
                  </View>
                  <View>
                    <Text style={styles.label5_header}>Hours</Text>
                    <Text style={styles.label5_text}>6:00 am - 10:00 pm CT</Text>
                    <Text style={styles.label5_text}>6:00 am - 10:00 pm CT</Text>
                    <Text style={styles.label5_text}>6:00 am - 10:00 pm CT</Text>
                  </View>
                </View>
              </View>

              <View style={{ borderBottomWidth: 0.8, paddingVertical: 4, borderColor: '#eef1f4' }}></View>

              <View style={styles.secondContainer}>
                <Text style={styles.label1}>Customer Receivable</Text>
                <Text style={styles.label2}>800-234-2790</Text>
                <View style={styles.label4}>
                  <Octicons name="clock" size={22} color="black" />
                  <Text style={styles.label4_text}>Hours of Operation</Text>
                </View>
                <View style={styles.label5}>
                  <View>
                    <Text style={styles.label5_header}>Days</Text>
                    <Text style={styles.label5_text}>Mon-Fri</Text>
                  </View>
                  <View>
                    <Text style={styles.label5_header}>Hours</Text>
                    <Text style={styles.label5_text}>6:00 am - 10:00 pm CT</Text>
                  </View>
                </View>
              </View>

              <View style={{ borderBottomWidth: 0.8, paddingVertical: 4, borderColor: '#eef1f4' }}></View>

              <TouchableOpacity style={styles.itemContainer} onPress={() => { props.navigation.navigate('FAQ') }}>
                <View style={styles.firstContainer}>
                <MaterialCommunityIcons name="chat-question-outline" size={22} color="black" />
                  <Text style={styles.textStyle}>FAQ</Text>
                </View>
              </TouchableOpacity>

            </View>


          </View>

        </ScrollView>
      </View>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 30,
  },

  itemContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 11
    // paddingTop: 28
  },
  firstContainer: {
    flexDirection: 'row',
  },
  secondContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 11
  },
  label1: {
    fontSize: 22,
    fontWeight: '600'
  },
  label2: { fontSize: 16.5, color: '#2c843e', fontWeight: '600', paddingVertical: 5 },
  label3: { paddingVertical: 5, fontSize: 14, lineHeight:22 },
  label4: { flexDirection: 'row', paddingVertical: 10 },
  label4_text: {fontSize:16, paddingHorizontal: 10, fontWeight:'400'},
  label5: { flexDirection: 'row', gap: 50 },
  label5_header: { fontSize: 15.5, fontWeight: '600', paddingVertical: 5 },
  label5_text: { paddingVertical: 3},
  textStyle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight:'500',
  },

});