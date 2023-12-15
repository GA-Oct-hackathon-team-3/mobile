import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Image,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getNotifications, markAsRead } from '../utilities/notification-service';
import { colors } from "../constants/Theme";
import { capitalizeFirstLetter, getAgeAndSuffix } from "../utilities/helpers";
type Props = {};

type ItemProps = {
    id: string;
    name: string;
    dob: string;
    daysUntilBirthday: number;
  };

type INotification = {
    _id: string;
    friendId: {
        _id: string;
        name: string;
        dob: string;
        daysUntilBirthday: number;
    },
    isRead: boolean;
}

type Reminders = {
    current: INotification[],
    past: INotification[],
}

function PastReminders({}: Props) {
    const [notifications, setNotifications] = useState <Reminders> ({ current: [], past: [] });

    useEffect(() => {
        const fetchNotifications = async () => {
            const notificationData = await getNotifications();
            if (notificationData && !notificationData.message) setNotifications(notificationData);
        }

        const readNotifications = async () => {
            const ids = notifications.current.map(notif => notif._id);
            const response = await markAsRead(ids); // sends ids to backend to mark as read
          }

        fetchNotifications();

        setTimeout(() => {
            // if there are no current notifications (i.e isRead: false), then don't run call to backend
            if (notifications.current.length > 0) readNotifications();
         }, 3000); // slight delay

    }, []);

  return (
    <SectionList
      sections={[
        { title: 'Current', data: notifications!.current },
        { title: 'Past', data: notifications!.past },
      ]}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <Item id={item._id.toString()} name={item.friendId.name} dob={item.friendId.dob} daysUntilBirthday={item.friendId.daysUntilBirthday} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={[styles.header, { paddingTop: title === "Past" ? 20 : 0 }]}
        >
          {title}
        </Text>
      )}
    />
  );
}

const Item : React.FC<ItemProps> = ({ id, name, dob, daysUntilBirthday }) => {
  const [checked, setChecked] = useState(false);
  const { width } = useWindowDimensions();

  const removeReminder = async () => {
    console.log(`remove ${id}`);
  };

  return (
    <View style={{ width: width - 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.brightWhite,
          padding: 10,
          alignItems: "center",
          marginTop: 10,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: "10%",
        }}
      >
        <Image
          source={require("../assets/images/alex.jpg")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <Text style={styles.text}>{name && capitalizeFirstLetter(name)}'s</Text>
          <Text style={styles.text}>{dob && getAgeAndSuffix(dob)} birthday</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: colors.pink,
              fontFamily: "PilcrowBold",
              fontSize: 32,
            }}
          >
            {daysUntilBirthday && daysUntilBirthday}
          </Text>
          <Text style={styles.text}>Days Left</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={
              checked
                ? {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.green,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }
                : {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.brightWhite,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: 2,
                  }
            }
          >
            {checked ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.text}>Gift?</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={removeReminder}
        style={{
          position: "absolute",
          right: -10,
          top: 0,
          height: 20,
          width: 20,
          backgroundColor: colors.green,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          zIndex: 99,
        }}
      >
        <FontAwesome name={"close"} size={14} color={"white"} />
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontFamily: "PilcrowRounded",
    fontSize: 22,
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: "PilcrowRounded",
  },
});

export default PastReminders;
