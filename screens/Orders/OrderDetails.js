import { AntDesign, Feather, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";

const OrderDetails = (props) => {
  return (
    <View style={styles.container}>
      <CustomHeader label='Order Details' press={() => props.navigation.goBack()} />

      <ScrollView>
        <View style={styles.body}>


        <View style={styles.card}>
          <View style={[styles.detail, { gap: 10 }]}>
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>Order Date : </Text>
              <Text style={styles.title}>Order Number : </Text>
              <Text style={styles.title}>Order Status</Text>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={styles.subTitle}>18th March 2020</Text>
              <Text style={styles.subTitle}>406-7288</Text>
              <Text style={styles.subTitle}>Order Delivered</Text>

            </View>
          </View>
        </View>


        {/* Card 2 */}
        <Text style={styles.headingTitle}>Product Details</Text>
        <View style={styles.card}>
        <View style={styles.mainscreen}>
            <View style={{...styles.imagePreview,...{ borderWidth: 2, marginHorizontal: 10, borderRadius: 7, borderColor: 'black' }}}>
                <Image style={styles.image} />
            </View>
            <View style={styles.textcontainer}>
                <Text style={{ fontSize: 19, fontWeight: '500' }}>Fresho carrot</Text>
            </View>
        </View>
        </View>

        
        {/* Card 3 */}
        <Text style={styles.headingTitle}>Delivery Address</Text>
        <View style={[styles.card, { height: 90 }]}>
          <View style={[styles.detail, { gap: 10 }]}>
            <View>
              {/* <FontAwesome6 name="map-pin" size={24} color="green" /> */}
             <Image source={require('../../assets/location-pin.png')} style={{height: 40, width: 15 }} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>Home - Deo House </Text>
              <Text style={[styles.subTitle, {fontSize: 12}]}>132,My Street, Kingdom, New York, 12401 United States </Text>

            </View>
          </View>
        </View>


        {/* Card4 */}

        <Text style={styles.headingTitle}>Delivery Date and Time</Text>
        <View style={[styles.card, { height: 80 }]}>
          <View style={[styles.detail, { gap: 7 }]}>
            <View style={{ gap: 8 }}>
              <Fontisto name="date" size={20} color="black" />
              <Fontisto name="clock" size={20} color="black" />

            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>Delivery Date : </Text>
              <Text style={styles.title}>Delivery Time : </Text>

            </View>

            <View style={{ gap: 8 }}>
              <Text style={styles.subTitle}>Wed 9 Sep 2019</Text>
              <Text style={styles.subTitle}>07:30AM to 01:00 PM</Text>
            </View>
          </View>
        </View>




          <View>
          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('ReportIssue'); }}>
            <Text style={styles.verifyButton}>REPORT ISSUE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('TrackOrder'); }}>
            <Text style={styles.verifyButton}>TRACK ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verify1} onPress={() => { props.navigation.navigate('CancelOrder'); }}>
            <Text style={styles.verifyButton1}>Cancel Order</Text>
          </TouchableOpacity>

          </View>
          </View>
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  body: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#f1f0f5',
    // marginBottom: 30
  },
  card: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center'

  },
  mainscreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 5
},
imagePreview:{
    width : 80,
    height: 80,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow:'hidden',
    borderWidth: 1,
    borderColor: 'white'
},
image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e4c5e',
    
},
// imageContainer: {
    
// }
// image: {
//     width: 80,
//     height: 80,
//     resizeMode: 'contain',
//     tintColor: 'red'
// },
textcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5
    // marginHorizontal:10
},
  headingTitle: {
    fontWeight: '700',
    fontSize: 17,
    paddingVertical: 10
  },
 
  detail: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    // gap: 10
  },
  title: {
    fontWeight: '500',
    fontSize: 14
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#888',
    paddingRight: 10
  },



  verify: {
    marginTop: 10,
    // marginBottom: 60,
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


  verify1: {
    marginTop: 10,
    // marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton1: {
    color: '#2c843e',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
});

export default OrderDetails;