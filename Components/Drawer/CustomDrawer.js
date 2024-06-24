import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";
import { CATEGORY } from "../../data/category-data";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import SearchBar from "../UI/SearchBar";

const CustomDrawer = props => {

  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDetails, setShowDetails] = useState(Array(resData?.length).fill(false));

  const [SearchData, setSearchdata] = useState()
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getCategory(accessToken))
      .then((response) => {
        setIsLoading(false);
        setResdata(response?.data?.categoryList);
        setShowDetails(Array(response?.data.length).fill(false));
      })
      .catch(error => {
        setIsLoading(false);
        // console.error("Error fetching user information:", error);
        console.log("Error fetching user information:", error);
      });
  }, [accessToken])

  const searchFunction = (text) => {
    const updatedData = resData.filter((item) => {
      const item_data = `${item.category_name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchdata(updatedData)
    setSearchPhrase(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingTop: 0,
        }}
      >
        <LinearGradient
          colors={['#2c843e', '#1e4c5e']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.6, y: 1 }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.heading}>
              <Text
                style={styles.title}
              >Categories</Text>
              <Entypo name="menu" size={28} color="white" onPress={() => props.navigation.toggleDrawer()} />
            </View>
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('HomeSearch')}
              style={styles.searchBarContainer}>
              <Feather name="search" size={18} color="black" style={{ marginLeft: 1 }} />
              <Text style={{ fontSize: 17 }}>Search</Text>
            </TouchableOpacity> */}
            <View style={styles.body}>
              <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={searchFunction}
                clicked={clicked}
                setClicked={setClicked}
              />
            </View>
          </View>
        </LinearGradient>

        {(SearchData ?? resData)?.map((item, index) =>
          <View key={index}>
            {/* <TouchableOpacity > */}
            <TouchableOpacity style={styles.mainscreen} hitSlop={10}
              onPress={() => {
                setShowDetails(Array(resData?.length).fill(false));
                setSelectedCategory(item.category_id)
                setShowDetails(prevState => {
                  const newState = [...prevState];
                  newState[index] = !newState[index];
                  return newState;
                });
              }} >
              <View style={{ ...styles.imagePreview, ...{ borderWidth: 1, marginHorizontal: 10, borderRadius: 7, } }}>
                <Image style={styles.image} source={{ uri: item.category_image }} />
              </View>
              <View style={styles.textcontainer}>
                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '500' }}>{item.category_name}</Text>
                <TouchableOpacity
                >
                  {showDetails[index] ? <AntDesign name='up' size={16} color="#a6a6aa" /> : <AntDesign name='down' size={16} color="#a6a6aa" />}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* </TouchableOpacity> */}

            {showDetails[index] && item.category_id === selectedCategory && item.subcategories && (
              <View style={styles.subcategoryContainer}>
                {item.subcategories.map((subcategory, subIndex) => (
                  <TouchableOpacity key={subIndex} onPress={() => props.navigation.navigate('ProductsListing', { SubCatId: item.category_id, SubCatName: subcategory.subcategory_name })}>
                    <View style={styles.drawerItem}>
                      <Text style={{ fontSize: 16, fontWeight: '500', color: '#666' }}>{subcategory.subcategory_name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Divider />
          </View>
        )}
        <View style={{}}>
          {/* <DrawerItemList {...props} /> */}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: Dimensions.get('window').width * 0.85,
    paddingTop: 10
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.22,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    color: 'white',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  mainscreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e4c5e',

  },
  textcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5
    // marginHorizontal:10
  },
  drawerItem: {
    paddingVertical: 8,
    backgroundColor: 'white',
    paddingLeft: 50
    // flexDirection: 'row',
    // backgroundColor: '#a6a6aa'
  },
  questionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // marginBottom: 10,
    // paddingLeft: 10,
  },
})

export default CustomDrawer;