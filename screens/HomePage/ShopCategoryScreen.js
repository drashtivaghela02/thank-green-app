import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from "react-native";
import CustomHeader from '../../Components/UI/CustomHeader';
import SearchBar from '../../Components/UI/SearchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import List from '../../Components/UI/List';
import CategoryFood from '../../Components/UI/CategoryFood';

const ShopCategoryScreen = props => {

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);


  return (
    <View style={styles.container} >
      <CustomHeader label='Shop' press={() => { props.navigation.goBack() }} />


      <View style={styles.body}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        {/* {!clicked && (
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
        )} */}
        <View style={{flex:1}}>
          <ScrollView style={{ height: Dimensions.get('screen').height, width: Dimensions.get('window').width }} contentContainerStyle={styles.categoryScreen}>
            
            <CategoryFood text='Fruits & Vegetables' bordercolor='#4b6b88' onPress={() => {props.navigation.navigate('CategoryList')}} />
          <CategoryFood text='Eggs, Meat and Fish' bordercolor='#5cb986' />
          <CategoryFood text='Beverages' bordercolor='#f2ae3a' />
          <CategoryFood text='Baker, Cakes & Dairy' bordercolor='#c0e15c' />
          <CategoryFood text='Foodgrains & Spices' bordercolor='#4b6b88' />
          <CategoryFood text='Snacks' bordercolor='#4b6b88' imagepath= 'https://res.cloudinary.com/djuz5lkbf/image/upload/v1712557897/ThankGreen/vqzfbuarl0hzvrm5efzl.jpg' />
        </ScrollView>

        </View>
      </View>
    </View>
  );
};

export default ShopCategoryScreen;

const styles = StyleSheet.create({
  categoryScreen: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#f1f0f5',
    gap: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  logo: {
    width: 280,
    height: 280
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#b4b4b4',
    paddingVertical: 20


  },
  email: {
    color: '#b4b4b4',
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    paddingVertical: 6
  },
  verify: {
    marginTop: 40,
    marginBottom: 60,
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
  submit: {
    marginVertical: 20
  },
  submitButton: {
    borderRadius: 10
  }
});