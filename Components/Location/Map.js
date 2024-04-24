import { Ionicons } from "@expo/vector-icons";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../UI/CustomHeader";
import { View } from "react-native";

function Map({navigation}) {
    const [selectedLocation, setSelectedLoction] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    function selectLocationHandler(event) {
        // console.log(event);
        const lat =  event.nativeEvent.coordinate.latitude;
        const lng =  event.nativeEvent.coordinate.longitude;
        setSelectedLoction({lat : lat, lng: lng})
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation){
            Alert.alert(
                "No Location Picked",
                "You have to pick a location"
            );
            return;
        }

        navigation.navigate('AddPlace', { 
            pickedLat : selectedLocation.lat,
            pickedLng : selectedLocation.lng
        })
        
    },[navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight : ({tintColor}) => {
                return <Ionicons icon ="save" color='black' size={24} onPress={savePickedLocationHandler} />;
            }
        });
    },[navigation, savePickedLocationHandler])
  return (
      <View style={{flex:1}}>
      <CustomHeader label='Map' />
        <MapView
            initialRegion={region}
            style={styles.map}
            onPress={selectLocationHandler}
        >
            {selectedLocation && <Marker
                title="Picked Location"
                coordinate={{
                    latitude: selectedLocation.lat, 
                    longitude: selectedLocation.lng}} 
            />}
        </MapView>
      </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    map : {
        flex : 1
    }
})