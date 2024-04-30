import React, { useState, useCallback, useLayoutEffect, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../UI/CustomHeader";
import { View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';


function Map({ route, navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const region = {
        latitude: 20.5937,   // Center latitude of India
        longitude: 78.9629,  // Center longitude of India
        latitudeDelta: 25,    // Adjust this value to include the entire vertical span of India
        longitudeDelta: 25,   // Adjust this value to include the entire horizontal span of India
    };
    
    const getLocationHandler = async () => {
        const { status } = locationPermissionInformation;
        if (status !== PermissionStatus.GRANTED) {
            const permissionResponse = await requestPermission();
            if (permissionResponse.status !== PermissionStatus.GRANTED) {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant location permissions to use this app.'
                );
                return;
            }
        }
        const location = await getCurrentPositionAsync({});
        setSelectedLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    const selectLocationHandler = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log("Selected Latitude:", latitude); // Log the latitude
        console.log("Selected Longitude:", longitude); 
        setSelectedLocation({latitude: latitude, longitude: longitude });
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

        route.params.onGoBack(selectedLocation);
        navigation.goBack();
        
    }, [navigation, selectedLocation]);

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader label='Map' press={savePickedLocationHandler} />
            <View style={{ height: 50, justifyContent: 'center' }} >
                <TouchableOpacity onPress={getLocationHandler} style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 10}}>
                <MaterialIcons name="my-location" size={28} color="black" />
                <Text style={{fontSize: 18}}>Use current location </Text>
                </TouchableOpacity>
            </View>
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
