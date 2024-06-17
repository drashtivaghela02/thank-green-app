import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, Pressable, ScrollView, SectionList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { debounce } from 'lodash';
import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../../Components/UI/CustomHeader';
import CartProduct from '../../Components/UI/CartProduct';
import * as cartItem from '../../store/actions/Cart';
import * as orderAction from '../../store/actions/Orders';
import CouponCard from '../../Components/UI/CouponCard';
import Colors from '../../Constant/Colors';

const CheckOutScreen = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [isCoupon, setIsCoupon] = useState(true)
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  const cartItems = useSelector((state) => state?.cart?.items);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [discount, setDiscount] = useState('00.00')
  const [couponsData, setCouponsData] = useState([]);
  const [applicableCoupons, setApplicableCoupons] = useState([]);
  const [notApplicableCoupons, setNotApplicableCoupons] = useState([]);
  const [TnC, setTnC] = useState({})
  const keyValuePairs = Object.keys(TnC).map(key => ({ key, value: TnC[key] }));

  const [useReferralBonus, setUseReferralBonus] = useState(false)

  // console.log('Cart Items: ..', cartItems);


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

  const CouponData = (cartItems) => {
    const couponData = []
    for (const key in cartItems) {
      couponData.push(
        cartItems[key].productData.product_id,
      );
    }
    return couponData;

  }

  const transformedCartItems = Object.keys(cartItems).map((key) => ({
    productId: key,
    subcategory_name: cartItems[key]?.productData?.subcategory_name,
    productData: cartItems[key]?.productData,
    productPrice: cartItems[key]?.productPrice,
    quantity: cartItems[key]?.quantity,
    quantityId: cartItems[key]?.quantityId,
  }));

  const groupedItems = transformedCartItems.reduce((sections, item) => {
    const section = sections.find((sec) => sec.title === item.subcategory_name);
    if (section) {
      section.data.push(item);
    } else {
      sections.push({ title: item.subcategory_name, data: [item] });
    }
    return sections;
  }, []);

  const fetchData = (summaryData) => {
    setCouponsData([]);
    setIsLoading(true);
    dispatch(orderAction.postOrder(summaryData, accessToken))
      .then((response) => {
        setOrderData(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching user information:', error);
      });
  };

  const fetchDataWithCoupon = (summaryData, couponId) => {
    setIsLoading(true);
    dispatch(orderAction.postCouponOrder(summaryData, couponId, accessToken))
      .then((response) => {
        setOrderData(response?.data);
        setDiscount(response?.data?.discount_amount)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching user information:', error);
      });
  }

  const debouncedFetchData = debounce((summaryData) => {
    fetchData(summaryData);
  }, 1);

  useEffect(() => {
    if (cartItems.length !== 0) {
      const summaryData = calculateSummaryData(cartItems);
      debouncedFetchData(summaryData);
    }
  }, [cartItems]);


  const couponHandler = () => {
    setModalVisible(true)
    const couponItem = CouponData(cartItems);
    console.log("Sure", couponItem)
    dispatch(orderAction.getCouponInfo(couponItem, accessToken))
      .then((response) => {
        setApplicableCoupons(response?.data?.ApplicableCoupons)
        setNotApplicableCoupons(response?.data?.NotApplicableCoupons)
        console.log("Coupon data getting", response?.data?.NotApplicableCoupons)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching user information:', error);
      });

  }
  const handleTnC = (id) => {
    setIsLoading(true)
    console.log("TNC data id getting", id)
    dispatch(orderAction.getCouponTnC(id, accessToken))
      .then((response) => {
        setTnC(response?.data);
        console.log("TNC data getting", response)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching user information:', error);
      });
  }

  const handleApplyCoupon = (item, couponCode, id) => {
    if (accessToken) {
      const summaryData = calculateSummaryData(cartItems);
      dispatch(orderAction.applyCoupon(summaryData, couponCode, accessToken))
        .then((response) => {
          if (response.status === 'success') {
            setIsCoupon(true)
            setCouponsData([couponCode]);
            setDiscount(response.data.discount)
            fetchDataWithCoupon(summaryData, id)
          }
          if (response.status === 'error') {
            Alert.alert("Error", response.msg)
            return
          }
          console.log("Aply coupon data getting", response)
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    else {
      Alert.alert("You are not signed in", "Sign in to proceed..", [{ text: 'cancel', style: "cancel" }, {
        text: 'Login',
        onPress: () => {
          props.navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: 'auth' }], }));
        }
      }])
    }
  }

  const handleCheckout = () => {
    if (accessToken) {
      props.navigation.navigate('PlaceOrder', { OrderData: orderData, useReferral: useReferralBonus , SummaryData: calculateSummaryData(cartItems) });
    }
    else {
      Alert.alert("You are not signed in", "Sign in to proceed checkout..", [{ text: 'cancel', style: "cancel" }, {
        text: 'Login',
        onPress: () => {
          props.navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: 'auth' }], }));
        }
      }])
    }
  }



  let ApplicableCoupons;

  if (applicableCoupons.length !== 0) {

    ApplicableCoupons = <FlatList
      data={applicableCoupons}
      keyExtractor={(item) => item.id}
      renderItem={itemData =>
        <CouponCard
          param={itemData.item}
          onApply={() => {
            handleApplyCoupon(itemData.item, itemData.item.code, itemData.item.id)
            setModalVisible(false)
          }}
          onShowTerms={() => {
            setModalVisible(true);
            setModalVisible2(true);
            handleTnC(itemData.item.id)
          }}
        />}
    />

  }
  let NotApplicableCoupons;
  if (notApplicableCoupons.length !== 0) {

    NotApplicableCoupons = <FlatList
      data={notApplicableCoupons}
      keyExtractor={(item) => item.id}
      renderItem={itemData =>
        <CouponCard
          param={itemData.item}
          NotApplyable
          onShowTerms={() => {
            setModalVisible(true);
            setModalVisible2(true);
            handleTnC(itemData.item.id)
          }}
        />}
    />

  }

  if (cartItems.length === 0 || Object.keys(cartItems).length === 0) {
    return (
      <View style={styles.container}>
        <CustomHeader label="Cart" press={() => props.navigation.goBack()} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty, add products..</Text>
        </View>
      </View>
    );
  }

  const referralhandler = () => {

  }

  return (
    <View style={styles.container}>
      <CustomHeader label="Cart" press={() => props.navigation.goBack()} />
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
                    fetchData(calculateSummaryData(cartItems))
                  }}
                  onRemoveItem={() => {
                    dispatch(cartItem.removeFromCart(item?.productId));
                    fetchData(calculateSummaryData(cartItems))
                  }}
                  onDeleteItem={() => {
                    dispatch(cartItem.deleteFromCart(item?.productId));
                    fetchData(calculateSummaryData(cartItems))
                  }}
                // isFocused={isFocused}
                />
              )}
              renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
              scrollEnabled={false}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, { fontWeight: '600', fontSize: 16 }]}>Terms and Conditions</Text>
                <FlatList
                  data={keyValuePairs}
                  keyExtractor={item => item.key}
                  renderItem={({ item }) => (
                    <Text style={styles.modalText}>
                      {item.key}: {item.value}
                    </Text>
                  )}
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible2(!modalVisible2)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.cardTitle}>               Coupon Card            <Text onPress={() => { setModalVisible(false) }} style={{ fontWeight: '500', color: Colors.green }}>close</Text></Text>
                <View style={{ flex: 1 }}>
                  {applicableCoupons.length !== 0 && (<Text style={styles.cardTitle}>Applicable Coupons</Text>)}
                  {ApplicableCoupons}
                  {notApplicableCoupons.length !== 0 && (<Text style={styles.cardTitle}> Not Applicable Coupons</Text>)}
                  {NotApplicableCoupons}
                </View>
              </View>
            </View>
          </Modal>

          <Text style={styles.sectionHeader}>Coupons</Text>


          <View style={styles.couponContainer}>
            {couponsData.length === 0
              ?

              (<TouchableOpacity style={styles.coupons} onPress={couponHandler} >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={require('../../assets/discount.png')} style={styles.logo} tintColor={Colors.green} />
                  <Text>Apply coupons</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>)
              :
              (<View style={styles.coupons} >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={require('../../assets/discount.png')} style={styles.logo} tintColor={Colors.green} />
                  <Text>{couponsData ?? couponsData?.code}</Text>
                  <Text style={{ fontWeight: '500' }}>Saved ${discount}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                  setCouponsData([])
                  fetchData(calculateSummaryData(cartItems))
                }} hitSlop={5}>

                  <Text style={{ color: 'red', fontWeight: '600' }} >Remove</Text>
                </TouchableOpacity>
              </View>)}


          </View>

          {orderData?.referral_bonus &&
            <View style={{ flexDirection: 'row', padding: 15, marginHorizontal: 10, alignItems: 'center', gap: 5 }} >
              {useReferralBonus
                ?
                <MaterialIcons name="check-box" size={24} color={Colors.green} onPress={() => setUseReferralBonus(false)} />
                :
                <MaterialIcons name="check-box-outline-blank" size={24} color="black" onPress={() => setUseReferralBonus(true)} />}
              <Text>Use Referral Bonus</Text>
            </View>}

          <View>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text>Sub Total</Text>
                <Text>${orderData ? orderData?.sub_total : '00.00'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Discount Amount</Text>
                <Text>${orderData ? orderData?.discount_amount : '00.00'}</Text>
              </View>
              {orderData?.referral_bonus && useReferralBonus && <View style={styles.summaryRow}>
                <Text>Referral Discount Amount</Text>
                <Text>${orderData ? orderData?.referral_bonus : '00.00'}</Text>
              </View>}
              <View style={styles.summaryRow}>
                <Text>Delivery Charges</Text>
                <Text>${orderData ? orderData?.delivery_charges : '00.00'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${(orderData?.referral_bonus && useReferralBonus) ? orderData?.total - orderData?.referral_bonus : orderData?.total}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.verify}
                onPress={handleCheckout}
              //   () => {
              //   props.navigation.navigate('PlaceOrder', { OrderData: orderData, SummaryData: calculateSummaryData(cartItems) });
              // }}
              >
                <Text style={styles.verifyButton}>CHECKOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verify1}
                onPress={() => {
                  props.navigation.goBack();
                }}
              >
                <Text style={styles.verifyButton1}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
  couponContainer: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    // padding: 10,
    margin: 20,
    gap: 20,
  },
  coupons: { paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: {
    height: 35,
    width: 35
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
    gap: 20,
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
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalView: {
    height: 330,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonClose: {
    backgroundColor: Colors.green,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CheckOutScreen;
