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
import * as friendService from "../utilities/friends-service";
import { useLocalSearchParams } from "expo-router";
import { calculateAge, daysUntilBirthday, splitDOB } from "../utilities/helpers";

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
}

export default function UserProfileScreen() {
  const [selected, setSelected] = useState("profile");
  const [user, setUser] = useState <Friend | null> (null);
  const [dobObject, setDobObject] = useState ({
    year: '',
    month: '',
    day: '',
  });
  const { id } = useLocalSearchParams();

  const fetchUser = async () => {
    try {
      console.log("This is the id", id);
      const friend = await friendService.retrieveFriend(id);

      if (friend) {
        setUser(friend);
        setDobObject(splitDOB(friend.dob));
        console.log("FRIEND", friend);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCover}></View>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/alex.jpg")}
          style={styles.avatar}
        />
        <Text>{user && user.name}</Text>
        <Text>Friend</Text>
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
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          style={{ position: "relative", right: -40, top: 0 }}
        />
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
          <Gifts isExplore={true} favoriteGifts={null} />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
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
  },

  unselected: {
    color: "gray",
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 140,
    right: 0,
    top: 0,
    backgroundColor: "#F5F5F5",
  },
});
