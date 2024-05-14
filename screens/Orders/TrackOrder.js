import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import StepIndicator from "react-native-step-indicator";
import * as orderAction from '../../store/actions/Orders';

import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const TrackOrder = (props) => {
  let status = props.route.params.status
  const Id = props.route.params.Id
  const [driver, setDriver] = useState([]);
  const [data, setData] = useState([
    { title: "Order Placed", status: "placed", time: "" },
    { title: "Packed", status: "packed", time: "" },
    { title: "Shipped", status: "shipped", time: "" },
    { title: "Delivered", status: "delivered", time: "" },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Set an initial value

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.trackInfo(Id, accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        console.log(response.data.status.order_status);
        setResponseData(response.data.status.order_status)
        setDriver(response.data.driverDetails)
        console.log("heya ahfielwh", responseData)
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert("Something Went Wrong!", error);
      });
  }, []);

  useEffect(() => {
    console.log("reeywvr", responseData);
    let newData = [...data];
    for (let i = 0; i < responseData?.length; i++) {
      let x = responseData[i].time;
      newData[i].time = days[new Date(x).getDay()] + ', ' + x.split(' ')[0]
    }
    setData(newData);
  }, [responseData]);


  if (isLoading) {
    <ActivityIndicator size='large' color='#2c843e' />
  }

  useEffect(() => {
    if (status === "placed") setCurrentPage(0);
    else if (status === "packed") setCurrentPage(1);
    else if (status === "shipped") setCurrentPage(2);
    else if (status === "delivered") setCurrentPage(3);
  }, [status]);


  const customStyles = {
    stepIndicatorSize: 12,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 3,
    stepStrokeCurrentColor: "#2c843e",
    stepStrokeFinishedColor: "#2c843e",
    stepStrokeUnFinishedColor: "#D4D4D4",
    separatorFinishedColor: "#2c843e",
    separatorUnFinishedColor: "#D4D4D4",
    stepIndicatorFinishedColor: "#2c843e",
    stepIndicatorUnFinishedColor: "#D4D4D4",
    stepIndicatorCurrentColor: "#2c843e",
    stepIndicatorLabelFontSize: 1,
    currentStepIndicatorLabelFontSize: 1,
    stepIndicatorLabelCurrentColor: "#2c843e",
    stepIndicatorLabelFinishedColor: "#2c843e",
    stepIndicatorLabelUnFinishedColor: "#2c843e",
    labelColor: "#999999",
    labelSize: 15,
    labelAlign: 'flex-start',
    currentStepLabelColor: "#2c843e",
  };
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <CustomHeader label="Track Order" press={() => props.navigation.goBack()} />
      <View style={{ height: 50, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#f1f0f5" }}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Order Number : {Id}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            stepCount={4}
            direction="vertical"
            currentPosition={currentPage}
            labels={data.map((item) => (
              <View key={item.title} style={styles.labelContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.timeText}>
                  {item.time}
                  {/* {days[new Date(item.time).getDay()]} {',' + item.time.split(' ')[0]} */}
                </Text>
              </View>))}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/Sample_User_Icon.png')} style={styles.image} />
          </View>
          <View>
            <Text style={styles.timeText}>Driver Details</Text>
            <Text style={styles.titleText}>{driver.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${driver.contact_number}`)}>
          <FontAwesome5 name="phone-alt" size={26} color='#2c843e' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingVertical: 20,
    marginVertical: 20,
    // backgroundColor: "white",
  },
  labelContainer: {
    flexDirection: 'column',
    marginTop: 10
  },
  titleText: {
    fontSize: 16, // Adjust title text size
    fontWeight: 'bold', // Adjust title text weight
    marginBottom: 5, // Adjust spacing between title and time
    textAlign: 'left', // Align title text to the left
    marginLeft: 10
  },
  timeText: {
    fontSize: 14, // Adjust time text size
    color: '#666', // Adjust time text color
    textAlign: 'left', // Align time text to the left
    marginLeft: 10
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: (Dimensions.get('window').height / 100) * 10,
    width: "100%",
    position: 'absolute',
    bottom: 0,
    elevation: 10,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white'
  },
  imageContainer: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1e4c5e',
  },
  image: {
    tintColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: '#1e486c',
    overflow: 'hidden',
  },
  stepIndicator: {
    flex: 0.6,
    // marginVertical: 0,
    // paddingHorizontal: 20,

  },
});

export default TrackOrder;
