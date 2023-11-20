import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ToastManager, { Toast } from "toastify-react-native";
import { colors } from "../../constants/Theme";
import {
  getProfile,
  updateUserProfile,
  uploadPhoto,
} from "../../utilities/profile-service";
import TitleBack from "../TitleBack";

import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../providers/AuthContext";

export interface IUserProfileForm {
  interests?: string[];
  bio?: string;
  dob?: Date | string;
  gender?: string;
  tel?: number | string;
  location?: string;
  name?: string;
  timezone?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

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
type Props = {};

function EditCurrentUserProfile({}: Props) {
  const [formInput, setFormInput] = useState<IUserProfileForm>({
    interests: [],
    bio: "",
    dob: "",
    gender: "",
    location: "",
    tel: "",
    name: "",
  });
  const [selectedGender, setSelectedGender] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const { fetchUserProfile } = useAuth();

  const showToasts = () => {
    Toast.success("Profile Updated");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(JSON.stringify(formInput));
    const data = {
      ...formInput,
    };

    try {
      await updateUserProfile(data);
      if (uploadedPhoto) {
        await uploadPhoto(uploadedPhoto);
      }
      await fetchUserProfile();
    } catch (error) {
      console.error("Error updating friend: ", error);
    } finally {
      setLoading(false);
      showToasts();
    }

    // if (friendData) router.replace("/");
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

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);

    setFormInput({ ...formInput, dob: convertDateFormat(date) });
    hideDatePicker();
  };

  const fetchCurrentUser = async () => {
    try {
      const data = await getProfile();
      const uniqueTimestamp = Date.now();
      data.profile.photo = `${
        data.profile.photo
          ? data.profile.photo
          : "https://i.imgur.com/hCwHtRc.png"
      }?timestamp=${uniqueTimestamp}`;

      // if (data.profile.tags.length > 0) setEnableRecs(true);

      setLoading(false);
      console.log("PROFILE USER: ", data);

      setSelectedGender(capitalizeFirstLetter(data.profile.gender));
      setFormInput(data.profile);
      setImage(data.profile.photo);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ToastManager />
      <TitleBack title={"Edit Profile"} />
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

            <Text style={styles.text}>Bio</Text>
            <TextInput
              placeholder="Bio"
              style={styles.input}
              value={formInput.bio}
              onChangeText={(text) => handleChange("bio", text)}
            />

            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              value={formInput.tel?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => handleChange("tel", text)}
            />
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

export default EditCurrentUserProfile;
