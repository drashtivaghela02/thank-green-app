import { ScrollView, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert } from "react-native";
import React, { useEffect, useRef, useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { ACCOUNT } from "../../data/myaccount-data";
import { FontAwesome6 } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as userAction from '../../store/actions/User';
import ImagePicker from "../../Components/Image/ImagePicker";
import ProfileImage from "../../Components/Image/ProfileImage";
import { launchCameraAsync } from "expo-image-picker";
import * as authActions from '../../store/actions/Auth';
import { CommonActions, StackActions } from "@react-navigation/native";


const MyAccount = props => {
    const sheetRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
    const [imagePicker, setImagePicker] = useState(false);

    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(userAction.getInfo(accessToken))
            .then((response) => {
                setIsLoading(false);
                setImage(response?.data[0]?.profileImageUrl);
                console.log(response?.data[0]?.profileImageUrl)
            })
            .catch(error => {
                setIsLoading(false);
            });
    }, [accessToken]);

    const handleImagePicked = (imageUri) => {
        setImage(imageUri);
        setImagePicker(false)
        const formData = new FormData();

        formData.append('profileImage', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        dispatch(userAction.updateInfo(formData, accessToken)).then(response => {
            console.log('Personal info update : :: ', response);
            if (response.status === 'error') {
                Alert.alert("Alert!", response.msg || error)
                setIsLoading(false)
            }
            if (response.status === "success") {
                Alert.alert("Successs!", response.msg)
                setIsLoading(false)
            }
        })
    }
    const EditImageHandler = async () => {
        // try {
            const result = await launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.5,
            })
            console.log("Image result",result)
            if (result.canceled) {
                // throw new Error('Image picking cancelled')
                Alert.alert("Alert!", 'Image picking cancelled');
                // console.log('Image picking cancelled');
            } else {
                // setImage(result.assets[0].uri);
                handleImagePicked(result.assets[0].uri);
            } 
        // }
        // catch (err) {
            // Alert.alert("Alert", err)
// console.error("Image picking error",err)
        // }
    };

    const handleLogout = () => {
        props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'auth' }
              ],
            })
          );
        
        dispatch(authActions.signOut())
        console.log('logout');
        sheetRef.current.close();
    };

    const header = (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={EditImageHandler}>
                    <FontAwesome name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.40 }}>

                {image
                    ?
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.overlay}>{header}</View>
                    </View>
                    :
                    <LinearGradient
                        colors={['#2c843e', '#1e4c5e']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{ flex: 1 }}
                    >
                        {header}
                    </LinearGradient>
                }
            </View>

            {/* {imagePicker && <ProfileImage onImagePicked={handleImagePicked} />} */}
            {/* <View style={styles.bodyContainer}> */}

            <View style={styles.body}>
                {
                    ACCOUNT.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                                if (item.label === 'Logout') {
                                    sheetRef.current.open();
                                } else {
                                    props.navigation.navigate(item.screenName);
                                }
                            }}>
                                <View style={styles.firstContainer}>
                                    {item.leftIcon}
                                    <Text style={styles.textStyle}>{item.label}</Text>
                                </View>
                                {item.rightIcon}
                            </TouchableOpacity>
                            <Divider />
                        </View>
                    ))
                }
            </View>
            {/* </View> */}

            {/* Bottom Sheet for Logout */}
            <RBSheet
                ref={sheetRef}
                customStyles={{ container: styles.sheet }}
                height={320}
            >
                <View style={styles.sheetContent}>
                    <MaterialIcons
                        name="logout"
                        size={70}
                        color="#8e8e93"
                        style={{
                            alignSelf: 'center',
                            marginTop: 25
                        }} />

                    <Text style={styles.title}>Are you sure you want to logout?</Text>

                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>LOGOUT</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.spacer} />

                    <TouchableOpacity onPress={() => sheetRef.current.close()}>
                        <View style={styles.btnSecondary}>
                            <Text style={styles.btnSecondaryText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    );
};


export default MyAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e4c5e',
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    headerImage: {
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'absolute'
    },
    bodyContainer: {
    },
    body: {
        flex: 0.76,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        bottom: 0,
        // flex: 0.76,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        paddingTop: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: Dimensions.get('window').height * (15/807.3)
        // paddingTop: 28
    },
    firstContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        marginLeft: 15
    },


    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#181818',
        marginVertical: 25,
        textAlign: 'center',
        paddingHorizontal: 50
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        color: '#555',
        marginTop: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    spacer: {
        marginBottom: 12,
    },
    /** Sheet */
    sheet: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    sheetContent: {
        padding: 24,
        alignItems: 'stretch',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#2c843e',
        borderColor: '#2c843e',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    btnSecondary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        // paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    btnSecondaryText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#2c843e',
    },



});