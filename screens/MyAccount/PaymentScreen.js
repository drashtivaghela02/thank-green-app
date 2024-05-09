import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import * as userAction from '../../store/actions/User';
import CreditCard from "../../Components/UI/CreditCard";


const PaymentScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState([]); 
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true); 
    dispatch(userAction.getCard(accessToken))
      .then((response) => {
        setIsLoading(false); 
        setCard(response.data); 
        // console.log(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert("Error fetching user information:", error);
      });
  }, [accessToken]);

  console.log("card ==>", card);

  const editcardHandler = (id, data) => {
    console.log("id in main screen", id, data)
    props.navigation.navigate('AddNewCard', {id: id, cardData: data})
  }


  let cardPreview;

  if (card.length === 0) {
    cardPreview = (<View style={styles.logoContainer} >
      <Image source={require('../../assets/Credit_Card_Payment-cuate.png')} style={styles.logo} />
      <Text style={styles.bodyMainText}>No Saved Cards</Text>
      <Text style={styles.bodyText}>All cards added will be saveed here.</Text>
      <Text style={styles.bodyText}>In case you want to edit them later.</Text>
    </View>)
  } else {
    cardPreview = (
      <FlatList
        data={card} // Passing curent order as data
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} // Adjust keyExtractor as per your data structure
        renderItem={itemData =>
          <CreditCard
            param={itemData.item}
            onEdit={editcardHandler}
          />}
      />
    )
  }


  return (
    <View style={styles.container} >
      <CustomHeader label='Payment' press={() => { props.navigation.goBack() }} />

      <View style={styles.body} >
        {isLoading
          ?
          <ActivityIndicator style={styles.body} color="#2c843e" size={"large"} />
          :
          (<View style={{ flex: 1, paddingTop: 20 }}>{cardPreview}</View>)
        }

        
          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('AddNewCard') }}>
            <Text style={styles.verifyButton}>ADD NEW CARD</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingBottom: 30,
  },
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 10
  },
  logoContainer: {
    justifyContent:'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#b4b4b4',
    // paddingVertical: 20
  },
  verify: {
    marginTop: 40,
    // marginBottom: 60,
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
    fontWeight: '400'

  },


});