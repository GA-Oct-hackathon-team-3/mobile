import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
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
import { useMainContext } from './providers/MainContext';

type IUpdatedFriends = {
  [id: string]: boolean;
};

function ManageReminders() {
  const { userProfile } = useAuth();
  const { friends, fetchFriends } = useMainContext();
  const [flattenedFriendsList, setFlattenedFriendsList] = useState([]); // use to reset filter
  const [filteredFriends, setFilteredFriends] = useState([]); // use to render
  const [updatedFriends, setUpdatedFriends] = useState<IUpdatedFriends>({}); // accumulates changes to includeInNotifications per friend
  const [query, setQuery] = useState('');
  const [frequency, setFrequency] = useState<number[]>(
    userProfile.notificationSchedule
  );

  useEffect(() => {
    if (friends) {
      // friends comes in { today: [], thisWeek: [], thisMonth: [], laterOn: [] } structure
      // use concat to flatten into single array
      const flattenedFriendArray = friends.today.concat(
        friends.thisWeek,
        friends.thisMonth,
        friends.laterOn
      );
      setFlattenedFriendsList(flattenedFriendArray); // maintains all friends (to revert changes from query)
      setFilteredFriends(flattenedFriendArray); // displays data (is updated with query)
    }
  }, []);

  const handleFrequencyChange = (days: number) => {
    setFrequency((prev: number[]) =>
      prev.includes(days)
        ? prev.filter((prevDays) => prevDays !== days)
        : [...prev, days]
    );
  };

  const handleFrequencySubmit = async () => {
    if (frequency && frequency.length > 0) {
      const userData = {
        notificationSchedule: [...frequency],
      };
      await updateUserProfile(userData);
    }
  };

  const handleSearch  = (queryInput : string) => {
    setQuery(queryInput);

    if (queryInput) {
        // if query, filter and return filtered results
        setFilteredFriends(
            flattenedFriendsList.filter((friend) =>
            friend.name.toLowerCase().includes(queryInput.toLowerCase())
        )
        );
    } else setFilteredFriends(flattenedFriendsList);  // else revert to original

  }

  const handleSelectFriend = (id: string, includeInNotifications: boolean) => {
    // if if is a key in object, set to opposite value, otherwise set to !includeNotifications
    const updatedNotificationValue = updatedFriends.hasOwnProperty(id)
      ? !updatedFriends[id]
      : !includeInNotifications;

    // maintains object of key with ids of friends were who updated, and the boolean value to which includeInNotifications should be updated to
    // ids for submission to backend, value to update render
    setUpdatedFriends((prev) => {
      if (updatedNotificationValue === includeInNotifications) {
        // if the value to update is equal to original value (i.e if toggled twice)...
        const { [id]: omit, ...rest } = prev; // remove id key from state to prevent submission of id to backend
        return rest;
      }

      return {
        ...prev,
        [id]: updatedNotificationValue,
      };
    });
  };

  const handleFriendSubmit = async () => {
    const friendIds = Object.keys(updatedFriends);
    if (friendIds.length === 0) return;
    const response = await updateFriendNotification(friendIds);
    if (
      response &&
      response.message === 'Updated friend notification preference successfully'
    ) {
      setUpdatedFriends({} as IUpdatedFriends); // resets state
      fetchFriends();
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
          Select the number of days in advance you want to receive a
          notification. Please choose at least one option.
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleFrequencyChange(30)}
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
            onPress={() => handleFrequencyChange(7)}
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
            onPress={() => handleFrequencyChange(0)}
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
      <View>
        <TouchableOpacity
          onPress={handleFrequencySubmit}
          style={styles.submitButton}
        >
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Text style={styles.text}>
          Enable or disable notifications for each friend and confirm below:
        </Text>
        <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.brightWhite,
        }}
      >
        <TextInput
                      value={query}
                      onChangeText={handleSearch}
          placeholder="Search by name, date, month..."
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      </View>
        <FlatList
          data={filteredFriends}
          renderItem={({ item }) => (
            <Item
              {...item}
              handleSelectFriend={handleSelectFriend}
              updatedFriends={updatedFriends}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleFriendSubmit}
          style={styles.submitButton}
        >
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
  handleSelectFriend,
  updatedFriends,
}) => {
  const [checked, setChecked] = useState(includeInNotifications);
  const { width } = useWindowDimensions();

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
      <TouchableOpacity
        onPress={() => handleSelectFriend(_id, includeInNotifications)}
      >
        {
          // if friend is in updatedFriends object, display the new value within updatedFriends
          // else display the includeInNotifications value
          updatedFriends[_id] ?? includeInNotifications ? (
            <FontAwesome name={'toggle-on'} size={30} color={colors.green} />
          ) : (
            <FontAwesome name={'toggle-off'} size={30} color={colors.purple} />
          )
        }
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
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,

    backgroundColor: colors.brightWhite,
    borderRadius: 10,
    width: "100%",
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
