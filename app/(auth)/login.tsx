import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";

const oceanBlue = "#007AFF";
const white = "#fff";
const matchingGreen = "#4CAF50";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    console.log("SIGNED UP THE USER");

    setLoading(false);
  }

  const signUpPressed = () => {
    router.push("/signup");
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.logoText}>Birthday App!</Text>
      </View>

      <TextInput
        style={styles.textInput}
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        placeholderTextColor={oceanBlue}
      />

      <TextInput
        style={styles.textInput}
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        placeholderTextColor={oceanBlue}
      />

      <TouchableOpacity
        disabled={false}
        onPress={signInWithEmail}
        style={styles.signInButton}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={false}
        onPress={signUpPressed}
        style={styles.signUpButton}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    height: 120,
    width: 120,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: oceanBlue,
  },
  textInput: {
    borderColor: oceanBlue,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: oceanBlue,
  },
  signInButton: {
    backgroundColor: oceanBlue,
    borderRadius: 10,
    paddingVertical: 14,
    marginVertical: 8,
  },
  signUpButton: {
    backgroundColor: matchingGreen,
    borderRadius: 10,
    paddingVertical: 14,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
