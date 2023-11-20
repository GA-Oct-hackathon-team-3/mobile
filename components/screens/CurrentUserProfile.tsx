// Import necessary components and libraries
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Gifts from "../Gifts";
import ProfileContent from "../ProfileContent";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/Theme";
import { useAuth } from "../providers/AuthContext";
import * as UserAPI from "../../utilities/users-api";
import { useRouter } from "expo-router";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { getProfile } from "../../utilities/profile-service";
import {
  calculateAge,
  daysUntilBirthday,
  splitDOB,
} from "../../utilities/helpers";
export default function CurrentUserProfileScreen() {
  const [selected, setSelected] = useState("profile");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [dobObject, setDobObject] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [favorites, setFavorites] = useState([]);
  const { userProfile } = useAuth();

  const [user, setUser] = useState(null);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {}, []);

  const goToSettings = () => {
    router.push("/settings");
  };

  const onLoad = () => {
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {!userProfile ? (
        <ProfileSkeleton isCurrUser={true} />
      ) : (
        <>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 60,
              right: 0,
              height: 40,
              width: 40,
              zIndex: 1,
            }}
            onPress={goToSettings}
          >
            <FontAwesome name="gears" size={24} color={colors.brightWhite} />
          </TouchableOpacity>
          <View style={styles.backgroundCover}></View>
          <View style={styles.header}>
            {userProfile && (
              <Image
                source={{
                  uri: userProfile.photo
                    ? userProfile.photo
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                style={styles.avatar}
                onLoadEnd={onLoad}
              />
            )}
            <Text style={styles.name}>{userProfile && userProfile.name}</Text>
            <Text style={styles.subText}>Friend</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.infoDescription}>
              <Text style={styles.numberText}>
                {splitDOB(userProfile.dob).day}
              </Text>
              <Text style={styles.subText}>
                {splitDOB(userProfile.dob).month}
              </Text>
            </View>
            <View
              style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
            ></View>
            <View style={styles.infoDescription}>
              <Text style={styles.numberText}>
                {userProfile && daysUntilBirthday(userProfile.dob)}
              </Text>
              <Text style={styles.subText}>Days left</Text>
            </View>
            <View
              style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
            ></View>

            <View style={styles.infoDescription}>
              <Text style={styles.numberText}>
                {userProfile && calculateAge(userProfile.dob)}
              </Text>
              <Text style={styles.subText}>Age</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/edit-profile")}>
              <Image
                source={require("../../assets/images/pencil.png")}
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
                style={
                  selected == "profile" ? styles.selected : styles.unselected
                }
              >
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSelect("gifts")}
            >
              <Text
                style={
                  selected == "profile" ? styles.unselected : styles.selected
                }
              >
                Explore Gifts
              </Text>
            </TouchableOpacity>
          </View>

          {selected == "profile" ? (
            <ScrollView>
              <View
                style={{
                  flexDirection: "column",

                  borderColor: "lightgray",
                  borderWidth: 1,
                  borderRadius: 10,
                  minHeight: 150,
                  backgroundColor: colors.brightWhite,
                }}
              >
                <View style={[styles.giftTop]}>
                  <Text style={styles.text}>Bio</Text>
                  <TouchableOpacity
                    onPress={() => router.push(`/edit-profile`)}
                  >
                    <Image
                      source={require("../../assets/images/pencil.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}
                >
                  <Text style={styles.text}>
                    {userProfile && userProfile.bio}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  borderRadius: 10,
                  minHeight: 150,
                  backgroundColor: colors.brightWhite,
                  marginTop: 20,
                }}
              >
                <View style={styles.giftTop}>
                  <Text style={styles.text}>Interests</Text>
                  <TouchableOpacity
                    onPress={() => router.push(`/edit-interests`)}
                  >
                    <Image
                      source={require("../../assets/images/pencil.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.tagsSection}>
                  {userProfile.interests.map((interest, idx) => (
                    <View style={styles.tag} key={idx}>
                      <Text
                        key={idx}
                        style={{
                          fontFamily: "PilcrowMedium",
                          fontSize: 16,
                          color: colors.brightWhite,
                        }}
                      >
                        {interest}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          ) : (
            <Gifts isExplore={true} />
          )}
        </>
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
  text: {
    fontFamily: "PilcrowMedium",
    fontSize: 16,
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
  giftTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
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
  tag: {
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.green,
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 100,
    padding: 10,
    alignItems: "center",
    gap: 12,
  },
});
