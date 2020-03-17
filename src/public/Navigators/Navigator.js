import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
//================================================================================================================================
import Home from '../../screens/Home';
import LoadingScreen from '../../screens/Loading';
import Login from '../../screens/Login';
import Profile from '../../screens/Profile';
import Register from '../../screens/Register';
import ChatList from '../../screens/ChatList';
import ChatRoom from '../../screens/ChatRoom';
import colors from '../../assets/colors/colors';
//================================================================================================================================
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//================================================================================================================================
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Enter = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: colors.primary,
        keyboardHidesTabBar: 'true',
        inactiveBackgroundColor: colors.DarkBackground,
        activeBackgroundColor: colors.DarkBackground,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <IconM name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <IconI name="md-person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" headerMode="none">
        <Stack.Screen name="Enter" component={Enter} />
        <Stack.Screen name="ChatRoom" component={ChatRoom}/>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
