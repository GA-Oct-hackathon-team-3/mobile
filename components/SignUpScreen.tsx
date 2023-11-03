import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Picker from "@react-native-picker/picker";
import { colors } from "../constants/Theme";
import { useRouter } from "expo-router";
import * as usersService from "../utilities/users-service";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Not Specified");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleSubmit = () => {
    // You can send the object data to your backend here
    const data = {
      name,
      password,
      email,
      phoneNumber,
      dob,
      gender,
      location,
    };

    // Make your API request here
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const data = {
      name: name,
      tel: phoneNumber,
      email: email,
      password: password,
      confirmPassword: password,
      dob: dob,
      gender: "female",
      location: location,
    };
    try {
      const userData = await usersService.register(data);
      router.replace("/");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: width,
          height: 100,
          alignItems: "center",
          justifyContent: "space-between",
          top: 40,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/landing")
          }
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/arrow-left.png")}
              style={{ height: 24, width: 24, left: 20 }}
            />
          </View>
        </TouchableOpacity>
        <Image
          source={require("../assets/images/Prently1.png")}
          style={{ width: 240, height: 80, resizeMode: "contain" }}
        />
        <View></View>
      </View>
      <View style={{ alignSelf: "center", paddingTop: 120 }}>
        <Text style={[styles.text, { fontSize: 24 }]}>Sign Up</Text>
      </View>

      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-type to Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.text}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <Text style={styles.text}>Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="DOB"
          onChangeText={setDob}
          value={dob}
        />
        {/* <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Not Specified" value="Not Specified" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker> */}
        <Text style={styles.text}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          onChangeText={setLocation}
          value={location}
        />
      </View>
      <TouchableOpacity
        disabled={false}
        onPress={submitHandler}
        style={styles.submitButton}
      >
        <View
          style={{
            width: 240,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "PilcrowMedium",

              textAlign: "center",
            }}
          >
            Create account
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cream,
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 20,
    alignSelf: "center",
  },
  text: {
    color: "#3D3C3C",
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    fontWeight: "bold", // 'bold' typically covers font-weights of 600 or 700 in CSS
    lineHeight: 18 * 1.2, // assuming "normal" is 1.2 times the font size
    letterSpacing: 0.36,
  },
});
