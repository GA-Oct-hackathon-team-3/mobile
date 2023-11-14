import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { colors } from "../../constants/Theme";
import TitleBack from "../TitleBack";

import * as friendsService from "../../utilities/friends-service";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function convertDateFormat(dateString) {
  let date = new Date(dateString);
  let year = date.getUTCFullYear();

  // Months in JavaScript are 0-indexed, so January is 0 and December is 11
  // Adding 1 to get the month in the format 01-12
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export default function CreateFriendsProfile() {
  const [formInput, setFormInput] = useState({
    name: "",
    dob: "",
    gender: "",
    location: "",
    giftPreferences: [],
    giftCost: "",
  });
  const { width, height } = useWindowDimensions();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthday, setBirthday] = useState(new Date().toDateString());
  const [loading, setLoading] = useState(false);
  const fullHeight = Dimensions.get("window").height;
  const [image, setImage] = useState(null);

  const currentDate = new Date();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setBirthday(date.toDateString());
    setFormInput({ ...formInput, dob: convertDateFormat(date) });
    hideDatePicker();
  };

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
      console.log(JSON.stringify(result), "IMAGE RESULT");
      let { uri } = result;

      let file = {
        name: uri.split("/").pop(),
        uri,
        type: "image/jpeg",
      };
      setImage(result.assets[0].uri);
      setUploadedPhoto(file);
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
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
        console.log(response, "PHOTO UPLOAD RESPONSE");
        setLoading(false);

        router.push(`/users/${friendData._id}/add-tags`);
        return;
      } catch (error) {}
    }
    setLoading(false);
    if (friendData._id) router.push(`/users/${friendData._id}/add-tags`);
    return;
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: -40,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99,
            alignSelf: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      )}
      <TitleBack title={"Create Friend Profile"} />
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
            <Text>Name</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={formInput.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <Text>Date of Birth</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: colors.brightWhite,
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text>{birthday}</Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={{
                  backgroundColor: colors.orange,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PilcrowMedium",
                    color: colors.brightWhite,
                  }}
                >
                  Set Birthday
                </Text>
              </TouchableOpacity>
            </View>

            {/* <TextInput
              placeholder="yyyy-mm-dd"
              style={styles.input}
              value={formInput.dob}
              onChangeText={(text) => handleChange("dob", text)}
            /> */}
            <Text>Gender</Text>
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
                <Text>Male</Text>
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
                <Text>Female</Text>
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

            <Text>Location</Text>
            <TextInput
              placeholder="Location"
              style={styles.input}
              value={formInput.location}
              onChangeText={(text) => handleChange("location", text)}
            />

            <Text>Gift type Preferences (choose all that apply)</Text>
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
                <Text>Present</Text>
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
                <Text>Experience</Text>
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
                <Text>Donation</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text>Gift Cost</Text>
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
              Continue to add tags
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  buttonText: {
    color: "white",
    fontFamily: "PilcrowMedium",
    fontSize: 20,
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
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
  },
  genderContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    padding: 10,
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
