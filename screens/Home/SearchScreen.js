import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { AntDesign, Feather } from "@expo/vector-icons";
import SearchBar from "../../Components/UI/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import CategoryFood from "../../Components/UI/CategoryFood";
import Colors from "../../Constant/Colors";
import SearchProducts from "../../Components/UI/SearchProducts";

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchCategoryList, setSearchCategoryList] = useState([]);
  const [searchProductList, setSearchProductList] = useState([]);
  const [searchSubCategoryList, setSearchSubCategoryList] = useState([]);
 
  const onCategorySelectHandler = (id, name) => {
    console.log("touched", id)
   props.navigation.navigate('CategoryProducts', {categoryId: id, name: name}) 
  }
  const onSubCategorySelectHandler = (id, subCategoryName) => {
    console.log("touched", id)

    props.navigation.navigate('ProductsListing', { SubCatId: id, SubCatName: subCategoryName })
  }
  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data })
  }
  let i = 0
  useEffect(() => {
    setIsLoading(true);
    console.log(searchPhrase, i)
    i = i + 1;
    dispatch(productAction.search('veget', accessToken))
      .then((response) => {
        console.log("search products data a=> ", response?.data)
        setSearchCategoryList(response?.data?.searchCategoryList)
        setSearchSubCategoryList(response?.data?.searchSubCategoryList)
        setSearchProductList(response?.data?.searchProductList)
        setIsLoading(false);
        // setResdata(response?.data);
      })
  }, [searchPhrase])
  let category;
  if (searchCategoryList?.length !== 0) {
    category = <FlatList
      data={searchCategoryList}
      keyExtractor={(item) => item.id}
      renderItem={itemData =>
        <CategoryFood
          param={itemData?.item}
          search
        onSelect={onCategorySelectHandler}
        />
      }
    />
  }
  let subcategory;
  if (searchSubCategoryList?.length !== 0) {
    subcategory = <FlatList
      data={searchSubCategoryList}
      keyExtractor={(item) => item.id}
      renderItem={itemData =>
        <CategoryFood
          param={itemData?.item}
          search
          subcat
        onSelect={onSubCategorySelectHandler}
        />
      }
    />
  }
  let products;
  if(searchProductList !=="No products found"){
 products = <FlatList
    data={searchProductList}
    keyExtractor={(item) => item.product_id}
    renderItem={itemData =>
      <SearchProducts
        param={itemData.item}
        onSelect={onProductSelectHandler}
        // onRemoveItem={() => { dispatch(cartItem.removeFromCart(`${itemData?.item?.product_id}-${itemData?.item?.quantity_variants[0].quantity_variant_id}`)) }}
      />
    }
  />}
  return (
    <View style={{ backgroundColor: 'white' }}>
      <CustomHeader label="Search" press={() => props.navigation.goBack()} />
      <View style={styles.container2}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        <AntDesign name="bars"
          size={28}
          color="white"
          style={{ backgroundColor: '#2c843e', padding: 5, borderRadius: 5 }}
          onPress={() => { props.navigation.navigate('Filters') }} />
        {/* <FontAwesome6 name="bars-staggered" size={24} color="white" onPress={() => { props.navigation.goBack() }} /> */}
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isLoading && <ActivityIndicator color={Colors.green} />}
        {category}
        {subcategory}
        {products}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width*1,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width*1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
})
export default SearchScreen;