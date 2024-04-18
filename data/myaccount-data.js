import { EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export const ACCOUNT = [
  {
    id: 1,
    leftIcon: <FontAwesome name="user-o" size={22} color="black" />,
    label: ' Personal Information',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'Personal Information'
  },
  {
    id: 2,
    leftIcon: <EvilIcons name="location" size={22} color="black" />,
    label: 'Saved Address',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'SavedAddress'
  },
  {
    id: 3,
    leftIcon: <AntDesign name="creditcard" size={22} color="black" />,
    label: 'Payment',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'Payment'
  },
  {
    id: 4,
    leftIcon: <MaterialCommunityIcons name="shopping-outline" size={22} color="black" />,
    label: 'My Orders',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'MyOrders'
  },
  {
    id: 5,
    leftIcon: <MaterialIcons name="favorite-border" size={22} color="black" />,
    label: 'Favorites',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'Favorites'
  },
  {
    id: 6,
    leftIcon: <AntDesign name="adduser" size={22} color="black" />,
    label: 'Refer a Friend',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'ReferAFriends'
  },
  {
    id: 7,
    leftIcon: <MaterialIcons name="lock-outline" size={22} color="black" />,
    label: 'Change Password',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'ChangePassword'
  },
  {
    id: 8,
    leftIcon: <MaterialCommunityIcons name="chat-question-outline" size={22} color="black" />,
    label: 'FAQ',
    rightIcon: <AntDesign name="right" size={22} color="black" />,
    screenName: 'FAQ'
  },
  {
    id: 9,
    leftIcon: <MaterialIcons name="logout" size={22} color="black" />,
    label: 'Logout',
  },
]