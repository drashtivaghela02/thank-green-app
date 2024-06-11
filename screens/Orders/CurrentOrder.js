import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PastOrderScreen from "./PastOrderScreen";

import * as orderAction from '../../store/actions/Orders';
import { Text } from "react-native";
import usePagination from "../../Components/UI/usePagination";
import Colors from "../../Constant/Colors";

const INITIAL_PAGE = 1;

function CurrentOrder({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [details, setDetails] = useState();
  const [orderCount, setOrderCount] = useState(0);

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const fetchOrder = (page) => {
    setIsLoading(true);
    dispatch(orderAction.getOrderInfo(page, 1, accessToken))
      .then((response) => {
        setIsLoading(false);
        setCurrentOrders((prevData) => [...prevData, ...response?.data?.currentOrders]);
        setOrderCount(response?.data?.total_current_orders);
        console.log(response?.data?.currentOrders);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }
  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: fetchOrder,
    totalPages: Math.ceil(orderCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
    fetchOrder(INITIAL_PAGE);
  }, [accessToken]);

  console.log("currentOrders ==>", currentOrders);
  if (isLoading) {
    <ActivityIndicator size='large' color='#2c843e' />
  }
  const onOrderSelectHandler = (id) => {
    console.log("You have touched product", id)

    setIsLoading(true);
    dispatch(orderAction.getOrderDetailsInfo(id, accessToken))
      .then((response) => {
        setDetails(response.data[0]);
        console.log("order details", response);
        setIsLoading(false);
        navigation.navigate('OrderDetails', { Id: id, Details: response, order: false })
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }
  return (
    orderCount === 0 && !isLoading ?
      (<View style={styles.logoContainer} >
        <Image source={require('../../assets/Order.png')} style={styles.logo} />
        <Text style={styles.bodyMainText}>No order available</Text>
        <Text style={styles.bodyText}>The best deals are just a click away. Start shopping today!</Text>
      </View>)
      : (<FlatList
        data={currentOrders}
        keyExtractor={item => item.order_number}
        renderItem={itemData =>
          <PastOrderScreen
            param={itemData.item}
            onSelect={onOrderSelectHandler}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" style={{ paddingTop: 5 }} color={Colors.green} /> : null}
      />)
  );
}

const styles = StyleSheet.create({
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 10
  },
  logoContainer: {
    justifyContent: 'center',
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
  }
});
export default CurrentOrder