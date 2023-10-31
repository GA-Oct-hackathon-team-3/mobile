import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import TitleBack from "./TitleBack";
import { colors } from "../constants/Theme";
import * as friendsService from "../utilities/friends-service";
import * as tagsService from "../utilities/tags-service";
import { capitalizeFirstLetter } from "./EditFriendProfile.web";
import ToastManager, { Toast } from "toastify-react-native";
import { useAuth } from "./AuthContext";
import * as UserApi from "../utilities/users-api";

export default function EditTags() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const [searchTag, setSearchTag] = useState("");
  const [addedTags, setAddedTags] = useState([
    "Pokemon",
    "Rock Climbing",
    "Chicago",
    "Male",
  ]);
  const [friend, setFriend] = useState(null);

  const showToasts = () => {
    Toast.success("Tags Updated");
  };

  const tagCategories = {
    "Popular Tags": ["Movie Buff", "Minimal", "Quirky"],
    Aesthetic: ["Grunge", "Minimal", "Quirky"],
    Hobbies: [
      "Reading",
      "Outdoor Activities",
      "Arts and Crafts",
      "Socializing",
      "Sports",
      "Writing",
      "Working Out",
      "Cooking",
      "Gaming",
    ],
  };
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>();

  const fetchTags = async () => {
    console.log("PARAMS ID", params, "USER ID", userData);

    let friendData = await friendsService.retrieveFriend(params.id);

    setAddedTags(
      friendData.tags.map((tag) => capitalizeFirstLetter(tag.title))
    );
    setFriend(friendData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagPress = (tag) => {
    if (!addedTags.includes(tag)) {
      setAddedTags((prev) => [...prev, tag]);
    }
  };

  const handleSearchSubmit = () => {
    if (!addedTags.includes(searchTag) && searchTag !== "") {
      setAddedTags((prev) => [...prev, searchTag]);
      setSearchTag("");
    }
  };

  function scrollViewSizeChanged(height) {
    // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      addedTags.forEach(async (tag) => {
        await tagsService.addTag(friend._id, {
          title: tag,
          category: "Popular",
        });
      });
      showToasts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ToastManager />

      <View style={{ flexDirection: "column", gap: 8, maxHeight: 160 }}>
        <TitleBack title={"Edit Tags"} marginLeft={-100} />
        <Text style={{ textAlign: "center" }}>
          What’s your friend into? Adding tags helps Presently give more
          accurate gift suggestions.
        </Text>
        <View
          style={{
            flexDirection: "row",
            maxHeight: 200,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/images/singer.png")}
            style={{ height: 100, width: 100 }}
          />
          <Image
            source={require("../assets/images/biker.png")}
            style={{
              height: 130,
              width: 100,
              transform: [{ rotateY: "180deg" }],
            }}
          />
          <Image
            source={require("../assets/images/gardner.png")}
            style={{
              height: 100,
              width: 100,
              transform: [{ rotateY: "180deg" }],
            }}
          />
        </View>
      </View>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Type to create custom tag"
          value={searchTag}
          onChangeText={setSearchTag}
          onSubmitEditing={handleSearchSubmit}
          style={styles.input}
        />

        <Text>Added Tags</Text>
        <ScrollView
          contentContainerStyle={{ maxHeight: 180 }}
          ref={scrollViewRef}
          onContentSizeChange={(width, height) => {
            scrollViewSizeChanged(height);
          }}
        >
          <View style={styles.addedTagsContainer}>
            {addedTags.map((tag) => (
              <View key={tag} style={styles.tagSelectButton}>
                <Text key={tag} style={styles.tagSelectText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <ScrollView
          contentContainerStyle={{ maxHeight: 240, paddingBottom: 100 }}
        >
          {Object.entries(tagCategories).map(([category, tags]) => (
            <View key={category}>
              <Text>{category}</Text>
              <View style={styles.tagList}>
                {tags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => handleTagPress(tag)}
                    style={styles.tagButton}
                  >
                    <Text style={{ fontFamily: "PilcrowRounded" }}>
                      {tag} +
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "space-around",
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
    marginBottom: 20,
    backgroundColor: colors.brightWhite,
    borderRadius: 10,
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
});
