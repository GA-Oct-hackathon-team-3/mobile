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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { colors } from "../constants/Theme";
import TitleBack from "./TitleBack";
import DatePicker from 'react-native-datepicker';
import * as friendsService from '../utilities/friends-service';

export default function CreateFriendsProfile() {
  const [formInput, setFormInput] = useState({
    name: "",
    dob: "",
    gender: "",
    location: "",
    giftPreferences: [],
    giftCost: ""
  });
  const { width, height } = useWindowDimensions;
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChange = (fieldName : string, value : string) => {
    setFormInput((prev) => ({
        ...prev,
        [fieldName]: value
    }));
  }

  const handleSubmit = async () => {
    const data = {
        ...formInput,
        giftPreferences: selectedPreferences.map((p) => p.toLowerCase())
    }
    const friendData = await friendsService.createFriend(data);
    // if (uploadedFile) {
    //   try {
    //       const response = await friendsService.uploadPhoto(friendData._id, uploadedFile);
    //       if (response.ok && friendData) navigate("/friends");
    //   } catch (error) {
    //       console.log(error);
    //   }
    // }
    if (friendData) router.replace('/');
  }

  return (
    <View style={styles.container}>
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
                <Text>Add profile photo</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={formInput.name} onChangeText={text => handleChange('name', text)}/>
            <Text>Date of Birth</Text>
            <TextInput placeholder="yyyy-mm-dd" style={styles.input} value={formInput.dob} onChangeText={text => handleChange('dob', text)}/>
            <Text>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Male" ? styles.selected : {},
                ]}
                onPress={() =>{
                    setSelectedGender('Male');
                    handleChange('gender', 'male');
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
                    setSelectedGender('Female');
                    handleChange('gender', 'female')
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
                    setSelectedGender('Other');
                    handleChange('gender', 'other')
                }}
              >
                <Text>Other</Text>
              </TouchableOpacity>
            </View>

            <Text>Location</Text>
            <TextInput placeholder="Location" style={styles.input} value={formInput.location} onChangeText={text => handleChange('location', text)} />

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
                onChangeText={text => handleChange('giftCost', text)}
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
            <Text style={styles.buttonText} onPress={handleSubmit}>Continue to add tags</Text>
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
  buttonText: {
    color: "white",
  },
  container: {
    backgroundColor: colors.cream,

    flex: 1,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
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
