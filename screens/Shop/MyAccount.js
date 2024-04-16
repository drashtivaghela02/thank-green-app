import { ScrollView, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useRef, useEffect } from 'react';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { ACCOUNT } from "../../data/myaccount-data";
import { FontAwesome6 } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';

const MyAccount = props => {
    const sheet = useRef(null); // Initialize the ref with null

    useEffect(() => {
        if (sheet.current) {
            sheet.current.open(); // Check if ref is defined before calling open()
        }
    }, [sheet.current]); // Add sheet.current as a dependency

    const renderAccountItem = (item, index) => {

        const handleLogOut = () => {

            return (
                <RBSheet
                    customStyles={{ container: styles.sheet }}
                    height={360}
                    // openDuration={250}
                    ref={sheet}>
                    <View style={styles.sheetContent}>
                        <MaterialIcons
                            name="logout"
                            size={48}
                            color="#2c843e"
                            style={{
                                alignSelf: 'center',
                            }} />


                        <Text style={styles.title}>Are you sure you want to logout?</Text>

                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.spacer} />

                        <TouchableOpacity
                            onPress={() => {
                                sheet.current.close();
                            }}>
                            <View style={styles.btnSecondary}>
                                <Text style={styles.btnSecondaryText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            );
            console.log('logout')
        }

        console.log(item.screenName);
        return (
            <View>
                <TouchableOpacity style={styles.itemContainer} onPress={() => {
                    if (item.label == 'Logout') {
                        handleLogOut()
                        sheet.current.open();
                    }
                    else {
                        props.navigation.navigate(item.screenName)
                    }
                }}>
                    <View style={styles.firstContainer}>
                        {item.leftIcon}
                        <Text style={styles.textStyle}>{item.label}</Text>
                    </View>
                    {item.rightIcon}
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.8, paddingVertical: 4, borderColor: '#eef1f4' }}></View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c843e', '#1e4c5e']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 0.5 }}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <AntDesign name="arrowleft" size={28} color='white' />
                        <FontAwesome6 name="edit" size={24} color="white" />
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.body}>
                {
                    ACCOUNT.map(renderAccountItem)
                }
            </View>
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
        // height: Dimensions.get('window').height*0.30
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        paddingTop: 8
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 11
        // paddingTop: 28
    },
    firstContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 16,
        marginLeft: 15
    },












    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#181818',
        marginTop: 16,
        textAlign: 'center',
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
    /** Placeholder */
    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 24,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Sheet */
    sheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
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
        backgroundColor: '#2b64e3',
        borderColor: '#2b64e3',
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    btnSecondaryText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#2b64e3',
    },



});