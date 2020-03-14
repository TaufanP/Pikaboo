import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
//================================================================================================================================
import {ScrollView} from 'react-native-gesture-handler';
//================================================================================================================================
const Register = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (email, password) => {
    try {
      setLoading(true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);
      props.navigation.navigate('Login');
    } catch (e) {
      console.error(e.message);
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
          <View style={styles.buttonCont}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <TouchableOpacity onPress={() => register(email, password)}>
                <Text style={styles.button}>SIGN UP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.subCont}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
            <Text style={styles.subButton}>
              Already have an account?{' '}
              <Text style={{color: colors.primary}}>SIGN IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
