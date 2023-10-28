import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { colors } from "../constants/Theme";
import TitleBack from "./TitleBack";

import * as friendsService from "../utilities/friends-service";

import { FontAwesome } from "@expo/vector-icons";

export default function EditFriendProfile() {
  const [formInput, setFormInput] = useState({
    name: "",
    dob: "",
    gender: "",
    location: "",
    giftPreferences: [],
    giftCost: "",
  });
  const { width, height } = useWindowDimensions;
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const router = useRouter();

  const [image, setImage] = useState(null);

  const currentDate = new Date();

  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences((prev) =>
        prev.filter((item) => item !== preference)
      );
    } else {
      setSelectedPreferences((prev) => [...prev, preference]);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      ...formInput,
      giftPreferences: selectedPreferences.map((p) => p.toLowerCase()),
    };
    const friendData = await friendsService.createFriend(data);
    if (image) {
      try {
        const response = await friendsService.uploadPhoto(
          friendData._id,
          uploadedPhoto
        );
        if (response!.ok && friendData) router.replace("/");
      } catch (error) {
        console.log(error);
      }
    }
    if (friendData) router.replace("/");
  };

  // useEffect()

  return (
    <View style={styles.container}>
      <TitleBack title={"Edit Friend Profile"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-around",
          flex: 1,
        }}
      >
        <View style={styles.topContainer}>
          <View style={{ width: width, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.photoPlaceholder}
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <FontAwesome name="plus" size={40} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={formInput.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <Text style={styles.text}>Date of Birth</Text>
            <TextInput
              placeholder="yyyy-mm-dd"
              style={styles.input}
              value={formInput.dob}
              onChangeText={(text) => handleChange("dob", text)}
            />
            <Text style={styles.text}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Male" ? styles.selected : {},
                ]}
                onPress={() => {
                  setSelectedGender("Male");
                  handleChange("gender", "male");
                }}
              >
                <Text style={styles.text}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Female" ? styles.selected : {},
                ]}
                onPress={() => {
                  setSelectedGender("Female");
                  handleChange("gender", "female");
                }}
              >
                <Text style={styles.text}>Female</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Other" ? styles.selected : {},
                ]}
                onPress={() => {
                  setSelectedGender("Other");
                  handleChange("gender", "other");
                }}
              >
                <Text>Other</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>Location</Text>
            <TextInput
              placeholder="Location"
              style={styles.input}
              value={formInput.location}
              onChangeText={(text) => handleChange("location", text)}
            />

            <Text style={styles.text}>
              Gift type Preferences (choose all that apply)
            </Text>
            <View style={styles.checkboxContainer}>
              {/* You can replace these with actual checkboxes or other components */}
              <TouchableOpacity
                style={[
                  styles.preferenceButton,
                  selectedPreferences.includes("Present")
                    ? styles.selected
                    : {},
                ]}
                onPress={() => togglePreference("Present")}
              >
                <Text style={styles.text}>Present</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.preferenceButton,
                  selectedPreferences.includes("Experience")
                    ? styles.selected
                    : {},
                ]}
                onPress={() => togglePreference("Experience")}
              >
                <Text style={styles.text}>Experience</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.preferenceButton,
                  selectedPreferences.includes("Donation")
                    ? styles.selected
                    : {},
                ]}
                onPress={() => togglePreference("Donation")}
              >
                <Text style={styles.text}>Donation</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.text}>Gift Cost</Text>
              <TextInput
                placeholder="Gift Cost"
                style={styles.input}
                value={formInput.giftCost}
                onChangeText={(text) => handleChange("giftCost", text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/add-tags");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSubmit}>
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "70%",
    alignSelf: "center",
  },
  text: {
    color: "black",
    fontFamily: "PilcrowMedium",
    fontSize: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "PilcrowMedium",
  },
  container: {
    backgroundColor: colors.cream,

    flex: 1,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#53CF85",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    backgroundColor: colors.brightWhite,
  },
  pickerContainer: {
    borderColor: "#E0E0E0",

    gap: 6,
  },
  genderContainer: {
    borderColor: "#E0E0E0",
    padding: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  genderButton: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    backgroundColor: colors.brightWhite,
  },
  selected: {
    backgroundColor: "#E0E0E0",
  },
  preferenceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    backgroundColor: colors.brightWhite,
  },
  inputContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 6,
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
