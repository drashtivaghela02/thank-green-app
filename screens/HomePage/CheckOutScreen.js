import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SectionList, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartProduct from "../../Components/UI/CartProduct";
import * as cartItem from '../../store/actions/Cart'
import * as orderAction from '../../store/actions/Orders';
import { useIsFocused } from "@react-navigation/native";
import { debounce } from 'lodash';

const CheckOutScreen = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const accessToken = useSelector(state => state?.auth?.accessToken)
  const cartItems = useSelector(state => state?.cart?.items)

  console.log("Cart Items: ..", cartItems)
  const calculateSummaryData = (cartItems) => {
    const summaryData = [];
    for (const key in cartItems) {
      console.log(cartItems)
      console.log("CArtItemsafdiowsfioajofji", cartItems)
      summaryData.push({
        id: cartItems[key].productData.product_id,
        quantity: cartItems[key].quantity,
        productQuantity_id: cartItems[key].quantityId
      });
    }
    return summaryData;
  };
  const transformedCartItems = Object.keys(cartItems).map(key => ({
    productId: key,
    subcategory_name: cartItems[key]?.productData?.subcategory_name,
    productData: cartItems[key]?.productData,
    productPrice: cartItems[key]?.productPrice,
    quantity: cartItems[key]?.quantity,
    quantityId: cartItems[key]?.quantityId
  }));

  const groupedItems = transformedCartItems && transformedCartItems.reduce((sections, item) => {
    const section = sections.find(sec => sec.title === item.subcategory_name);
    if (section) {
      section.data.push(item);
    } else {
      sections.push({ title: item.subcategory_name, data: [item] });
    }
    return sections;
  }, []);

  // console.log("grouped data",groupedItems[0].data[0])

  const fetchData = (summaryData) => {
    setIsLoading(true);
    dispatch(orderAction.postOrder(summaryData, accessToken))
      .then((response) => {
        setOrderData(response?.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }

  const debouncedFetchData = debounce((summaryData) => {
    fetchData(summaryData);
  }, 1);

  useEffect(() => {
    const summaryData = calculateSummaryData(cartItems);
    debouncedFetchData(summaryData);
  }, [cartItems]);

  if (isLoading) {
    <View>
      <ActivityIndicator />
    </View>
  }
  if (cartItems.length === 0 || Object.keys(cartItems).length === 0) {
    return (
      <View style={styles.container}>
        <CustomHeader label='Cart' press={() => props.navigation.goBack()} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty, add products..</Text>
        </View>
      </View>)
  }

  return (
    <View style={styles.container}>
      <CustomHeader label='Cart' press={() => props.navigation.goBack()} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          <View>
            <SectionList
              sections={groupedItems}
              keyExtractor={(item) => item?.productId}
              renderItem={({ item }) => (
                <CartProduct
                  param={item}
                  onAddItem={() => {
                    dispatch(cartItem.addToCart(item?.productData, item?.quantityId));
                  }}
                  onRemoveItem={() => {
                    dispatch(cartItem.removeFromCart(item?.productId));
                  }}
                  onDeleteItem={() => {
                    dispatch(cartItem.deleteFromCart(item?.productId));
                  }}
                  isFocused={isFocused}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              scrollEnabled={false}
            />
          </View>
          <View>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text>Sub Total</Text>
                <Text>${orderData ? orderData?.sub_total : '00.00'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Deliver Charges</Text>
                <Text>${orderData ? orderData?.delivery_charges : '00.00'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${orderData ? orderData?.total : '00.00'}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('PlaceOrder', { OrderData: orderData, SummaryData: calculateSummaryData(cartItems) }) }}>
                <Text style={styles.verifyButton}>CHECKOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.verify1} onPress={() => { props.navigation.goBack(); }}>
                <Text style={styles.verifyButton1}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    gap: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonsContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  verify: {
    marginTop: 10,
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
    fontWeight: '500',
  },
  verify1: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton1: {
    color: '#2c843e',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
  }
});

export default CheckOutScreen;
