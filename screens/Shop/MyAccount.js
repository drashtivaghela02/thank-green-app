import { ScrollView, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { ACCOUNT } from "../../data/myaccount-data";


const MyAccount = props => {

    const renderAccountItem = (item, index) => {
        console.log(item.screenName);
        return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => {props.navigation.navigate(item.screenName)}}>
            <View style= {styles.firstContainer}>
                {item.leftIcon}
                <Text style={styles.textStyle}>{item.label}</Text>         
            </View>
            {item.rightIcon}
        </TouchableOpacity>
        );
    }
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#2c843e', '#1e4c5e']}
          start={{x: 0.5, y: 0}}
              end={{ x: 0.5, y: 1 }}  
          style={{flex: 0.5}}    
      >
        <View style={styles.header}>
            <AntDesign name="arrowleft" size={28} color='white' />
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
        backgroundColor: 'white' 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 28
    },
    firstContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 16,
        marginLeft: 15
    }



});

