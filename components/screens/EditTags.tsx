import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { colors } from "../../constants/Theme";
import * as friendsService from "../../utilities/friends-service";
import * as tagsService from "../../utilities/tags-service";
import TitleBack from "../TitleBack";
import { useUser } from "../providers/UserContext";
import { capitalizeFirstLetter } from "../../utilities/helpers";
import { FontAwesome } from "@expo/vector-icons";

export default function EditTags() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const [searchTag, setSearchTag] = useState("");
  const [addedTags, setAddedTags] = useState([]);
  const [friend, setFriend] = useState(null);
  const [userTags, setUserTags] = useState([]);

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
  const { user, fetchFriend } = useUser();
  const { id } = useLocalSearchParams();
  const searchTagLower = searchTag.toLowerCase();
  const includesTag = addedTags.some(
    (tag) => tag.toLowerCase() === searchTagLower
  );

  const fetchTags = async () => {
    let friendData = await friendsService.retrieveFriend(params.id);

    setAddedTags(
      friendData.tags.map((tag) => capitalizeFirstLetter(tag.title))
    );
    setUserTags(
      friendData.tags.map((tag) => ({
        id: tag._id,
        tag: capitalizeFirstLetter(tag.title),
      }))
    );
    setFriend(friendData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagPress = (tag) => {
    if (!addedTags.includes(tag)) {
      setAddedTags((prev) => [...prev, tag]);
    } else {
      setAddedTags((prev) => prev.filter((t) => t !== tag));
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
    console.log("addedTags and userTags", addedTags, "     ", userTags);
    const tagsToRemove = userTags.filter((obj) => !addedTags.includes(obj.tag));
    console.log(tagsToRemove, "TAGS TO REMOVE");

    try {
      const addTagPromises = addedTags.map((tag) =>
        tagsService.addTag(friend._id, {
          title: tag,
          category: "Popular",
        })
      );

      // Create an array of promises for removing tags
      const removeTagPromises = tagsToRemove.map((tag) =>
        tagsService.removeTag(friend._id, tag.id)
      );
      if (addedTags.length === 0 && tagsToRemove.length > 0) {
        console.log("JUST REMOVE TAGS");
        await Promise.all([...removeTagPromises]);
      } else if (addedTags.length > 0 && tagsToRemove.length === 0) {
        console.log("JUST ADD TAGS");
        await Promise.all([...addTagPromises]);
      } else if (addedTags.length > 0 && tagsToRemove.length > 0) {
        console.log("ADD AND REMOVE TAGS");
        await Promise.all([...addTagPromises, ...removeTagPromises]);
      }

      fetchFriend();

      showToasts();
    } catch (err) {
      console.log("ERROR", err);
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
            placeholder="Type to create custom tag"
            value={searchTag}
            onChangeText={setSearchTag}
            onSubmitEditing={handleSearchSubmit}
            style={styles.input}
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity
            onPress={handleSearchSubmit}
            disabled={searchTag === "" || addedTags.includes(searchTag)}
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
                !includesTag && searchTag !== "" ? colors.green : "lightgray"
              }
            />
          </TouchableOpacity>
        </View>

        <Text>Added Tags</Text>
        <View style={{ maxHeight: 140 }}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={(width, height) => {
              scrollViewSizeChanged(height);
            }}
          >
            <View style={styles.addedTagsContainer}>
              {addedTags.map((tag) => (
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

        <View style={{ maxHeight: 240 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
});
