import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import firebase from '../firebase/firebase';
import {ScrollView} from 'react-native-gesture-handler';
//================================================================================================================================
import colors from '../assets/colors/colors';
import styles from '../assets/css/styles';
//================================================================================================================================

const ChatList = props => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const createChatRoom = value => {
    props.navigation.navigate('ChatRoom', value);
  };

  const getUsers = () => {
    return users.map(value => {
      return (
        <View style={{width: '100%', height: 72, marginBottom: 24}}>
          <TouchableOpacity onPress={()=>createChatRoom(value.email)}>
            <View style={styleInt.chatCont}>
              <View style={styleInt.imgThumb}>
                <Image
                  source={require('../assets/images/default.jpg')}
                  style={{width: '100%', height: '100%', borderRadius: 100}}
                />
              </View>
              <View style={styleInt.chatPrev}>
                <View style={styleInt.userName}>
                  <Text
                    style={{
                      color: colors.LightBackground,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {value.name}
                  </Text>
                </View>
                <View style={styleInt.chat}>
                  <Text style={{color: colors.grey}}>
                    Hi, how are you doing? Hi, how are you doing? Hi, how are
                    you doing?
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  useEffect(() => {
    const firstTime = async () => {
      await firebase
        .database()
        .ref('/users/')
        .once('value', snap => {
          snap.forEach(shot => {
            if (firebase.auth().currentUser.email !== shot.val().email)
              users.push(shot.val());
          });
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
        <View style={styles.containerStyle}>
          <View style={styleInt.welcomeTextCont}>
            <Text style={styleInt.welcomeText}>Start a chat with your </Text>
            <Text
              style={{color: colors.primary, fontSize: 24, fontWeight: 'bold'}}>
              friends!
            </Text>
          </View>
          <View style={styleInt.chatsCont}>{users && getUsers()}</View>
        </View>
      </ScrollView>
    </View>
  );
};
const styleInt = StyleSheet.create({
  chat: {
    flex: 1.1,
    width: '100%',
  },
  userName: {
    flex: 1,
    width: '100%',
  },
  chatPrev: {
    flex: 3.2,
    height: '95%',
  },
  imgThumb: {
    paddingRight: 24,
    flex: 1,
    height: '100%',
  },
  chatCont: {
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    width: '100%',
    height: 72,
  },
  chatsCont: {
    width: '100%',
    paddingTop: 16,
  },
  formEdit: {
    alignItems: 'center',
    paddingTop: 24,
  },
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
    fontSize: 20,
  },
  welcomeTextCont: {
    alignItems: 'flex-end',
    width: '100%',
    paddingTop: 16,
    paddingRight: 16,
  },
});
export default ChatList;
