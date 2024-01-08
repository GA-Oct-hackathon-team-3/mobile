import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors } from "../../constants/Theme";
import { FontAwesome } from "@expo/vector-icons";
import ManageReminders from "../ManageReminders";
import PastReminders from "../PastReminders";
import EditReminders from "./EditReminders";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as notifService from '../../utilities/notification-service';
// import * as deviceTokenService from '../../utilities/device-token-service';

type Props = {};

function Reminders({}: Props) {
  const [activeTab, setActiveTab] = useState("Reminders");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();


  const handleSelect = (value: string) => {
    setActiveTab(value);
  };

//   const handleEdit = () => {
//     console.log(selectedFriends);
//     router.push({
//         pathname: "/reminders/edit-reminders",
//     });
//   };

  return (
    <View style={[{ paddingTop: insets.top + 8 }, styles.container]}>

      <View style={styles.actionButtons}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("Reminders")}
        >
          <Text
            style={activeTab == "Manage" ? styles.unselected : styles.selected}
          >
            Reminders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("Manage")}
        >
          <Text
            style={activeTab == "Manage" ? styles.selected : styles.unselected}
          >
            Manage Reminders
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab == "Manage" ? (
        <>
          <ManageReminders />
          {/* <TouchableOpacity onPress={handleEdit} style={styles.submitButton}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "PilcrowMedium",

                textAlign: "center",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity> */}
        </>
      ) : (
        <PastReminders />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginVertical: 10,
    paddingTop: 10,
  },
  giftType: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  infoDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    color: "black",
    textDecorationLine: "underline",
    fontFamily: "PilcrowMedium",
    fontSize: 20,
  },

  unselected: {
    color: "gray",
    fontFamily: "PilcrowRounded",
    fontSize: 18,
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 140,
    right: 0,
    top: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    fontFamily: "PilcrowMedium",
    fontSize: 24,
  },
  subText: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
  numberText: {
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    color: colors.orange,
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 40,

    position: "absolute",
    left: 60,
    right: 60,
    bottom: 20,

    alignItems: "center", // Center children horizontally
    justifyContent: "center",
  },
});

export default Reminders;
