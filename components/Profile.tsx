import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Gifts from "./Gifts";
import ProfileContent from "./ProfileContent";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as friendService from "../utilities/friends-service";
import {
  calculateAge,
  daysUntilBirthday,
  splitDOB,
} from "../utilities/helpers";
import { useLocalSearchParams } from "expo-router";
import { calculateAge, daysUntilBirthday, splitDOB } from "../utilities/helpers";
import { colors } from "../constants/Theme";


interface Friend {
    name: string;
    gender: string;
    location: string;
    dob: string;
    photo: string;
    bio: string;
    interests: string[];
    tags: string[];
    user: string;
    giftPreferences: string[];
    favoriteGifts: string[];



export default function UserProfileScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("profile");

  const [user, setUser] = useState <Friend | null> (null);
  const [dobObject, setDobObject] = useState ({
    year: '',
    month: '',
    day: '',
  });
  const [enableRecs, setEnableRecs] = useState <boolean> (false);

  const { id } = useLocalSearchParams();

  const fetchFriend = async () => {
    try {
      const friendData = await friendService.retrieveFriend(id);
      if (friendData) {
        const uniqueTimestamp = Date.now();
        friendData.photo = `${
          friendData.photo
            ? friendData.photo
            : "https://i.imgur.com/hCwHtRc.png"
        }?timestamp=${uniqueTimestamp}`;
        setFriend(friendData);


      if (friend) {
        setUser(friend);
        setDobObject(splitDOB(friend.dob));
        if (friend.tags.length > 0) setEnableRecs(true);

      }
    } catch (error) {
      console.error("Error fetching friend: ", error);
    }
  };


  useEffect(() => {
    fetchFriend();
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCover}></View>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0, top: 40 }}
          onPress={() => router.back()}
        >
          <Image
            source={require("../assets/images/arrow-left.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Image
          source={user && user.photo ? { uri: user.photo } : { uri: "https://i.imgur.com/hCwHtRc.png" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{friend && friend.name}</Text>
        <Text style={styles.subText}>Friend</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDescription}>
          <Text style={{ color: "#804C46", fontWeight: "bold" }}>{dobObject && dobObject.day}</Text>
          <Text>{dobObject && dobObject.month}</Text>

        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>
        <View style={styles.infoDescription}>

          <Text style={{ color: "#804C46", fontWeight: "bold" }}>{user && daysUntilBirthday(user.dob)}</Text>
          <Text>Days left</Text>

        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>

        <View style={styles.infoDescription}>

          <Text style={{ color: "#804C46", fontWeight: "bold" }}>{user && calculateAge(user.dob)}</Text>
          <Text>Age</Text>

        </View>
        <TouchableOpacity onPress={() => router.push(`/users/${id}/update`)}>
          <Image
            source={require("../assets/images/pencil.png")}
            style={{ height: 20, width: 20, right: -40 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("profile")}
        >
          <Text
            style={selected == "profile" ? styles.selected : styles.unselected}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("gifts")}
        >
          <Text
            style={selected == "profile" ? styles.unselected : styles.selected}
          >
            Explore Gifts
          </Text>
        </TouchableOpacity>
      </View>

      {selected == "profile" ? (
        <ScrollView>

            <ProfileContent giftPreferences={user?.giftPreferences} tags={user?.tags} favoriteGifts={user?.favoriteGifts} />

        </ScrollView>
        ) : (
          <Gifts isExplore={true} favoriteGifts={null} isEnabled={enableRecs} />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.cream,
    paddingTop: 120,
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
    backgroundColor: colors.orange,
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
});
