import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import 'firebase/firestore';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
//================================================================================================================================

const Profile = props => {
  const emailRegex = /[\.\$\#\[\]]/gi;
  const [senderEmail, setSenderEmail] = useState(
    firebase.auth().currentUser.email.replace(emailRegex, ''),
  );
  const [bio, setBio] = useState();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(props.navigation.navigate('Login'));
  };
  const data = () => {
    console.warn(bio.name);
  };

  useEffect(() => {
    const firstTime = async () => {
      await firebase
        .database()
        .ref('/users/' + senderEmail)
        .once('value', snap => {
          setBio(snap.val());
        });
      setLoading(false);
    };
    firstTime();
  }, []);

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
              <Text style={{color: colors.primary}}>
                {loading === true ? 'User' : bio.name}!
              </Text>
            </Text>
          </View>
          <View style={styleInt.profileImgCont}>
            <View style={styleInt.profileImg}>
              <Image
                source={{uri: bio.image}}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            </View>
          </View>
          <View style={styleInt.formEdit}>
            <TextInput
              placeholder={loading === true ? 'Username' : bio.name}
              placeholderTextColor={colors.grey}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={username => this.setState({username})}
            />
            <TextInput
              placeholder={loading === true ? 'Email' : bio.email}
              placeholderTextColor={colors.grey}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={email => this.setState({email})}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={colors.grey}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
            />
            <TextInput
              placeholder={loading === true ? 'Phone Number' : bio.phone}
              placeholderTextColor={colors.grey}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={phone_number => this.setState({phone_number})}
            />
            <TextInput
              placeholder={loading === true ? 'City' : bio.city}
              placeholderTextColor={colors.grey}
              style={[styles.textInput, {width: '80%', marginBottom: 12}]}
              // onChangeText={phone_number => this.setState({phone_number})}
            />
            <View style={[styles.buttonCont, {width: '80%', marginTop: 8}]}>
              <TouchableOpacity>
                <Text style={styles.button}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonCont, {width: '80%', marginTop: 8}]}>
              <TouchableOpacity onPress = {()=>logout()}>
                <Text
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.DarkBackground,
                      color: colors.fail,
                      paddingBottom: 32,
                    },
                  ]}>
                  Logout
                </Text>
              </TouchableOpacity>
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
