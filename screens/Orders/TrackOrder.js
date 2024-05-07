import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import StepIndicator from "react-native-step-indicator";
import * as orderAction from '../../store/actions/Orders';

import { useDispatch, useSelector } from "react-redux";

const TrackOrder = (props) => {
  let status = props.route.params.status
  const Id = props.route.params.Id
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
        console.log(response.data.order_status);
        setResponseData(response.data.order_status)
        console.log("heya ahfielwh", responseData)
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        console.error("Error fetching user information:", error);
      });
  }, []);

  // data = [
  //   { title: "Order Placed", status: "placed", time: "" },
  //   { title: "Packed", status: "packed", time: "" },
  //   { title: "Shipped", status: "shipped", time: "" },
  //   { title: "Delivered", status: "delivered", time: "" },
  // ];
  useEffect(() => {
    console.log("reeywvr", responseData); 
    let newData = [...data]; // Create a copy of the existing data array
    for (let i = 0; i < responseData.length; i++) {
      newData[i].time = responseData[i].time;
    }
    setData(newData);
  }, [responseData]);


  if (isLoading) {
    <ActivityIndicator size='large' color='#2c843e' />
  }


  useEffect(() => {
    if (status === "placed") setCurrentPage(1);
    else if (status === "packed") setCurrentPage(1);
    else if (status === "shipped") setCurrentPage(2);
    else if (status === "delivered") setCurrentPage(3);
  }, [status]);


  const customStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize: 20,
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
    currentStepLabelColor: "#2c843e",
  };

  return (
    <View style={styles.container}>
      <CustomHeader label="Track Order" press={() => props.navigation.goBack()} />
      <View style={{ height: 50, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#f1f0f5" }}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Order Number : 406-7288</Text>
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
                <Text style={styles.timeText}>{item.time}</Text>
              </View>))}
          />
        </View> 
      </View>
      {/* <View style={styles.bottomView}>
        <Text>call now</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 0.8,
    paddingHorizontal: 30,
    // paddingVertical: 20,
    marginVertical: 20,
    backgroundColor: "white",
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 16, // Adjust title text size
    fontWeight: 'bold', // Adjust title text weight
    marginBottom: 5, // Adjust spacing between title and time
    textAlign: 'left', // Align title text to the left
  },
  timeText: {
    fontSize: 14, // Adjust time text size
    color: '#666', // Adjust time text color
    textAlign: 'left', // Align time text to the left
  },
  bottomView: {
    flex: 0.2,
    height: (Dimensions.get('window').height / 100) * 20,
    width: "100%",
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
  },

  stepIndicator: {
    flex: 0.7,
    // marginVertical: 0,
    // paddingHorizontal: 20,
  },
});

export default TrackOrder;
