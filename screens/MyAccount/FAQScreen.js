import { Button, ScrollView, Text } from "react-native";
import { StyleSheet, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader";
import React, { useEffect, useState } from "react";
import { QUESTION_1, QUESTION_2, QUESTION_3 } from "../../data/faq-data";
import { AntDesign } from "@expo/vector-icons";
import FaqComponent from "../../Components/UI/FaqComponent";


const FAQScreen = props => {
  const data = {
    title: "FAQ (How it works)",
    rows: [
      {
        title: "Lorem ipsum dolor sit amet,",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        title: "Nunc maximus, magna at ultricies elementum",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        title: "What is the package version",
        content: <p>current version is 1.2.1</p>,
      },
    ],
  };



  const [showDetails, setShowDetails] = useState(Array(QUESTION_1.length).fill(false));

  return (
    <View style={styles.container}>
      <CustomHeader label='FAQ' press={() => { props.navigation.goBack() }} />
      <ScrollView style={{ backgroundColor: '#f1f0f5', paddingBottom: 60 }} >
        <Text style= {{padding: 10, fontSize: 16, paddingHorizontal: 20, fontWeight: '500'}}>Payment Related Queries</Text>
        <FaqComponent
          head = {QUESTION_1}
        />
        <Text style= {{padding: 10, fontSize: 16, paddingHorizontal: 20, fontWeight: '500'}}>Delivery Related Queries</Text>
        <FaqComponent
          head = {QUESTION_2}
        />
        <Text style= {{padding: 10, fontSize: 16, paddingHorizontal: 20, fontWeight: '500'}}>Cancellation and Returns</Text>
        <FaqComponent
          head = {QUESTION_3}
        />
      </ScrollView>
    </View>
  );
};

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
    fontWeight: 'bold',
    color: '#a6a6aa',
    fontSize: 16
  },
  drawerItem: {
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    // backgroundColor: '#a6a6aa'
  },

});

export default FAQScreen;