import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as homeAction from '../../store/actions/Home';
import * as cartItem from '../../store/actions/Cart';
import usePagination from "../../Components/UI/usePagination";
import ProductsHome from "../../Components/UI/ProductsHome";
import Colors from "../../Constant/Colors";

const INITIAL_PAGE = 1;

const BannerScreen = props => {
  const bannerId = props.route.params.id;
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState([]);
  const [productCount, setProductCount] = useState(0);


  const fetchBannerData = (page) => {
    setIsLoading(true);
    console.log(accessToken)
    dispatch(homeAction.getBannerProducts(bannerId, page, accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("BAnner PAge=> ", response?.data)
        setResdata((prevData) => [...prevData, ...response?.data?.products]);
        setProductCount(response?.data?.total_products);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching banner information:", error);
      });
  }

  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: fetchBannerData,
    totalPages: Math.ceil(productCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
    fetchBannerData(INITIAL_PAGE)
  }, [accessToken])

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data });
  };

  return (
    <View style={styles.container}>
      <CustomHeader label="Banner's Product" press={() => { props.navigation.goBack() }} />
      <View style={{ flex: 1, margin: 10 }}>

        <FlatList
          keyExtractor={(item) => item.product_id}
          data={resData}
          numColumns={2}
          renderItem={itemData =>
            <ProductsHome
              param={itemData.item}
              // favourites={favoriteProductIds[itemData?.item?.product_id] ? 1 : 0}
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
export default BannerScreen;