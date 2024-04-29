import React, { useState, useCallback, useLayoutEffect, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../UI/CustomHeader";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Map({navigation}) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log("Selected Latitude:", latitude); // Log the latitude
        console.log("Selected Longitude:", longitude); 
        setSelectedLocation({ latitude, longitude });
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                "No Location Picked",
                "You have to pick a location"
            );
            return;
        }
        console.log("Selected Location:", selectedLocation)
        navigation.navigate('LocationPicker', { 
            pickedLocation: selectedLocation
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <Ionicons icon="save" color='black' size={24} onPress={savePickedLocationHandler} />
            )
        });
    }, [navigation, savePickedLocationHandler]);

    useEffect(() => {
        console.log(selectedLocation);
    }, [selectedLocation]);

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader label='Map' press={() => navigation.goBack()} />
            <MapView
                initialRegion={region}
                style={styles.map}
                onPress={selectLocationHandler}
            >
                {selectedLocation && (
                    <Marker
                        title="Picked Location"
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude
                        }}
                    />
                )}
            </MapView>
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
