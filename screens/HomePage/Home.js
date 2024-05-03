import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";

const Home = props => {

  return (  
    <View style={styles.container}>
      <CustomHeader label='Home' />
      <View style = {styles.body}>

        <View style={styles.dashboard}>
        <Text style={styles.header}>Dashboard</Text>
        <Text style={styles.subheader}>Welcome, you are signed in. </Text>

        <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('FormNavigator')}}>
            <Text style={styles.verifyButton}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('OrderDetails')}}>
            <Text style={styles.verifyButton}>Order Details</Text>
        </TouchableOpacity>
      </View>
        
        
        </View>
    </View>
    )
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: 'white',
    // paddingLeft: 60,
    // paddingRight: 60
  },
  body: {
    alignItems: 'center',
justifyContent: "center",
backgroundColor: 'white',
    paddingHorizontal: 60,
paddingVertical: 30
  },
  dashboard: {
    alignSelf: "stretch"
  },
  verify: {
    marginTop: 10,
    // marginBottom: 60,
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
    fontWeight: '500'
  },
  header: {
    fontSize: 24,
    // color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#2c843e',
    borderBottomWidth: 1
  },
  subheader: {
    fontSize: 20,
    // color: "#fff",
    marginBottom: 25
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#59cbbd",
    borderBottomWidth: 1
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold"
  }
})