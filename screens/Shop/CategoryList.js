import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const CategoryList = props => {
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
            <View style={{ flexDirection: 'row', marginHorizontal: 2, gap: 12 }}>
              <Feather name="search" size={28} color="white" />
              <MaterialCommunityIcons name="cart-variant" size={28} color="white" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, }}>
            <Text style={styles.heading}>Fruits & Vegetables</Text>
            <MaterialIcons name="filter-list" size={28} color="white" onPress={() => { props.navigation.navigate('Filters')}} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <Image source={require('../../assets/FoodCategory.png')} style={styles.image} />

        <View style={{ width: '100%', padding: 20 }}>
          <View style={styles.btnSecondary}>

            <LinearGradient
              colors={['#1f4a6b', '#25a05d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.textStyle}>SHOP BY CATEGORY</Text>
            </LinearGradient>
          </View>
        </View>
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

export default CategoryList;