import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
//================================================================================================================================

const LoadingScreen = props => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState(1);

  // Handle user state changes
  const onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged(user => {
      alert(user);
    });
  };
  const testHook = add => {
    setUser(user + add);
  };

  useEffect(
    () => {
      // const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      // return subscriber; // unsubscribe on unmount
      console.warn(user)
    },
    [
      /*Value that determind to re-run the useEffect*/user
    ],
  );

  return (
    <View style={styles.container}>
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.DarkBackground}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View style={{marginBottom: 24}}>
          <TouchableOpacity onPress={() => testHook(1)}>
            <Text style={{color: colors.primary, fontSize: 40}}>{user}</Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator color={colors.primary} size="large" />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DarkBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
