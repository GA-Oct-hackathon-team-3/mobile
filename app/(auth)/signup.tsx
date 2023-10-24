import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignupScreen = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    skills: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signup button clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => handleInputChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => handleInputChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleInputChange("password", text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#007AFF",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignupScreen;
