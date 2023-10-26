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

export default function CreateFriendsProfile() {
  const [gender, setGender] = useState("");
  const [giftCost, setGiftCost] = useState("");
  const { width, height } = useWindowDimensions;
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const router = useRouter();

  const [image, setImage] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={{ width: width, alignItems: "center" }}>
        <TouchableOpacity style={styles.photoPlaceholder} onPress={pickImage}>
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
      <Text>Name</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <Text>Birthday</Text>
      <TextInput placeholder="DOB" style={styles.input} />
      <Text>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Male" ? styles.selected : {},
          ]}
          onPress={() => setSelectedGender("Male")}
        >
          <Text>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Female" ? styles.selected : {},
          ]}
          onPress={() => setSelectedGender("Female")}
        >
          <Text>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Other" ? styles.selected : {},
          ]}
          onPress={() => setSelectedGender("Other")}
        >
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      <Text>Location</Text>
      <TextInput placeholder="Location" style={styles.input} />

      <Text>Gift type Preferences (choose all that apply)</Text>
      <View style={styles.checkboxContainer}>
        {/* You can replace these with actual checkboxes or other components */}
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            selectedPreferences.includes("Present") ? styles.selected : {},
          ]}
          onPress={() => togglePreference("Present")}
        >
          <Text>Present</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.preferenceButton,
            selectedPreferences.includes("Experience") ? styles.selected : {},
          ]}
          onPress={() => togglePreference("Experience")}
        >
          <Text>Experience</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.preferenceButton,
            selectedPreferences.includes("Donation") ? styles.selected : {},
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
          value={giftCost}
          onChangeText={setGiftCost}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("/add-tags");
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continue to add tags</Text>
        </View>
      </TouchableOpacity>
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
  },
  buttonText: {
    color: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cream,
    paddingTop: 60,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginVertical: 10,
    backgroundColor: colors.brightWhite,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginVertical: 10,
  },
  genderContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  genderButton: {
    padding: 10,
    margin: 5,
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
    margin: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },
});
