import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import StepIndicator from "react-native-step-indicator";

const TrackOrder = (props) => {
  const status = props.route.params ? props.route.params.status : ''
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (status === "placed") setCurrentPage(1);
    else if (status === "packed") setCurrentPage(1);
    else if (status === "shipped") setCurrentPage(2);
    else if (status === "delivered") setCurrentPage(3);
  }, [status]);

  const data = [
    { title: "Order Placed", date: "12/13/1019" },
    { title: "Packed", date: "12/13/1019" },
    { title: "Shipped", date: "12/13/1019" },
    { title: "Delivered", date: "12/13/1019" },
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
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
      <CustomHeader label="Cancel Order" press={() => props.navigation.goBack()} />
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
            labels={data.map((item) => item.title)}
          />
        </View>
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
    backgroundColor: "white",
  },
  stepIndicator: {
    flex: 0.7,
    // marginVertical: 0,
    // paddingHorizontal: 20,
  },
});

export default TrackOrder;
