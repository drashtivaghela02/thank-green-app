import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const CustomHeader = props => {
  return (
    <LinearGradient
      colors={['#2c843e', '#1e4c5e']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={28} color='white' onPress={props.press} />
        <Text style={styles.heading}>{props.label}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height*0.17
  },
    heading: {
        fontWeight: '500',
        fontSize: 30,
        paddingTop: 8,
        color: 'white',
    },
});

export default CustomHeader;