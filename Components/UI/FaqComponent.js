import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";

const FaqComponent = ({ head }) => {
  const [showDetails, setShowDetails] = useState(Array(head.length).fill(false));

  return (
    <View>
      {
        head.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <TouchableOpacity
              style={styles.summary}
              onPress={() => {
                setShowDetails(prevState => {
                  const newState = [...prevState];
                  newState[index] = !newState[index];
                  return newState;
                });
              }}>
              <Text style={styles.question}>{item.question}</Text>
              <AntDesign name={showDetails[index] ? 'up' : 'down'} size={16} color="#a6a6aa" />
            </TouchableOpacity>
            {showDetails[index] && (
              <View style={styles.drawerItem}>
                <Text>{item.answer}</Text>
              </View>
            )}
          </View>
        ))
      }
    </View>
  );
}

export default FaqComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  questionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // marginBottom: 10,
    // paddingLeft: 10,
  },

  question: {
    fontWeight: '500',
    color: '#a6a6aa',
    fontSize: 15,
    lineHeight: 26,
    paddingVertical: 2.8
  },



});