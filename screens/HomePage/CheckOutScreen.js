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

const CheckOutScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderdata] = useState([]);
  const accessToken = useSelector(state => state?.auth?.accessToken)

  const cartItems = useSelector(state => state?.cart?.items)
  console.log("redux item:  ufhsi", cartItems)

  const SummaryData = [];
  const transformedCartItems = [];
  for (const key in cartItems) {
    SummaryData.push({
      id: key,
      quantity: cartItems[key].quantity,
      productQuantity_id: cartItems[key].productData.quantity_variants[0].quantity_variant_id
    })

    transformedCartItems.push({
      productId: key,
      subcategory_name: cartItems[key]?.productData?.subcategory_name,
      productData: cartItems[key]?.productData,
      productPrice: cartItems[key]?.productPrice,
      quantity: cartItems[key]?.quantity,
    });
  }

  // Group items by subcategory_name
  const groupedItems = transformedCartItems.reduce((sections, item) => {
    const section = sections.find(sec => sec.title === item.subcategory_name);
    if (section) {
      section.data.push(item);
    } else {
      sections.push({ title: item.subcategory_name, data: [item] });
    }
    return sections;
  }, []);

  console.log("cart products :", SummaryData)
  
  const loadData = useEffect(() => {
    setIsLoading(true);
    dispatch(orderAction.postOrder(SummaryData, accessToken))
      .then((response) => {
        setOrderdata(response?.data);
        setIsLoading(false);
        console.log("sgdagfv xzv=> ", response?.data)
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken, dispatch])

  return (
    <View style={styles.container}>
      <CustomHeader label='Cart' press={() => props.navigation.goBack()} />
      {isLoading && <ActivityIndicator />}
      <ScrollView contentContainerStyle={{
        flexGrow: 1
      }}>
        <View style={styles.body}>
          <View>
            <SectionList
              sections={groupedItems}
              keyExtractor={(item) => item?.productId}
              renderItem={({ item }) => (
                <CartProduct
                  param={item}
                  onRemoveItem={() => {
                    dispatch(cartItem.removeFromCart(item?.productId)) 
                    loadData
                  }}
                  onDeleteItem={() => {
                    dispatch(cartItem.deleteFromCart(item?.productId))
                    loadData
                   }}
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
                <Text style={styles.totalAmount}>${orderData ? orderData?.total : '00.00' }</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('Checkout',{ OrderData: orderData, SummaryData: SummaryData}) }}>
                <Text style={styles.verifyButton}>CHECKOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.verify1} onPress={() => { console.log('Pressed'); }}>
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
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 20,
    // marginTop: 10,
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
});

export default CheckOutScreen;
