import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../Components/UI/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import CategoryFood from "../../Components/UI/CategoryFood";
import Colors from "../../Constant/Colors";
import SearchProducts from "../../Components/UI/SearchProducts";
import CategoryFoodHome from "../../Components/UI/CategoryFoodHome";
import usePagination from "../../Components/UI/usePagination";
import { ScrollView } from "react-native-gesture-handler";

const INITIAL_PAGE = 1;

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchCategoryList, setSearchCategoryList] = useState([]);
  const [searchProductList, setSearchProductList] = useState([]);
  const [searchSubCategoryList, setSearchSubCategoryList] = useState([]);
  const [filterProductCount, setFilterProductCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const onCategorySelectHandler = (id, name) => {
    props.navigation.navigate('CategoryProducts', { categoryId: id, name: name });
  };

  const onSubCategorySelectHandler = (id, subCategoryName) => {
    props.navigation.navigate('ProductsListing', { SubCatId: id, SubCatName: subCategoryName });
  };

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data });
  };

  const applyFilter = (sorted, page) => {
    setIsLoading(true);
    dispatch(productAction.applyFilter(sorted, page, accessToken))
      .then((response) => {
        setSearchCategoryList('No category found');
        setSearchSubCategoryList('No subcategory found');
        setSearchProductList((prevData) => page === 1 ? response?.data?.filterProducts : [...prevData, ...response?.data?.filterProducts]);
        setFilterProductCount(response?.data?.total_filter_products);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });

    if (filterProductCount > 10) {

    }
  };

  const filterHandler = () => {
    if(searchPhrase){
    props.navigation.navigate('Filters', {
      onGoBack: (sorted) => {
        if (searchPhrase) {
          sorted.searchText = searchPhrase;
        }
        applyFilter(sorted, 1);
      },
    });
    }
    else {
      Alert.alert("", "search something first")
    }
  };

  const fetchSearchData = (page) => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(productAction.search(searchPhrase, page, accessToken))
      .then((response) => {
        setSearchCategoryList(response?.data?.searchCategoryList || 'No category found');
        setSearchSubCategoryList(response?.data?.searchSubCategoryList || 'No subcategory found');
        setSearchProductList((prevData) => page === 1 ? response?.data?.searchProductList : [...prevData, ...response?.data?.searchProductList]);
        setProductCount(response?.data?.total_search_products);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching search data:", error);
      });
  };

  const { currentPage, handleEndReached, resetPagination } = usePagination({
    fetchFunction: fetchSearchData,
    totalPages: Math.ceil(productCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchPhrase) {
        resetPagination();
        fetchSearchData(INITIAL_PAGE);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchPhrase]);

  let category;
  if (Array.isArray(searchCategoryList) && searchCategoryList.length > 0) {
    category = (
      <View style={{ marginHorizontal: 10, height: 'auto' }}>
        <FlatList
          data={searchCategoryList}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={itemData =>
            <CategoryFoodHome
              param={itemData?.item}
              search
              onSelect={onCategorySelectHandler}
            />
          }
        />
      </View>
    );
  }

  let subcategory;
  if (Array.isArray(searchSubCategoryList) && searchSubCategoryList.length > 0) {
    subcategory = (
      <FlatList
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
    );
  }

  let products;
  if (Array.isArray(searchProductList) && searchProductList.length > 0) {
    products = (
      <FlatList
        data={searchProductList}
        keyExtractor={(item) => item?.product_id}
        renderItem={itemData =>
          <SearchProducts
            param={itemData?.item}
            onSelect={onProductSelectHandler}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.green} /> : null}
      />
    );
  }

  let noResultsMessage = (
    <Text style={{ textAlign: 'center', marginTop: 20 }}>
      No results found. Please try a different search term.
    </Text>
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <CustomHeader label="Search" press={() => props.navigation.goBack()} />
      <View style={styles.container2}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        <AntDesign
          name="bars"
          size={28}
          color="white"
          style={{ backgroundColor: '#2c843e', padding: 5, borderRadius: 5 }}
          onPress={filterHandler}
        />
      </View>
      <ScrollView style={{flex:1, }} scrollsToTop={searchPhrase}>
      {isLoading ? <ActivityIndicator size="large" color={Colors.green} /> : null}
      {/* {category || noResultsMessage} */}
      {/* {subcategory || noResultsMessage} */}
      {products || noResultsMessage}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default SearchScreen;
