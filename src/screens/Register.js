import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
//================================================================================================================================
import {ScrollView} from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
//================================================================================================================================
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Register = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [uri_image, setUri_image] = useState(0);

  const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const imageRef = firebase
        .storage()
        .ref('images')
        .child('profile_' + newEmail);
      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const getImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let source = { uri: response.uri };
        // this.setState({image_uri: response.uri})

        // You can also display the image using data:
        // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

        uploadImage(response.uri)
          .then(url => {
            alert('uploaded');
            setUri_image(url);
          })
          .catch(error => console.log(error));
      }
    });
  };

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
          image: uri_image,
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
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: colors.DarkForm,
                  width: '35%',
                  height: 106,
                  borderRadius: 8,
                }}>
                <TouchableOpacity onPress={() => getImage()}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                    }}>
                    <Image
                      source={
                        uri_image === 0
                          ? require('../assets/images/default.jpg')
                          : {
                              uri: uri_image,
                            }
                      }
                      style={{width: 112, height: 106, borderRadius: 4}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '65%', paddingLeft: 8}}>
                <TextInput
                  keyboardType="phone-pad"
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
            </View>
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
