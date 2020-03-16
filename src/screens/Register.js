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
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (email, password) => {
    try {
      setLoading(true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase
        .database()
        .ref('users/')
        .child(newEmail)
        .update({
          city,
          email,
          name: username,
          phone: phone,
        });
      setLoading(false);
      props.navigation.navigate('Login');
    } catch (e) {
      console.error(e.message);
    }
  };

  const reModify = email => {
    setEmail(email);
    setNewEmail(email.replace(/[\.\$\#\[\]]/gi, ''));
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
          <View style={{paddingTop: '10%', alignItems: 'center'}}>
            <Text style={{color: colors.LightBackground, fontSize: 24}}>
              Cerate Your
            </Text>
            <Text style={{color: colors.primary, fontSize: 40}}>Pikaboo!</Text>
          </View>
          <View style={[styles.formLogin, {marginTop: '10%'}]}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={email => reModify(email)}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={password => setPassword(password)}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={username => setUsername(username)}
            />
            <TextInput
              keyboardType='phone-pad'
              autoCapitalize="none"
              placeholder="Phone Number"
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={phone => setPhone(phone)}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={colors.grey}
              style={styles.textInput}
              onChangeText={city => setCity(city)}
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
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
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