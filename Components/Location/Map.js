import React, { useState, useCallback, useLayoutEffect, useEffect } from "react";
import { Alert, Dimensions, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../UI/CustomHeader";
import { View } from "react-native";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { LinearGradient } from "expo-linear-gradient";


function Map({ route, navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const region = {
        latitude: 20.5937,   // Center lat, long of India
        longitude: 78.9629,  
        latitudeDelta: 23,    // vertical span of India
        longitudeDelta: 23,   // horizontal span of India
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
        ToastAndroid.show('Current Location picked !', ToastAndroid.SHORT); 

    };

    const selectLocationHandler = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log("Selected Latitude:", latitude); 
        console.log("Selected Longitude:", longitude); 
        setSelectedLocation({ latitude: latitude, longitude: longitude });
        ToastAndroid.show('Location picked !', ToastAndroid.SHORT); 
        
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
                   <LinearGradient
                colors={['#2c843e', '#1e4c5e']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.6, y: 1 }}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AntDesign name="arrowleft" size={28} color='white' onPress={savePickedLocationHandler} />
                        <FontAwesome name="save" size={24} color="white" onPress={savePickedLocationHandler} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, }}>
                        <Text style={styles.heading}>Map</Text>
                    </View>
                </View>
            </LinearGradient>


            {/* <CustomHeader label='Map' press={savePickedLocationHandler} /> */}
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
                        // pinColor="#2c843e"
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
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: Dimensions.get('window').height*0.17
      },
        heading: {
            fontWeight: '500',
            fontSize: 30,
            // paddingTop: 8,
            color: 'white',
        },
});