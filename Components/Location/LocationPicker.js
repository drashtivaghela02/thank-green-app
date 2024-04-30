import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import CustomHeader from '../UI/CustomHeader';
import { Dimensions } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AddressForm from '../Form/AddressForm';

function LocationPicker({ navigation }) {
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        console.log("Picked Location Updated:", pickedLocation);
    }, [pickedLocation]);



    const pickOnMapHandler = () => {
        navigation.navigate('Map', {
            onGoBack: (data) => {
                // Callback function to handle data from ScreenB
                setPickedLocation({
                    latitude: data.latitude,
                    longitude: data.longitude
                });
                console.log("Location picker screen back data", data)
                console.log(pickedLocation);
            },
        });
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
                    longitudeDelta: 0.0421
                }}
            >
                <Marker coordinate={pickedLocation} />
            </MapView>
        );
    }
    else {
        mapPreview = <Text>No Location Picked Yet</Text>;
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c843e', '#1e4c5e']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.6, y: 1 }}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AntDesign name="arrowleft" size={28} color='white' onPress={() => { navigation.goBack() }} />
                        <Feather name="search" size={24} color="white" onPress={pickOnMapHandler} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, }}>
                        <Text style={styles.heading}>Add New Address</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.mapPreview}>{mapPreview}</View>
            <View style={styles.body}>
                    <AddressForm /> 
                <View style={styles.actions}>
                </View>

            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e4c5e',
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: Dimensions.get('window').height * 0.17
    },
    heading: {
        fontWeight: '500',
        fontSize: 30,
        color: 'white',
    },
    body: {
        flex: 0.6,
        top: Dimensions.get('window').height * 0.34,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        position: 'relative',

    },
    mapPreview: {
        top: Dimensions.get('window').height * 0.17,
        bottom: Dimensions.get('window').height * 0.37,
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'absolute'
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
