import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router/src/useNavigation';
import React, { useState } from 'react';
import { colors } from '../../constants/Theme';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TitleBack from '../TitleBack';
import * as WebBrowser from 'expo-web-browser';
import { updateUserProfile } from '../../utilities/profile-service';
import { useAuth } from '../providers/AuthContext';
import { useUser } from '../providers/UserContext';
import { useMainContext } from '../providers/MainContext';

const SettingsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [show, setShow] = useState('');
  const navigation = useNavigation();
  const router = useRouter();
  const { userProfile, logout } = useAuth();
  const { resetUserContext } = useUser();
  const { resetMainContext } = useMainContext();
  const [emailNotificationsState, setEmailNotificationsState] = useState(
    userProfile.emailNotifications
  );

  const dismiss = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      await logout();
      resetUserContext();
      resetMainContext();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePressPrivacy = async () => {
    let result = await WebBrowser.openBrowserAsync(
      `https://www.victorylabs.io/privacy-policy-presently`
    );
  };

  const handlePressIcons = async () => {
    let result = await WebBrowser.openBrowserAsync(`https://icons8.com/`);
  };

  const handleShow = (section: string) => {
    if (show === section) return setShow('');
    else setShow(section);
  };

  const handleNotificationToggle = async () => {
    const profileInput = {
      emailNotifications: !emailNotificationsState,
    };
    const response = await updateUserProfile(profileInput);
    if (response.message === 'User profile updated')
      setEmailNotificationsState(!emailNotificationsState);
  };

  return (
    <View style={styles.container}>
      <TitleBack title="Settings" marginLeft={-80} paddingRight={100} />

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          paddingBottom: 60,
          marginTop: 20,
        }}
      >
        <View>
          {/* <View style={styles.filterContainer}>
            <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
              General
            </Text>
            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          ></View> */}

          {/* <View style={styles.filterContainer}>
            <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
              Terms of Service
            </Text>
            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          ></View> */}

          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
              Privacy Policy
            </Text>
            <TouchableOpacity onPress={handlePressPrivacy}>
              <FontAwesome name="chevron-right" size={16} color={'black'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '80%',
              backgroundColor: 'black',
              alignSelf: 'center',
            }}
          ></View>
          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
              Delete Account
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push('/delete-user');
              }}
            >
              <FontAwesome name="chevron-right" size={16} color={'black'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '80%',
              backgroundColor: 'black',
              alignSelf: 'center',
            }}
          ></View>
          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
              Preferences
            </Text>
            <TouchableOpacity onPress={() => handleShow('preferences')}>
              <FontAwesome
                name={show === 'preferences' ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          {show === 'preferences' && (
            <View style={styles.filterContainer}>
              <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 14 }}>
                Enable / Disable Email Notifications
              </Text>
              <TouchableOpacity onPress={handleNotificationToggle}>
                {emailNotificationsState ? (
                  <FontAwesome name="toggle-on" color="#53CF85" size={20} />
                ) : (
                  <FontAwesome name="toggle-off" color="#AF95E7" size={20} />
                )}
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              height: 1,
              width: '80%',
              backgroundColor: 'black',
              alignSelf: 'center',
            }}
          ></View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
          }}
        >
          <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
            Select imagery powered by{' '}
            <Text
              onPress={handlePressIcons}
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                fontFamily: 'PilcrowMedium',
              }}
            >
              Icons8
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  closeText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#e9ecef',
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 80,
  },
  logoutText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default SettingsScreen;
