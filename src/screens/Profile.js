import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import 'firebase/firestore';
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
  const data = () => {
    // (firebase.firestore().collection('profiles').doc('WfuzsUmByKWEMcokWAv6').get().then(doc=>alert(doc.data().username)))
    alert('tes')
  }
  return (
    <View style={{flex: 1, backgroundColor: colors.DarkBackground}}>
      <TouchableOpacity onPress={() => logout()}>
        <Text style = {{fontSize: 40, padding: 16, backgroundColor: colors.primary}}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => data()}>
        <Text style = {{fontSize: 24, padding: 16, backgroundColor: colors.primary}}>{firebase.auth().currentUser.uid}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Profile;
