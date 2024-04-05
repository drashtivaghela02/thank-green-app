import { Button, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SignIn from "../Components/Form/SignIn";


const Signin = () => {
    return <View style={styles.container}>
        <SignIn />
    </View>
}

export default Signin;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#36485f",
        
    }
})