import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
//================================================================================================================================

const ChatRoom = props => {
  const emailRegex = /[\.\$\#\[\]]/gi;
  const [senderEmail, setSenderEmail] = useState(
    firebase.auth().currentUser.email.replace(emailRegex, ''),
  );
  const [receiverEmail, setReceiverEmail] = useState(
    props.route.params.replace(emailRegex, ''),
  );
  const [msg, setMsg] = useState([]);
  const [messages, setMessages] = useState('');
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const chatting = async () => {
    await firebase
      .database()
      .ref('/users/' + senderEmail + '/chats/' + receiverEmail)
      .push()
      .set({
        msg: messages,
        time: {
          clock: date.toLocaleTimeString().slice(0, 5),
          date:
            date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        },
        sent: true,
      });
    await firebase
      .database()
      .ref('/users/' + receiverEmail + '/chats/' + senderEmail)
      .push()
      .set({
        msg: messages,
        time: {
          clock: date.toLocaleTimeString().slice(0, 5),
          date:
            date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        },
        sent: false,
      });
    const message = [];
    await firebase
      .database()
      .ref('/users/' + senderEmail + '/chats/' + receiverEmail)
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          message.push(childSnapshot.val());
        });
      });
    setMsg(message);
  };

  const getChat = () => {
    return msg.map(value => (
      <>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: colors.DarkBackground,
              color: colors.grey,
              fontSize: !true ? 10 : 0,
              paddingHorizontal: !true ? 8 : 0,
              paddingVertical: !true ? 4 : 0,
              borderRadius: 100,
              marginTop: !true ? 8 : 0,
            }}>
            {!true ? '16/3/2020' : null}
          </Text>
        </View>
        <View
          style={{
            margin: 8,
            alignItems: value.sent ? 'flex-end' : 'flex-start',
          }}>
          <Text
            style={{
              backgroundColor: value.sent
                ? colors.LightBackground
                : colors.primary,
              borderRadius: 16,
              paddingHorizontal: 16,
              flex: 1,
              padding: 8,
            }}>
            {value.msg}
          </Text>
          <Text style={{fontSize: 10, color: colors.grey, margin: 4}}>
            {value.time.clock}
          </Text>
        </View>
      </>
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
      setLoading(false);
    };
    firstTime();
  }, []);

  return (
    <>
      <View style={{backgroundColor: colors.DarkForm, height: '100%'}}>
        <View
          style={{
            height: 56,
            marginTop: 0,
            flexDirection: 'row',
            backgroundColor: colors.DarkBackground,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.LightBackground, fontSize: 24}}>
            Budi
          </Text>
        </View>
        <View style={{height: '100%'}}>
          <ScrollView>
            {loading ? null : null}
            {msg && getChat()}
          </ScrollView>
        </View>
        <View
          style={{
            height: 56,
            marginTop: -112,
            flexDirection: 'row',
            backgroundColor: colors.DarkBackground,
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="message"
            placeholderTextColor={colors.grey}
            style={{
              backgroundColor: colors.DarkForm,
              width: '80%',
              borderRadius: 4,
              height: '70%',
              paddingLeft: 16,
              marginLeft: 8,
              color: colors.LightBackground,
            }}
            onChangeText={messages => setMessages(messages)}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
              paddingRight: 8,
            }}>
            <TouchableOpacity onPress={() => chatting()}>
              <Text
                style={{
                  color: colors.LightBackground,
                  padding: 16,
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChatRoom;

const navigationOptions = {
  title: 'Login',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
