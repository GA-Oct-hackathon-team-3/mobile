import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  Image,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  deleteReminder,
  getReminders,
  markAsRead,
} from '../utilities/notification-service';
import { updateFriend } from '../utilities/friends-service';
import { colors } from '../constants/Theme';
import { capitalizeFirstLetter, getAgeAndSuffix } from '../utilities/helpers';
type Props = {};

type ItemProps = {
  id: string;
  friendId: string;
  name: string;
  dob: string;
  photo: string;
  hasGift: boolean;
  daysUntilBirthday: number;
  setReminders: React.Dispatch<React.SetStateAction<Reminders>>;
};

type INotification = {
  _id: string;
  friend: {
    _id: string;
    name: string;
    dob: string;
    photo: string;
    hasGift: boolean;
    daysUntilBirthday: number;
  };
  isRead: boolean;
};

type Reminders = {
  current: INotification[];
  past: INotification[];
};

function PastReminders({}: Props) {
  const [reminders, setReminders] = useState<Reminders>({
    current: [],
    past: [],
  });

  useEffect(() => {
    const fetchReminders = async () => {
      const reminderData = await getReminders();
      if (reminderData && !reminderData.message) setReminders(reminderData);
    };

    const readNotifications = async () => {
      if (!reminders.current.length) return;
      const ids = reminders.current.map((notif) => notif._id);
      const response = await markAsRead(ids); // sends ids to backend to mark as read
    };

    fetchReminders();
    readNotifications();
  }, []);

  return (
    <SectionList
      sections={[
        { title: 'Current', data: reminders!.current },
        { title: 'Past', data: reminders!.past },
      ]}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <Item
          id={item._id.toString()}
          friendId={item.friend._id}
          name={item.friend.name}
          dob={item.friend.dob}
          photo={item.friend.photo}
          daysUntilBirthday={item.friend.daysUntilBirthday}
          hasGift={item.friend.hasGift}
          setReminders={setReminders}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={[styles.header, { paddingTop: title === 'Past' ? 20 : 0 }]}
        >
          {title}
        </Text>
      )}
    />
  );
}

const Item: React.FC<ItemProps> = ({
  id,
  friendId,
  name,
  dob,
  photo,
  hasGift,
  daysUntilBirthday,
  setReminders,
}) => {
  const [checked, setChecked] = useState(hasGift);
  const { width } = useWindowDimensions();

  const handleCheckGift = async (id: string) => {
    const friendInput = { hasGift: !checked };
    const response = await updateFriend(id, friendInput);
    if (response && response.message === 'Friend updated') setChecked(!checked);
  };

  const removeReminder = async () => {
    const response = await deleteReminder(id);
    if (response && response.message === 'Reminder deleted successfully') {
      setReminders((prev) => ({
        ...prev,
        current: prev.current.filter((notif) => notif._id !== id),
        past: prev.past.filter((notif) => notif._id !== id),
      }));
    }
  };

  return (
    <View style={{ width: width - 40 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.brightWhite,
          padding: 10,
          alignItems: 'center',
          marginTop: 10,
          borderWidth: 1,
          borderColor: 'lightgray',
          borderRadius: '10%',
        }}
      >
        <Image
          source={{
            uri: photo
              ? photo
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <Text style={styles.text}>
            {name && capitalizeFirstLetter(name)}'s
          </Text>
          <Text style={styles.text}>
            {dob && getAgeAndSuffix(dob)} birthday
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: colors.pink,
              fontFamily: 'PilcrowBold',
              fontSize: 32,
            }}
          >
            {daysUntilBirthday && Math.abs(daysUntilBirthday)}
          </Text>
          <Text style={styles.text}>
            {daysUntilBirthday >= 0 ? 'Days Left' : 'Days Ago'}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <TouchableOpacity
            onPress={() => handleCheckGift(friendId)}
            style={
              checked
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
            {checked ? (
              <FontAwesome name={'check'} size={20} color={'white'} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.text}>Gift?</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={removeReminder}
        style={{
          position: 'absolute',
          right: -10,
          top: 0,
          height: 20,
          width: 20,
          backgroundColor: colors.green,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          zIndex: 99,
        }}
      >
        <FontAwesome name={'close'} size={14} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontFamily: 'PilcrowRounded',
    fontSize: 22,
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'PilcrowRounded',
  },
});

export default PastReminders;
