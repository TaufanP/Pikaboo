import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from '../firebase/firebase';
import {ScrollView} from 'react-native-gesture-handler';

const ChatList = props => {
  const [users, setUsers] = useState([]);
  const [kosong, setKosong] = useState(true);
  const [sender, setSender] = useState('Taufan');
  const [senderEmail, setSenderEmail] = useState(
    firebase.auth().currentUser.email.replace(/[\.\$\#\[\]]/gi, ''),
  );
  const [receiver, setReceiver] = useState('zaki99');
  const [receiverEmail, setReceiverEmail] = useState(
    'zaki@gmail.com'.replace(/[\.\$\#\[\]]/gi, ''),
  );
  const createChatRoom = async (value) => {
    props.navigation.navigate('ChatRoom', value);
  };

  const getUsers = () => {
    return users.map(value => {
      return (
        <TouchableOpacity onPress={()=>createChatRoom(value)}>
          <View
            style={{
              padding: 16,
              backgroundColor: 'orange',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
            }}>
            <Text>{value}</Text>
          </View>
        </TouchableOpacity>
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
              users.push(shot.val().email);
          });
        });
      console.warn(users);
      setKosong(false);
    };
    firstTime();
  }, []);
  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView>
          {users && getUsers()}
        </ScrollView>
        <TouchableOpacity /*onPress={() => createChatRoom()}*/>
          <Text
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              backgroundColor: 'green',
            }}>
            ENTER CHAT ROOM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(props.navigation.navigate('Login'))
          }>
          <Text
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              backgroundColor: 'red',
            }}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ChatList;