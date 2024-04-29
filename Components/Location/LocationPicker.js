import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CustomHeader from '../UI/CustomHeader';

function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        console.log(route)
        if (isFocused && route.params && route.params.pickedLat !== undefined && route.params.pickedLng !== undefined) {
            const mapPickedLocation = {
                latitude: route.params.pickedLat,
                longitude: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [isFocused, route]);

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
        setPickedLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    let mapPreview = <Text>No Location Picked Yet</Text>;

    if (pickedLocation) {
        mapPreview = (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: pickedLocation.latitude,
                    longitude: pickedLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                <Marker coordinate={pickedLocation} />
            </MapView>
        );
    }

    return (
        <View>
            <CustomHeader label='Saved Address' press={() => navigation.goBack()} />
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
