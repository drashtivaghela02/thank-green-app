import { ActivityIndicator, FlatList, ScrollView, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import * as productAction from '../../store/actions/Products';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductsHome from "../../Components/UI/ProductsHome";
import * as cartItem from '../../store/actions/Cart';
import usePagination from "../../Components/UI/usePagination";
import Colors from "../../Constant/Colors";

const INITIAL_PAGE = 1;

const FavoritesScreen = props => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const favoriteProductIds = useSelector(state => state.product.favoriteProductIds);

  const fetchFavourites = (page) => {
    setIsLoading(true);
    dispatch(productAction.getFavourites(accessToken, page))
      .then((response) => {
        setIsLoading(false);
        console.log("fav prods get => ", response?.data);
        setResdata((prevData) => [...prevData, ...response?.data?.favoriteProducts]);
        setProductCount(response?.data?.total_products);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching fav information:", error);
      });
  };

  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: fetchFavourites,
    totalPages: Math.ceil(productCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
    fetchFavourites(INITIAL_PAGE);
  }, [accessToken]);

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data });
  };

  if (productCount === 0 && !isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader label='Favorites' press={() => { props.navigation.goBack() }} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite products found. Start adding some!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader label='Favorites' press={() => { props.navigation.goBack() }} />
      <View style={{ flex: 1, margin: 10 }}>

        <FlatList
          keyExtractor={(item) => item.product_id}
          data={resData}
          numColumns={2}
          renderItem={itemData =>
            <ProductsHome
              param={itemData.item}
              favourites={favoriteProductIds[itemData?.item?.product_id] ? 1 : 0}
              onSelect={onProductSelectHandler}
              onRemoveItem={() => {
                dispatch(cartItem.removeFromCart(`${itemData?.item?.product_id}-${itemData?.item?.quantity_variants[0].quantity_variant_id}`))
              }}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.green} /> : null}
        />
      </View>
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});

export default FavoritesScreen;