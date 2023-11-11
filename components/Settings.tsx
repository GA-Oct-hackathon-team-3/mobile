import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import React, { useState } from "react";
import { colors } from "../constants/Theme";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TitleBack from "./TitleBack";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "./AuthContext";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const navigation = useNavigation();
  const router = useRouter();
  const { logout } = useAuth();

  const dismiss = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePressPrivacy = async () => {
    let result = await WebBrowser.openBrowserAsync(
      `https://www.victorylabs.io/privacy-policy-presently`
    );
  };

  const handlePressIcons = async () => {
    let result = await WebBrowser.openBrowserAsync(`https://icons8.com/`);
  };

  return (
    <View style={styles.container}>
      <TitleBack title="Settings" marginLeft={-80} paddingRight={100} />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          paddingBottom: 60,
        }}
      >
        <View>
          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
              General
            </Text>
            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          ></View>

          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
              Terms of Service
            </Text>
            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          ></View>

          <View style={styles.filterContainer}>
            <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
              Privacy Policy
            </Text>
            <TouchableOpacity onPress={handlePressPrivacy}>
              <FontAwesome name="chevron-right" size={16} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          ></View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Select imagery powered by{" "}
            <TouchableOpacity onPress={handlePressIcons}>
              <Text style={{ textDecorationLine: "underline" }}>Icons8</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
  },
  closeText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#e9ecef",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
    marginTop: 80,
  },
  logoutText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default SettingsScreen;
