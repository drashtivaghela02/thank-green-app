import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, ScrollView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import CustomHeader from '../UI/CustomHeader';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../store/actions/User';

function LocationPicker({ navigation, route }) {
    const data = route.params ? route.params.addressData : null;
    const editedAddress = route.params ? route.params.addressData.id : null
    
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [tag, setTag] = useState(editedAddress ? data.address_type : null)
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch();




    // console.log("locationpicker data =>>",(typeof data.zip_code))
    useEffect(() => {
        if (editedAddress) {
            setPickedLocation({
                latitude: data.latitude,
                longitude: data.longitude
            });
        }
    }, [editedAddress]); 

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



    const Validation = Yup.object({
        address: Yup.string()
            .required('*Address is Required'),
        zip_code: Yup.number()
            .min(6, 'Invalid Indian ZIP code')
            .required('*Zip Code is Required'),
        address_type: Yup.string()
            .required('*Select Address type')
    });

    const SubmitHandler = (values) => {
        setError(null);
        setIsLoading(true);
        if (pickedLocation === null) {
            Alert.alert("Map", "Pick your location to continue...")
            console.log('Not selected map :  =>>>>>>')
            setIsLoading(false)
            return
        }
        else {
            values.latitude = pickedLocation.latitude;
            values.longitude = pickedLocation.longitude;
        }
        // console.log(values)
        if (editedAddress) {

            try {
                dispatch(userAction.editAddress(editedAddress, values, accessToken)).then((state) => {
                    console.log("Staet edit address =====> ", state)
                    if (state.status == 'success') {
                        setIsLoading(false)
                        Alert.alert('Success!!', state.msg)
                        navigation.navigate('SavedAddresses')
                    }
                    else {
                        Alert.alert('Alert', state.msg || state.error || error, [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'OK' },
                        ])
                        setIsLoading(false)
                    }
                })
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        } else {
            try {
                dispatch(userAction.addNewAddress(values, accessToken)).then((state) => {
                    console.log("Staet sign up =====> ", state)
                    if (state.status == 'success') {
                        setIsLoading(false)
                        Alert.alert('Success!!', state.msg)
                        navigation.navigate('SavedAddresses')
                    }
                    else {
                        Alert.alert('Alert', state.msg || state.error || error, [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'OK' },
                        ])
                        setIsLoading(false)
                    }
                })
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }

        }
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
                        <Text style={styles.heading}>{editedAddress ? 'Edit Address' : 'Add New Address'}</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.mapPreview}>{mapPreview}</View>
            <View style={styles.body}>
                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{
                            address: editedAddress ? data.address : '',
                            zip_code: editedAddress ? data.zip_code : '',
                            address_type: editedAddress ? data.address_type : '',
                            landmark: editedAddress ? data.landmark : ''
                        }}
                        validationSchema={Validation}
                        onSubmit={SubmitHandler}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
                            <ScrollView contentContainerStyle={styles.body1}>
                                <View>
                                    <Text style={[styles.label]} >Street Name, Flat no.,Society/Office Name</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                        value={values.address}
                                    />
                                    {touched.address && errors.address ? (
                                        <Text style={styles.errorText}>{errors.address}</Text>
                                    ) : null}

                                    <Text style={styles.label} >Zip Code</Text>
                                    <TextInput
                                        keyboardType="number-pad"
                                        onChangeText={handleChange('zip_code')}
                                        onBlur={handleBlur('zip_code')}
                                        value={values.zip_code.toString()}
                                        style={styles.textInput}
                                    />
                                    {touched.zip_code && errors.zip_code ? (
                                        <Text style={styles.errorText}>{errors.zip_code}</Text>
                                    ) : null}

                                    <Text style={styles.label} >Nearest Landmark(Optional)</Text>
                                    <TextInput
                                        onChangeText={handleChange('landmark')}
                                        onBlur={handleBlur('landmark')}
                                        value={values.landmark}
                                        style={styles.textInput}
                                    />
                                    {touched.landmark && errors.landmark ? (
                                        <Text style={styles.errorText}>{errors.landmark}</Text>
                                    ) : null}

                                    <Text style={styles.sheetHeader}>Tag this address as:</Text>
                                    <RadioButton.Group
                                        onValueChange={newValue => {
                                            setTag(newValue)
                                        }}
                                        // value={editedAddress
                                        //     ? values.address_type = data.address_type
                                        //     : values.address_type = tag
                                        // }
                                        value={values.address_type = tag}
                                    >
                                        <View style={{ flexDirection: 'row', left: -10, gap: 20 }}>
                                            <View style={styles.radio_button}>
                                                <RadioButton value="Home" color='#2c843e' label='Home' />
                                                <Text style={styles.sheetItems}>Home</Text>
                                            </View>

                                            <View style={styles.radio_button}>
                                                <RadioButton value="Work" color='#2c843e' />
                                                <Text style={styles.sheetItems}>Work</Text>
                                            </View>
                                            <View style={styles.radio_button}>
                                                <RadioButton value="Other" color='#2c843e' />
                                                <Text style={styles.sheetItems}>Other</Text>
                                            </View>

                                        </View>
                                    </RadioButton.Group>
                                    {touched.address_type && errors.address_type ? (
                                        <Text style={styles.errorText}>{errors.address_type}</Text>
                                    ) : null}
                                </View>
                                <TouchableOpacity style={styles.verify} onPress={handleSubmit}>
                                    {isLoading ?
                                        <ActivityIndicator size={25} /> :
                                        <Text style={styles.verifyButton}>{editedAddress ? 'EDIT ADDRESS' : 'ADD ADDRESS'}</Text>
                                    }
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </Formik>
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
        height: (Dimensions.get('window').height / 100) * 53,
        width: "100%",
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        paddingHorizontal: 20,
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
    sheetHeader: {
        fontWeight: '600',
        fontSize: 16,
        paddingTop: 16
    },
    radio_button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5
    },
    body1: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    label: {
        color: '#b4b4b4',
        fontSize: 16,
        paddingTop: 15,
        fontWeight: '400',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#b4b4b4',
        fontSize: 16,
        padding: 3,
        fontWeight: '500',
    },
    verify: {
        marginBottom: 30,
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
    errorText: {
        color: 'red',
        // marginBottom: 5,
    },
});
