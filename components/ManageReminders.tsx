import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  Image,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { colors } from '../constants/Theme';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatDate, capitalizeFirstLetter } from '../utilities/helpers';
import { updateFriendNotification } from '../utilities/friends-service';
import { updateUserProfile } from '../utilities/profile-service';
import { useAuth } from './providers/AuthContext';
type Props = {};

function ManageReminders({ friends }: Props) {
  const { userProfile } = useAuth();
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [frequency, setFrequency] = useState(userProfile.notificationSchedule);

  const handleChange = (days: number) => {
    setFrequency((prev) =>
      prev.includes(days)
        ? prev.filter((prevDays) => prevDays !== days)
        : [...prev, days]
    );
  };

  const handleSubmit = async () => {
    if (selectedFriendIds) {
      const friendIds = [...selectedFriendIds];
      const response = await updateFriendNotification(friendIds);
      if (
        response.message ===
        'Updated friend notification preference successfully'
      )
        setSelectedFriendIds([]);
      if (frequency) {
        const userData = {
          notificationSchedule: [...frequency],
        };
        const response = await updateUserProfile(userData);
      }
    }
  };

  return (
    <ScrollView
      style={{
        height: 100,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          gap: 20,
          paddingLeft: 40,
          paddingTop: 20,
        }}
      >
        <Text>Reminder Preferences</Text>
        <Text>
          Choose how many days before a firend's birthday that you would like to
          receive a notification. You must choose at least one option.
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange(30)}
            style={
              frequency.includes(30)
                ? {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }
                : {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.brightWhite,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: 2,
                  }
            }
          >
            {frequency.includes(30) ? (
              <FontAwesome name={'check'} size={20} color={'white'} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>One Month</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange(7)}
            style={
              frequency.includes(7)
                ? {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }
                : {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.brightWhite,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: 2,
                  }
            }
          >
            {frequency.includes(7) ? (
              <FontAwesome name={'check'} size={20} color={'white'} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>One Week</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange(0)}
            style={
              frequency.includes(0)
                ? {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }
                : {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.brightWhite,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: 2,
                  }
            }
          >
            {frequency.includes(0) ? (
              <FontAwesome name={'check'} size={20} color={'white'} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Day of</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Text style={styles.text}>
          Choose which friends you'd like to toggle notifications for:
        </Text>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <Item {...item} setSelectedFriendIds={setSelectedFriendIds} />
          )}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'PilcrowMedium',

              textAlign: 'center',
            }}
          >
            Confirm Updates
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Item = ({
  name,
  photo,
  dob,
  _id,
  includeInNotifications,
  setSelectedFriendIds,
}) => {
  const [checked, setChecked] = useState(includeInNotifications);
  const { width } = useWindowDimensions();

  const handleSelectFriend = (id) => {
    setChecked(!checked);
    setSelectedFriendIds((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.brightWhite,
        paddingHorizontal: 20,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray',
        width: width - 40,
      }}
    >
      <Image
        source={photo ? photo : require('../assets/images/alex.jpg')}
        style={{ height: 40, width: 40, borderRadius: 20 }}
      />

      <Text style={{ fontFamily: 'PilcrowBold', fontSize: 16 }}>
        {capitalizeFirstLetter(name)}{' '}
        <Text style={{ fontFamily: 'PilcrowRounded', fontSize: 16 }}>
          | {formatDate(dob)}
        </Text>
      </Text>
      <TouchableOpacity onPress={() => handleSelectFriend(_id)}>
        {checked ? (
          <FontAwesome name={'toggle-on'} size={30} color={colors.green} />
        ) : (
          <FontAwesome name={'toggle-off'} size={30} color={colors.purple} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'PilcrowRounded',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 40,
    width: 200,
    marginTop: 10,

    alignItems: 'center', // Center children horizontally
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ManageReminders;
