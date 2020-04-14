import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
//================================================================================================================================

const LoadingScreen = props => {
  const [user, setUser] = useState(0);

  const getData = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email !== null && password !== null) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate('Enter');
        })
        .catch(() => {
          props.navigation.navigate('Login');
        });
    } else {
      props.navigation.navigate('Login');
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
