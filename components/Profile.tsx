const DUMMY_PROFILE = {
  first_name: "Alex",
  last_name: "Turner",
  birthday: "1992-01-10",
  about:
    "A passionate developer who loves sushi, cheers for the 49ers, and spends weekends coding.",
  tags: ["Sushi Lover", "49ers Fan", "Programmer"],
  image: "https://via.placeholder.com/150", // A dummy image. Replace with a real one if needed.
};
// Import necessary components and libraries
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
import { colors } from "../constants/Theme";

export default function UserProfileScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("profile");
  const [friend, setFriend] = useState(null);
  const [dobObject, setDobObject] = useState(null);
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
        console.log(friendData);
        setDobObject(splitDOB(friendData.dob));
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
          source={require("../assets/images/alex.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{friend && friend.name}</Text>
        <Text style={styles.subText}>Friend</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDescription}>
          <Text style={styles.numberText}> {dobObject && dobObject.day}</Text>
          <Text style={styles.subText}>{dobObject && dobObject.month}</Text>
        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>
        <View style={styles.infoDescription}>
          <Text style={styles.numberText}>
            {friend && daysUntilBirthday(friend.dob)}
          </Text>
          <Text style={styles.subText}>Days left</Text>
        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>

        <View style={styles.infoDescription}>
          <Text style={styles.numberText}>
            {friend && calculateAge(friend.dob)}
          </Text>
          <Text style={styles.subText}>Age</Text>
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
          <ProfileContent />
        </ScrollView>
      ) : (
        <Gifts isExplore={true} />
      )}

      {/* You can add the "Favorited Gifts" section similarly */}
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
