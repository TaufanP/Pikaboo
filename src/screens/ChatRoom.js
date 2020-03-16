import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import firebase from '../firebase/firebase';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ChatRoom = props => {
  const [sender, setSender] = useState('Taufan');
  const [senderEmail, setSenderEmail] = useState(
    firebase.auth().currentUser.email.replace(/[\.\$\#\[\]]/gi, ''),
  );
  const [receiver, setReceiver] = useState('zaki99');
  const [receiverEmail, setReceiverEmail] = useState(
    props.route.params.replace(/[\.\$\#\[\]]/gi, ''),
  );
  const [msg, setMsg] = useState([]);
  const [messages, setMessages] = useState('');
  const [kosong, setKosong] = useState(true);
  const [date, setDate] = useState(new Date());
  const chatting = async () => {
    await firebase
      .database()
      .ref('/users/' + senderEmail + '/chats/' + receiverEmail)
      .push()
      .set({
        msg: messages,
        time: date.getHours() + ':' + date.getMinutes(),
        sent: true,
      });
    await firebase
      .database()
      .ref('/users/' + receiverEmail + '/chats/' + senderEmail)
      .push()
      .set({
        msg: messages,
        time: date.getHours() + ':' + date.getMinutes(),
        sent: false,
      });
    const message = [];
    await firebase
      .database()
      .ref('/users/' + senderEmail + '/chats/' + receiverEmail)
      .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          message.push(childSnapshot.val());
        });
      });
    setMsg(message);
  };

  const est = () => {
    console.warn(props);
  };

  const getChat = () => {
    return msg.map(value => (
      <View
        style={{
          margin: 8,
          alignItems: value.sent ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={{
            backgroundColor: value.sent ? '#FFF' : 'green',
            flex: 1,
            padding: 8,
          }}>
          {value.msg}
        </Text>
      </View>
    ));
  };

  useEffect(() => {
    const firstTime = async () => {
      await firebase
        .database()
        .ref('/users/' + senderEmail + '/chats/' + receiverEmail)
        .once('value', snap => {
          snap.forEach(shot => {
            msg.push(shot.val());
          });
        });
      setKosong(false);
    };
    firstTime();
  }, []);

  return (
    <>
      <View style={{backgroundColor: 'pink', height: '100%'}}>
        <View style={{flex: 10}}>
          <ScrollView>
            {kosong ? null : null}
            {msg && getChat()}
            {/* <TouchableOpacity onPress={() => seeMsg()}>
              <View style={{margin: 8, alignItems: 'flex-end'}}>
                <Text style={{backgroundColor: '#FFF', flex: 1, padding: 8}}>
                  {msg}
                </Text>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
        <View style={{flex: 1, marginTop: 16, flexDirection: 'row'}}>
          <TextInput
            placeholder="message"
            style={{backgroundColor: '#888', width: '50%'}}
            onChangeText={messages => setMessages(messages)}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '25%',
              backgroundColor: 'orange',
            }}>
            <TouchableOpacity onPress={() => chatting()}>
              <Text
                style={{
                  padding: 16,
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '25%',
              backgroundColor: 'green',
            }}>
            <TouchableOpacity onPress={() => est()}>
              <Text
                style={{
                  padding: 16,
                }}>
                Get
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ChatRoom;