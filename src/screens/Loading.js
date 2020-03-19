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
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
  };

  useEffect(
    () => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    },
    [
      /*Value that determind to re-run the useEffect*/
    ],
  );

  return (
    <View style={styles.container}>
      {!user ? (
        props.navigation.navigate('Login')
      ) : (
        <>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.DarkBackground}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          <View style={{marginBottom: 24}}>
            <Text style={{color: colors.primary, fontSize: 40}}>Pikaboo!</Text>
          </View>
          <ActivityIndicator color={colors.primary} size="large" />
        </>
      )}
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
