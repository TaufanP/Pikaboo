import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
//================================================================================================================================

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const submit = async (email, password) => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setErrorLogin(false);
        setLoading(false);
        props.navigation.navigate('Enter');
      })
      .catch(() => {
        setLoading(false);
        setErrorLogin(true);
      });
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      console.warn('success set')
    } catch (e) {
      console.warn('gagal set')
      console.warn(e)
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        console.warn('success get: ' + value)
      }
    } catch (e) {
      console.warn('gagal get')
    }
  };
  return (
    <View style={{backgroundColor: colors.DarkBackground, flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.DarkBackground}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <ScrollView>
        <View style={styles.containerStyle}>
          <View style={{paddingTop: '40%'}}>
            <Text style={{color: colors.primary, fontSize: 40}}>Pikaboo!</Text>
          </View>
          <View style={styles.formLogin}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={password => setPassword(password)}
            />
          </View>
          {errorLogin ? (
            <View>
              <Text style={{color: colors.fail, fontSize: 16}}>
                Incorrect email or password!
              </Text>
            </View>
          ) : null}
          <View style={styles.buttonCont}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <TouchableOpacity onPress={() => storeData()}>
              {/* <TouchableOpacity onPress={() => submit(email, password)}> */}
                <Text style={styles.button}>SIGN IN</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.subCont}>
          <TouchableOpacity
            onPress={() => getData()}>
            {/* onPress={() => props.navigation.navigate('Register')}> */}
            <Text style={styles.subButton}>
              Do not have an account?{' '}
              <Text style={{color: colors.primary}}>SIGN UP</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
