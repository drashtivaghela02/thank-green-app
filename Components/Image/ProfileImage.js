import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ImagePicker = (props) => {
    let imagePreview;
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

      <TouchableOpacity onPress={takeImageHandler} style={styles.imagePreview}>
        <Text>Please Click hereto click the Image ...</Text>
                        {imagePreview}

            </TouchableOpacity>  

    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width : '100%',
        height: '100%',
        // marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow:'hidden',
        // borderWidth: 1,
        // borderColor:'#1e4c5e'
    },
    image: {
      flex: 1,
      resizeMode: 'cover'
        
    }
})