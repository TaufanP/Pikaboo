import 'react-native-gesture-handler';
import React from 'react';
//================================================================================================================================
import Home from '../../screens/Home';
import LoadingScreen from '../../screens/Loading';
import Login from '../../screens/Login';
import Profile from '../../screens/Profile'
import Register from '../../screens/Register'
//================================================================================================================================
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//================================================================================================================================
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Enter = () => {
  return(
    <Tab.Navigator initialRouteName = 'Home'>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" headerMode="none">
        <Stack.Screen name="Enter" component={Enter} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
