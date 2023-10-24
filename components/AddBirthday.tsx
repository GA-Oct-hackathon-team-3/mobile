import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  DatePickerIOS,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddBirthdayScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
    setShowDatePicker(Platform.OS === "ios"); // For iOS, keep the date picker open
  };

  const onSubmit = () => {
    console.log("Submitted:", firstName, lastName, birthday);
    // Handle your submission logic here. For example, save to a backend or local storage.
  };

  return (
    <View style={styles.container}>
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
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerContainer}
      >
        <Text style={styles.dateText}>Birthday: {birthday.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Button title="Add Birthday" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  datePickerContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
  },
});
