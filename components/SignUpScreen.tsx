import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "../constants/Theme";
import * as usersService from "../utilities/users-service";
import { useAuth } from "./AuthContext";

function convertDateFormat(dateString) {
  let date = new Date(dateString);
  let year = date.getUTCFullYear();

  // Months in JavaScript are 0-indexed, so January is 0 and December is 11
  // Adding 1 to get the month in the format 01-12
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthday, setBirthday] = useState(new Date().toDateString());
  const [loading, setLoading] = useState(false);
  const { height, width } = useWindowDimensions();
  const [passwordValidity, setPasswordValidity] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState("");
  const { setToken, setUserData } = useAuth();

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setBirthday(date.toDateString());
    setDob(convertDateFormat(date));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    validateMatch();
  }, [confirmPassword]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);
  const submitHandler = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const valid = validateForm();
    if (!valid) return handleFormMessage("Required fields are marked with (*)");
    if (!passwordValidity)
      return handleFormMessage("Please enter a valid password");
    if (!passwordMatch) return handleFormMessage("Passwords must match");
    console.log(passwordMatch, "PASSWORD MATCH");
    const data = {
      name: name,
      tel: phoneNumber,
      email: email,
      password: password,
      confirmPassword: password,
      dob: dob,
      gender: gender,
      location: location,
    };
    if (valid) setRequiredMessage("");
    try {
      const userData = await usersService.register(data);
      if (userData) {
        setToken(userData.token);
        setUserData(userData);
      }

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Error", // Title of the alert
        "Unable to create a user", // Message of the alert
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }, // Button to dismiss the alert
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  function validateForm() {
    if (!name || !password || !confirmPassword || !email || !dob || !gender)
      return false;
    else return true;
  }

  function validatePassword(password) {
    // Initialize the validity to true
    let passwordValidity = true;
    let requiredMessage = "";

    // Check if the password is at least 8 characters in length
    if (password.length < 8) {
      requiredMessage = "Password must be at least 8 characters long.";
      passwordValidity = false;
    }

    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialChar = false;

    // If the password is long enough, check for other requirements
    if (passwordValidity) {
      // Iterate through each character in the password
      for (let i = 0; i < password.length; i++) {
        const char = password[i];

        // Check if the character is uppercase
        if (char >= "A" && char <= "Z") {
          hasUppercase = true;
        }

        // Check if the character is lowercase
        if (char >= "a" && char <= "z") {
          hasLowercase = true;
        }

        // Check if the character is a number
        if (char >= "0" && char <= "9") {
          hasNumber = true;
        }

        // Check if the character is a special character
        const specialCharacters = "!@#$%^&*()_+{}[]:;<>,.?~-";
        if (specialCharacters.includes(char)) {
          hasSpecialChar = true;
        }
      }

      // Check which requirement was not met and set the corresponding message
      if (!hasUppercase) {
        requiredMessage =
          "Password must contain at least one uppercase letter.";
        passwordValidity = false;
      } else if (!hasLowercase) {
        requiredMessage =
          "Password must contain at least one lowercase letter.";
        passwordValidity = false;
      } else if (!hasNumber) {
        requiredMessage = "Password must contain at least one number.";
        passwordValidity = false;
      } else if (!hasSpecialChar) {
        requiredMessage =
          "Password must contain at least one special character.";
        passwordValidity = false;
      }
    }

    // Set the required message and validity
    setRequiredMessage(requiredMessage);
    setPasswordValidity(passwordValidity);

    // Return the validity of the password
    return passwordValidity;
  }

  function validateMatch() {
    const match = confirmPassword === password;
    setPasswordMatch(match);
    if (!match) {
      setRequiredMessage("Passwords must match");
    } else {
      setRequiredMessage("");
    }
    return match;
  }

  function handleFormMessage(string) {
    setLoading(false);
    // handles scrolling to top to display various reasons for why form is not valid for submit

    setRequiredMessage(string);
    return;
  }

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  const handleChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View
          style={{
            position: "absolute",
            height: height,
            width: width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      )}
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
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 120,
        }}
      >
        <Text style={[styles.text, { fontSize: 24 }]}>Sign Up</Text>
        <Text style={[styles.text, { fontSize: 12 }]}>{requiredMessage}</Text>
      </View>

      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text style={styles.text}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <Text style={styles.text}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          onChangeText={(value) => handleChangePassword(value)}
          value={password}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-type to Confirm Password"
          onChangeText={(value) => handleChangeConfirmPassword(value)}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Email *</Text>
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
        <Text style={styles.text}>Birthday *</Text>
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
    </KeyboardAwareScrollView>
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
