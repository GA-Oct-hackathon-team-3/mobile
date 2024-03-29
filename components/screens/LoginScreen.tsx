import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../providers/AuthContext";
import { colors } from "../../constants/Theme";
import * as UserController from "../../utilities/users-service";

const oceanBlue = "#007AFF";
const white = "#fff";
const matchingGreen = "#4CAF50";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const { setToken, setRefreshToken, setUserData } = useAuth();

  async function signInWithEmail() {
    setLoading(true);

    try {
      const response = await UserController.login({
        email: email,
        password: password,
      });
      console.log("RESPONSE LOGIN: ", response);
      if (response) {
        setToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setUserData(response);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Invalid Credentials or User not found");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { width: width }]}
    >
      <View
        style={{
          position: "absolute",
          width: width,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          top: 40,
        }}
      >
        <Image
          source={require("../../assets/images/Prently1.png")}
          style={{
            width: 240,
            height: 80,
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 100,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/landing")
          }
        >
          <Image
            source={require("../../assets/images/arrow-left.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>Log In</Text>
        <View></View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/present.png")}
        />
      </View>
      <View style={{ gap: 12 }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter email..."
          autoCapitalize="none"
          placeholderTextColor={"lightgray"}
        />
      </View>

      <View style={{ gap: 12 }}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter Password..."
          autoCapitalize="none"
          placeholderTextColor={"lightgray"}
        />
      </View>

      <Text
        style={{
          textDecorationLine: "underline",
          fontWeight: "bold",
          fontFamily: "PilcrowRounded",
        }}
      >
        Forgot Password?
      </Text>

      <TouchableOpacity
        disabled={false}
        onPress={signInWithEmail}
        style={styles.signInButton}
      >
        <View
          style={{
            height: 100,
            width: 240,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "PilcrowMedium",
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    height: 240,
    width: 240,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: oceanBlue,
  },
  textInput: {
    borderColor: "lightgray",
    backgroundColor: colors.brightWhite,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "black",
  },
  signInButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 20,
    alignSelf: "center",
    marginTop: 120,
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
  loginText: {
    color: "#3D3C3C",
    fontFamily: "PilcrowBold",
    fontSize: 24,
    lineHeight: 24 * 1.2,
  },
  text: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
});
