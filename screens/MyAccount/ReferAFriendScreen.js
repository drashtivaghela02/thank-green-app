import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Button, Share, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid, Linking, } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import * as homeAction from '../../store/actions/Home';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';

const ReferAFriendScreen = props => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState([]);
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (copyText) => {
    await Clipboard.setStringAsync(copyText);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    console.log("sdjfdjfoj", text)
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(accessToken)
    dispatch(homeAction.getReferral(accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("Referral PAge=> ", response?.data)
        setResdata(response?.data?.referralDetails);
        copyToClipboard(response?.data?.referralDetails?.referral_code)
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching referral information:", error);
      });
  }, [accessToken])

  const whatsappMessageHandler = () => {
    Linking.openURL(`whatsapp://send?text=Hey👋 \n\nI just found this awesome app and thought you might like it too. Use my referral code *${resData.referral_code}* when you sign up, and we'll both get some cool rewards! 🎉`);
  }

  const generalShareHandler = async () => {
    try {
      await Share.share({
        message:
          `Hey👋 \n\nI just found this awesome app and thought you might like it too. Use my referral code *${resData.referral_code}* when you sign up, and we'll both get some cool rewards! 🎉`,

      });
    } catch (error) {
      alert(error.message);
    }
  };

  const telegramMessageHandler = () => {
    Linking.openURL(`tg://send?text=Hey👋 \n\nI just found this awesome app and thought you might like it too. Use my referral code *${resData.referral_code}* when you sign up, and we'll both get some cool rewards! 🎉`);

  };

  return (
    <View style={styles.container} >
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      >
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={28} color='white' onPress={() => { props.navigation.goBack() }} />
          <Text style={styles.heading}>Refer a Friend</Text>
          <Text style={styles.subHeading}>Refer a friend and earn.</Text>
        </View>
      </LinearGradient>

      <View style={styles.body} >
        <View style={styles.logoContainer} >
          <Image source={require('../../assets/ReferAFriend.png')} style={styles.logo} />
          <Text style={styles.bodyMainText}>Invite A Friend</Text>
          <Text style={styles.bodyText}>Invite a friend and earn $2</Text>
        </View>

        <TouchableOpacity style={styles.verify} onPress={() => {
          fetchCopiedText()
          ToastAndroid.show('Referral code coppied to clipboard!', ToastAndroid.SHORT);
        }}>
          <Text style={styles.verifyButton}>GET INVITE CODE</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.bodyMainText} >{resData?.referral_code?.replaceAll("", " ")}</Text>
        </View>

        <View style={styles.orData}>
          <View style={styles.lines}></View>
          <View><Text style={{ color: '#333333', marginHorizontal: 15 }}> SHARE VIA </Text></View>
          <View style={styles.lines}></View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
          <TouchableOpacity onPress={generalShareHandler}>
            <Image source={require('../../assets/facebook_logo.png')} style={styles.FacebookLogo} />
          </TouchableOpacity>
          <Image source={require('../../assets/google_logo.png')} style={styles.GoogleLogo} />
          <TouchableOpacity onPress={whatsappMessageHandler}>
            <Image source={require('../../assets/whatsapp.png')} style={styles.WhatsappLogo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={generalShareHandler}>
            <Image source={require('../../assets/instagram.png')} style={styles.InstagramLogo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={telegramMessageHandler}>
            <Image source={require('../../assets/telegram.png')} style={styles.TelegramLogo} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default ReferAFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.20
  },
  heading: {
    fontWeight: '500',
    fontSize: 30,
    paddingTop: 8,
    color: 'white',
  },
  subHeading: {
    paddingTop: 4,
    color: 'white',
    fontWeight: 'bold',
    fontWeight: '400'
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2'
  },
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    paddingVertical: 5,
    fontWeight: '700'
  },
  logoContainer: {
    alignItems: 'center',
    // marginVertical: 30
  },
  logo: {
    width: 300,
    height: 320
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#b4b4b4',
    paddingBottom: 10,
    fontWeight: '500'

  },
  email: {
    color: '#b4b4b4',
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
    fontSize: 16,
    paddingVertical: 6
  },
  verify: {
    marginTop: 30,
    marginBottom: 13,
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
  submit: {
    marginVertical: 20
  },
  submitButton: {
    borderRadius: 10
  },
  orData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13, marginBottom: 10,
    width: '75%'
  },
  lines: {
    backgroundColor: '#333333',
    height: 1,
    flex: 1
  },
  GoogleLogo: {
    // marginTop: 15,
    width: 40,
    height: 40,
    //  shadowColor: '#000',
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    // elevation: 10
  },
  FacebookLogo: {
    width: 36,
    height: 36,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    // elevation: 50,
  },
  WhatsappLogo: {
    width: 39,
    height: 39
  },
  InstagramLogo: {
    width: 37,
    height: 37
  },
  TelegramLogo: {
    width: 36,
    height: 36
  }
});