import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import * as friendService from "../utilities/friends-service";

function UserProfile() {
  const [about, setAbout] = useState("Software Developer at XYZ Company");
  const [tag, setTag] = useState(""); // Temporary state to hold a new tag
  const [tags, setTags] = useState(["Sushi Lover", "49ers Fan", "Programmer"]);
  const [generatedGiftIdea, setGeneratedGiftIdea] = useState<string>("");
  const [resultArray, setResultArray] = useState<Array<object> | null>(null);
  const [completedTyping, setCompletedTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useLocalSearchParams();

  const [user, setUser] = useState(null);

  const addTag = () => {
    if (tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const fetchUser = async () => {
    try {
      console.log("This is the id", id);
      const friend = await friendService.retrieveFriend(id);

      if (friend) {
        setUser(friend);
        console.log("FRIEND", friend);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function stringToArray(inputString) {
    try {
      const matched = inputString.match(/\[.*\]/s); // Match everything between square brackets.
      if (!matched) {
        throw new Error("Valid JSON not found in the input string");
      }

      return JSON.parse(matched[0]);
    } catch (error) {
      console.error("Error parsing the string:", error);
      return null;
    }
  }

  const handleSendRequest = async () => {
    setLoading(true);

    try {
      const response = await generateGiftIdea();
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
        };
        console.log(content, "HERE IS THE CONTENT");
        setResultArray(stringToArray(content));
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePressButtonAsync = async (query) => {
    const formattedQuery = replaceSpacesWithPlus(query);
    let result = await WebBrowser.openBrowserAsync(
      `https://www.amazon.com/s?k=${formattedQuery}`
    );
  };

  const resultItem = (result) => {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.giftText}>{result.gift}</Text>
        <TouchableOpacity onPress={() => handlePressButtonAsync(result.gift)}>
          <View style={styles.amazonbutton}>
            <Text style={styles.amazonbuttonText}>See On Amazon</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  function replaceSpacesWithPlus(inputString) {
    return inputString.replace(/ /g, "+");
  }

  async function generateGiftIdea() {
    // const apiMessages = chatMessages.map((messageObject) => {
    //   return { content: messageObject.message };
    // });

    let result = tags.join(", ");

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Recommend me a birthday gift for each of these tags: ${result} Put answer in JSON format using an array of objects using the keys tag and gift. Don't exceed 40 characters per recommendation and make each recommendation be searchable on Amazon to precisely find the item.`,
        },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  const removeTag = (tag) => {
    const newTags = tags.filter((item) => item !== tag);
    setTags(newTags);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Info</Text>

      <TextInput
        style={styles.aboutInput}
        value={about}
        onChangeText={setAbout}
        multiline
        placeholder={`About`}
      />

      <View style={styles.tagInputContainer}>
        <TextInput
          style={styles.tagInput}
          value={tag}
          onChangeText={setTag}
          placeholder="Add a tag..."
        />
        <TouchableOpacity style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.tagsSection}>
        {tags.map((tag) => (
          <View style={styles.tag} key={tag}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: -5,
                top: -5,
                alignItems: "center",
                justifyContent: "center",
                height: 16,
                width: 16,
                backgroundColor: "black",
                borderRadius: 8,
              }}
              onPress={removeTag.bind(this, tag)}
            >
              <FontAwesome name="close" size={10} color="white" />
            </TouchableOpacity>

            <FontAwesome name="tag" size={16} color="white" />
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </ScrollView>

      {loading ? (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 360,
          }}
        >
          <ActivityIndicator size="large" color="purple" />
          <Text>Generating Gift Ideas...</Text>
        </View>
      ) : (
        <View style={{ minHeight: 360 }}>
          {resultArray && (
            <ScrollView contentContainerStyle={{ maxHeight: 360 }}>
              {resultArray.map((result) => resultItem(result))}
            </ScrollView>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { justifyContent: "flex-end", marginTop: 20 }]}
        onPress={handleSendRequest}
      >
        <Text style={styles.buttonText}>Generate Gift Ideas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "purple",
    marginBottom: 20,
    alignSelf: "center",
  },
  aboutInput: {
    fontSize: 18,
    maxHeight: 100,
    padding: 10,
    minHeight: 80,
  },
  input: {
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  tagInputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tagInput: {
    flex: 1,
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  tagList: {
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "purple",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 100,
  },
  tagText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  resultContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f8f8f8", // light gray background for each item
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1", // light border to give it a bit of structure
  },
  giftText: {
    fontSize: 16,
    marginBottom: 10,
  },
  amazonbutton: {
    backgroundColor: "#000000", // Amazon's signature color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // for Android shadow
  },
  amazonbuttonText: {
    fontSize: 16,
    color: "#ff9900", // white color for the text inside the button
    textAlign: "center",
  },
});

export default UserProfile;
