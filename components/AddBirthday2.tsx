import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddBirthdayScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [hobbies, setHobbies] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("location");

  const DATA = {
    location: ["New York", "Los Angeles", "Chicago"],
    gender: ["Male", "Female", "Other"],
    occupation: ["Developer", "Designer", "Manager"],
    hobbies: ["Reading", "Traveling", "Photography"],
  };

  const openModal = (selectionType) => {
    setCurrentSelection(selectionType);
    setModalVisible(true);
  };

  const selectOption = (option) => {
    switch (currentSelection) {
      case "location":
        setLocation(option);
        break;
      case "gender":
        setGender(option);
        break;
      case "occupation":
        setOccupation(option);
        break;
      case "hobbies":
        setHobbies(option);
        break;
    }
    setModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    Alert.alert(
      "Birthday Added",
      `${firstName} ${lastName}, born on ${formattedDate}`
    );

    // Clear the form
    setFirstName("");
    setLastName("");
    setDate(new Date());
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Birthday</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>Select Birthday: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.picker}
          onPress={() => openModal("location")}
        >
          <Text style={styles.pickerText}>{location || "Select Location"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => openModal("gender")}
        >
          <Text style={styles.pickerText}>{gender || "Select Gender"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => openModal("occupation")}
        >
          <Text style={styles.pickerText}>
            {occupation || "Select Occupation"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => openModal("hobbies")}
        >
          <Text style={styles.pickerText}>{hobbies || "Select Hobbies"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Birthday</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderColor: "red",
          borderWidth: 2,
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select {currentSelection}</Text>
          {DATA[`${currentSelection}`].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => selectOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "purple",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  datePickerButton: {
    marginBottom: 20,
    padding: 10,
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  picker: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: "center",
  },
  pickerText: {
    fontSize: 16,
    color: "gray",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    marginTop: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
  },
  optionText: {
    fontSize: 16,
  },
});
