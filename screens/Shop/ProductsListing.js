import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import React from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import Products from "../../Components/UI/Products";
import * as cartItem from '../../store/actions/Cart'
import CartIcon from "../../Components/UI/CartIcon";
import Colors from "../../Constant/Colors";
import usePagination from "../../Components/UI/usePagination";
import SearchBar from "../../Components/UI/SearchBar";
const INITIAL_PAGE = 1;

const ProductsListing = props => {
  const SubCategoryId = props?.route?.params?.SubCatId;
  const name = props?.route?.params?.SubCatName;
  console.log("hello", SubCategoryId, name)

  const accessToken = useSelector(state => state?.auth?.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [resData, setResdata] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [SearchData, setSearchdata] = useState()
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetchProductData = (page) => {
    setIsLoading(true);
    dispatch(productAction.getProductsFromSubCat(SubCategoryId, page, accessToken))
      .then((response) => {
        setResdata((prevData) => [...prevData, ...response?.data?.products]);
        setIsLoading(false);
        setProductCount(response?.data?.total_products)
        console.log("sgdagfv xzv=> ", response?.data)
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }

  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: fetchProductData,
    totalPages: Math.ceil(productCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
   fetchProductData(INITIAL_PAGE)
  }, [accessToken])

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data })
  }

  const searchFunction = (text) => {
    const updatedData = resData.filter((item) => {
      const item_data = `${item?.product_title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchdata(updatedData)
    setSearchPhrase(text);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.6, y: 1 }}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AntDesign name="arrowleft" size={28} color='white' onPress={() => { props.navigation.goBack() }} />
            <CartIcon press={() => { props.navigation.navigate('CheckOut') }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, }}>
            <Text numberOfLines={1} style={styles.heading}>{name}</Text>
            <MaterialIcons name="filter-list" size={28} color="white" onPress={() => { props.navigation.navigate('Filters') }} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
      <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={searchFunction}
          clicked={clicked}
          setClicked={setClicked}
        />
      {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={40} color ={Colors.green} />
          </View>
        ) : (resData?.length === 0 || resData === 'No Products found') ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>No products available for this category ..</Text>
          </View>
        ) 
          : (<View style={{ flex: 1, width: '100%' }}>
            <FlatList
              data={SearchData ?? resData}
              keyExtractor={(item) => item.product_id}
              renderItem={itemData =>
                <Products
                  param={itemData.item}
                  onSelect={onProductSelectHandler}
                  onRemoveItem={() => { dispatch(cartItem.removeFromCart(`${itemData?.item?.product_id}-${itemData?.item?.quantity_variants[0]?.quantity_variant_id}`)) }}
                />
              }
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.green} /> : null}
            />
          </View>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10

    // paddingHorizontal: 30,
  },
  image: {
    width: '100%',
  },
  btnSecondary: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
  },
  textStyle: {
    fontSize: 19,
    // lineHeight: 26,
    fontWeight: '500',
    color: 'white',
    padding: 8,
    alignSelf: 'center'
  }
});

export default ProductsListing;