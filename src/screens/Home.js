import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors';
//================================================================================================================================
import MapView, {Marker, Callout} from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
//================================================================================================================================
const customMap = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

const Home = props => {
  const emailRegex = /[\.\$\#\[\]]/gi;
  const [loading, setLoading] = useState(true);
  const [senderEmail, setSenderEmail] = useState(
    firebase.auth().currentUser.email.replace(emailRegex, ''),
  );
  const [bio, setBio] = useState();
  const [bioModal, setBioModal] = useState();
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [indek, setIndek] = useState();
  const [regionMap, setRegionMap] = useState({
    latitude: -6.39781,
    longitude: 106.822083,
    latitudeDelta: 0.2015,
    longitudeDelta: 0.00007,
  });

  const regionChange = region => {
    let reg = {...regionMap};
    reg.latitude = region.latitude;
    reg.longitude = region.longitude
    reg.latitudeDelta = 0.1215;
    setRegionMap(reg);
  };
  const onUpdate = (key, loc, value) => {
    setIndek(key);
    setBioModal(value);
    regionChange(loc)
  };

  const coordinate = {
    latitude: -6.38781,
    longitude: 106.822083,
  };

  const setModalVisible = visible => {
    setModal(visible);
  };

  const getUsers = () => {
    return users.map(value => {
      return (
        <View>
          <TouchableOpacity onPress={() => alert('pencet')}>
            <Marker
              coordinate={loading ? coordinate : value.location}
              title={loading ? 'Name' : value.name}
              description={loading ? 'Email' : value.email}>
              <Image
                source={
                  loading
                    ? require('../assets/images/default.jpg')
                    : {uri: value.image}
                }
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: colors.primary,
                }}
              />
            </Marker>
          </TouchableOpacity>
        </View>
      );
    });
  };
  const friendLocation = () => {
    return users.map(value => {
      return (
        <TouchableOpacity onPress={() => onUpdate(value.email, value.location, value)}>
          <View
            key={value.email}
            style={{
              backgroundColor: colors.DarkBackground,
              borderWidth: 2,
              borderColor:
                indek == value.email ? colors.primary : colors.DarkBackground,
              width: 56,
              height: 56,
              borderRadius: 100,
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                loading
                  ? require('../assets/images/default.jpg')
                  : {uri: value.image}
              }
              style={{
                width: 52,
                height: 52,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{alignItems: 'center', marginRight: 16}}>
            <Text style={{color: colors.LightBackground}}>
              {loading ? 'Name' : value.name}
            </Text>
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
              users.push(shot.val());
          });
        });
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
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}>
        <TouchableOpacity
          onPress={() => {
            setModal(!modal);
          }}>
          <Text>{bioModal && bioModal.name}</Text>
        </TouchableOpacity>
      </Modal>
      <MapView
        onCalloutPress={() => setModalVisible(true)}
        customMapStyle={customMap}
        style={styles.map}
        region={regionMap}>
        {users && getUsers()}
        <Marker
          coordinate={loading ? coordinate : bio.location}
          title={loading ? 'User' : bio.name}
          description={loading ? 'Email' : bio.email}>
          <Image
            source={
              loading
                ? require('../assets/images/default.jpg')
                : {uri: bio.image}
            }
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: 'gold',
            }}
          />
        </Marker>
      </MapView>
      <View>
        <ScrollView horizontal={true} alwaysBounceHorizontal={false}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                // backgroundColor: 'rgba(0, 0, 0.15, 0.1)',
                height: 80,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 8,
              }}>
              {friendLocation()}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkForm,
  },
  map: {
    flex: 0.99,
  },
});

export default Home;
