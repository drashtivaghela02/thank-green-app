import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ImagePicker = (props) => {
    let imagePreview = <Image source={require('../../assets/Sample_User_Icon.png')} style={styles.image} tintColor='#2c843e' />;
    const [pickedImage, setPickedImage] = useState();
    async function takeImageHandler() {
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [4,4],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri)
        props.onImagePicked(image.assets[0].uri);
        console.log(image.assets[0].uri);
        // console.log(image);

    }
    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri : pickedImage}} />;
    }
    return(
        <View>
            <TouchableOpacity onPress={takeImageHandler}>
                <View style = {styles.imagePreview}>
                        {imagePreview}
                </View>
            </TouchableOpacity>  
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width : 150,
        height: 150,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1e4c5e',
        
    }
})