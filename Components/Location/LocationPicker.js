import React from 'react';
import { Image, StyleSheet, Text, View, Alert, Button } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState();

    const navigation = useNavigation();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync({});
        console.log(location);
        setPickedLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let mapPreview = <Text>No Location Picked Yet</Text>;

    if (pickedLocation) {
        mapPreview = (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: pickedLocation.latitude,
                    longitude: pickedLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={pickedLocation} />
            </MapView>
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{mapPreview}</View>
            <View style={styles.actions}>
                <Button onPress={getLocationHandler} title='Locate User' />
                <Button onPress={pickOnMapHandler} title='Pick on Map' />
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
