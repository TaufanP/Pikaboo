import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import 'firebase/firestore';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
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
    alert('tes');
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
        <View style={(styles.containerStyle, {justifyContent: 'flex-start'})}>
          <View style={styleInt.welcomeTextCont}>
            <Text style={styleInt.welcomeText}>
              Welcome back,{' '}
              <Text style={{color: colors.primary}}>Tes!</Text>
            </Text>
          </View>
          <View style={styleInt.profileImgCont}>
            <View style={styleInt.profileImg}>
              {/* <Image
                source={require('../assets/images/PhotoGrid_1508767006808.png')}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              /> */}
            </View>
          </View>
          <View style={styleInt.formEdit}>
            <TextInput
              // placeholder={loading === true ? 'Username' : username}
              placeholderTextColor={colors.LightForm}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={username => this.setState({username})}
            />
            <TextInput
              // placeholder={loading === true ? 'Email' : email}
              placeholderTextColor={colors.LightForm}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={email => this.setState({email})}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={colors.LightForm}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
            />
            <TextInput
              // placeholder={loading === true ? 'Phone Number' : phone_number}
              placeholderTextColor={colors.LightForm}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={phone_number => this.setState({phone_number})}
            />
            <View style={[styles.buttonCont, {width: '80%', marginTop: 8}]}>
              <TouchableOpacity>
                <Text style={styles.button}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonCont, {width: '80%', marginTop: 8}]}>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styleInt = StyleSheet.create({
  formEdit: {alignItems: 'center', paddingTop: 24},
  profileImg: {
    width: 144,
    height: 144,
  },
  profileImgCont: {
    paddingTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    color: colors.LightBackground,
    fontSize: 24,
  },
  welcomeTextCont: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 32,
  },
});

export default Profile;
