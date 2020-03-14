import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
//================================================================================================================================

const Profile = props => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(props.navigation.navigate('Login'));
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.DarkBackground}}>
      <TouchableOpacity onPress={() => logout()}>
        <Text style = {{fontSize: 40, padding: 16, backgroundColor: colors.primary}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
