import React, { useEffect, useRef, useState } from "react";
import { getProfile, updateUserProfile } from "../../utilities/profile-service";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { colors } from "../../constants/Theme";
import TitleBack from "../TitleBack";
import { FontAwesome } from "@expo/vector-icons";

type Props = {};

function EditInterests({}: Props) {
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);
  const [user, setUser] = useState(null);
  const [searchInterest, setSearchInterest] = useState("");
  const [addedInterests, setAddedInterests] = useState([]);
  const scrollViewRef = useRef<ScrollView>();

  const searchInterestLower = searchInterest.toLowerCase();

  const includesInterest = addedInterests.some(
    (interest) => interest.toLowerCase() === searchInterestLower
  );

  const fetchUser = async () => {
    try {
      const data = await getProfile();
      setInterests(data.profile.interests);
      setLoading(false);
      setUser(data.profile);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    const lowerCaseInterests = addedInterests.map((interest) =>
      interest.toLowerCase()
    );

    try {
      await updateUserProfile({ interests: lowerCaseInterests });
    } catch (error) {
      console.log(error, "UNABLE TO UPDATE INTERESTS");
    }
  };

  const handleSearchSubmit = () => {
    if (!addedInterests.includes(searchInterest) && searchInterest !== "") {
      setAddedInterests((prev) => [...prev, searchInterest]);
      setSearchInterest("");
    }
  };

  function scrollViewSizeChanged(height) {
    // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }

  const handleTagPress = (interest) => {
    if (!addedInterests.includes(interest)) {
      setAddedInterests((prev) => [...prev, interest]);
    } else {
      setAddedInterests((prev) => prev.filter((t) => t !== interest));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", gap: 8, maxHeight: 160 }}>
        <TitleBack title={"Edit Interests"} marginLeft={-100} />
        <Text style={{ textAlign: "center" }}>
          What are your interests? Add as many as you want.
        </Text>
        <View
          style={{
            flexDirection: "row",
            maxHeight: 200,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/singer.png")}
            style={{ height: 100, width: 100 }}
          />
          <Image
            source={require("../../assets/images/biker.png")}
            style={{
              height: 130,
              width: 100,
              transform: [{ rotateY: "180deg" }],
            }}
          />
          <Image
            source={require("../../assets/images/gardner.png")}
            style={{
              height: 100,
              width: 100,
              transform: [{ rotateY: "180deg" }],
            }}
          />
        </View>
      </View>
      <View style={styles.topContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <TextInput
            placeholder="Type an interest"
            value={searchInterest}
            onChangeText={setSearchInterest}
            onSubmitEditing={handleSearchSubmit}
            style={styles.input}
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity
            onPress={handleSearchSubmit}
            disabled={
              searchInterest === "" || addedInterests.includes(searchInterest)
            }
            style={{
              position: "relative",
              right: 32,
              top: 0,
              bottom: 0,
              height: 30,
              width: 30,
            }}
          >
            <FontAwesome
              name={"plus-circle"}
              size={30}
              color={
                !includesInterest && searchInterest !== ""
                  ? colors.green
                  : "lightgray"
              }
            />
          </TouchableOpacity>
        </View>

        <Text>Added Interests</Text>
        <View style={{ maxHeight: 140 }}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(width, height) => {
              scrollViewSizeChanged(height);
            }}
          >
            <View style={styles.addedTagsContainer}>
              {addedInterests.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => handleTagPress(tag)}
                  style={styles.tagSelectButton}
                >
                  <Text
                    key={tag}
                    style={{
                      fontFamily: "PilcrowMedium",
                      color: colors.brightWhite,
                    }}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
        style={styles.submitButton}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: colors.cream,
  },
  topContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,

    backgroundColor: colors.brightWhite,
    borderRadius: 10,
    width: "100%",
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  addedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 5,
    borderRadius: 20,
    margin: 5,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    margin: 5,
    backgroundColor: colors.brightWhite,
  },
  tagSelectButton: {
    padding: 15,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    margin: 5,
    backgroundColor: colors.green,
    color: colors.brightWhite,

    opacity: 0.95,
  },
  tagSelectText: {
    fontSize: 18,

    color: colors.brightWhite,
    fontFamily: "PilcrowBold",
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "PilcrowRounded",
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 60,

    position: "absolute",
    left: 40,
    right: 40,
    bottom: 20,

    alignItems: "center", // Center children horizontally
    justifyContent: "center",
  },
});

export default EditInterests;
