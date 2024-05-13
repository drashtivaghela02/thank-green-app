import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, Feather, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CategoryFood from "../../Components/UI/CategoryFood";
import CategoryFoodHome from "../../Components/UI/CategoryFoodHome";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import { useEffect, useState } from "react";

const Home = props => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [resData, setResdata] = useState();

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getCategory(accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("sgdagfv xzv=> ", response?.data)
        setResdata(response?.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken])

  const onProductSelectHandler = (id, name) => {
    console.log("touched", id)
    props.navigation.navigate('CategoryList', { categoryId: id, name: name })
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <Entypo name="menu" size={28} color="white" onPress={() => props.navigation.toggleDrawer()} />
            <View>
              <Text style={styles.subHeading} >Deliver to</Text>
              <Text numberOfLines={1} style={styles.heading}>Culture Tea Bar, Broad...</Text>
            </View>
            <Ionicons name="notifications-outline" size={28} color="white" onPress={() => { props.navigation.navigate('Notifications') }} />
            <MaterialCommunityIcons name="cart-variant" size={28} color='white' onPress={() => { props.navigation.navigate('CheckOut') }} />
          </View>
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('HomeSearch')}
              style={styles.searchContainer}>
              <Feather name="search" size={18} color="black" style={{ marginLeft: 1 }} />
              <Text style={{ fontSize: 17 }}>Search</Text>
            </TouchableOpacity>
            <AntDesign name="bars" size={28} color="white" />
            {/* <FontAwesome6 name="bars-staggered" size={24} color="white" onPress={() => { props.navigation.goBack() }} /> */}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.categoryList}>Categories</Text>
        <FlatList
          data={resData}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={itemData =>
            <CategoryFoodHome
              param={itemData.item}
              onSelect={onProductSelectHandler}
            />}
        />
      </View>
    </View>
  )
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 45,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.20
  },
  heading: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    width: Dimensions.get('window').width * 0.55
  },
  subHeading: {
    // paddingTop: 4,
    color: 'white',
    fontWeight: 'bold',
    fontWeight: '400'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  body: {
    // alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  categoryList: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: "left"
  }
})