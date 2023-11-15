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
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../constants/Theme";
import TitleBack from "../TitleBack";
import { UserProfile } from "../../constants/interfaces";
import ToastManager, { Toast } from "toastify-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as friendsService from "../../utilities/friends-service";

import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../providers/UserContext";
import { useMainContext } from "../providers/MainContext";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertDateFormat(dateString) {
  let date = new Date(dateString);
  let year = date.getUTCFullYear();

  // Months in JavaScript are 0-indexed, so January is 0 and December is 11
  // Adding 1 to get the month in the format 01-12
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export default function EditFriendProfile() {
  const [formInput, setFormInput] = useState<UserProfile>({
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
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState(null);
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthday, setBirthday] = useState(new Date().toDateString());
  const { fetchFriend } = useUser();
  const { fetchFriends } = useMainContext();

  const [image, setImage] = useState(null);

  const currentDate = new Date();

  const { id } = useLocalSearchParams();

  const showToasts = () => {
    Toast.success("Profile Updated");
  };

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

  const fetchUser = async () => {
    try {
      const friendData = await friendsService.retrieveFriend(id);
      if (friendData) {
        const uniqueTimestamp = Date.now();
        friendData.photo = `${
          friendData.photo
            ? friendData.photo
            : "https://i.imgur.com/hCwHtRc.png"
        }?timestamp=${uniqueTimestamp}`;
        setFriend(friendData);

        setFormInput(friendData);
        setSelectedGender(capitalizeFirstLetter(friendData.gender));

        if (friendData.giftPreferences.length > 0) {
          let giftPrefs = friendData.giftPreferences.map((p) =>
            capitalizeFirstLetter(p)
          );
          setSelectedPreferences(giftPrefs);
        }
        setImage(friendData.photo);
      }
    } catch (error) {
      console.error("Error fetching friend: ", error);
    }
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
    setLoading(true);
    const data = {
      ...formInput,
      giftPreferences: selectedPreferences.map((p) => p.toLowerCase()),
    };

    try {
      await friendsService.updateFriend(id, data).then(() => {
        fetchFriend();
        fetchFriends();
      });
    } catch (error) {
      console.error("Error updating friend: ", error);
    } finally {
      setLoading(false);
      showToasts();
    }

    // if (friendData) router.replace("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <ToastManager />
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
              <Text>{convertDateFormat(formInput.dob)}</Text>
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
            handleSubmit();
            // router.replace("/");
          }}
        >
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator
                animating={loading}
                size="large"
                color={colors.brightWhite}
              />
            ) : (
              <Text style={styles.buttonText} onPress={handleSubmit}>
                Update
              </Text>
            )}
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
