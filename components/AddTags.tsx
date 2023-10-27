import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import TitleBack from "./TitleBack";
import { colors } from "../constants/Theme";

export default function AddTags() {
  const [searchTag, setSearchTag] = useState("");
  const [addedTags, setAddedTags] = useState([
    "Pokemon",
    "Rock Climbing",
    "Chicago",
    "Male",
  ]);
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

  return (
    <View style={styles.container}>
      <TitleBack title={"Add Tags"} />
      <View>
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
              <Text key={tag} style={styles.tagSelectButton}>
                {tag}
              </Text>
            ))}
          </View>
        </ScrollView>

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
                  <Text>{tag} +</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.cream,
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
  },
  tagSelectButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    margin: 5,
    backgroundColor: "#D9D9D9",
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#747474",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttonText: {
    color: "white",
  },
});
