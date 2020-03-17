import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
//================================================================================================================================
import firebase from '../firebase/firebase';
import colors from '../assets/colors/colors'
//================================================================================================================================
import MapView, {Marker} from 'react-native-maps';
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
  const [profile, setProfile] = useState();
  const coordinate = {
    latitude: -6.39781,
    longitude: 106.822083,
  };
  useEffect(() => {
    const firstTime = async () => {
      await firebase
        .database()
        .ref('/users/' + senderEmail)
        .once('value', snap => {
          setProfile(snap.val());
        });
      setLoading(false);
    };
    firstTime();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={customMap}
        style={styles.map}
        region={{
          latitude: -6.39781,
          longitude: 106.822083,
          latitudeDelta: 1.015,
          longitudeDelta: 0.7,
        }}>
        <Marker
          onPress={()=>console.warn(profile.location)}
          coordinate={loading ? coordinate : profile.location}
          title={loading ? 'Name' : profile.name}
          description={loading ? 'Email' : profile.email}>
          <Image
            source={loading ? require('../assets/images/default.jpg') : {uri:profile.image}}
            style={{height: 35, width: 35, borderRadius: 100, borderWidth: 2, borderColor: colors.primary}}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Home;
