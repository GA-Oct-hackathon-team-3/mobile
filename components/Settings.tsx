import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const navigation = useNavigation();
  const router = useRouter();

  const dismiss = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header}></View>
      </View>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={coinAmount}
        onChangeText={setCoinAmount}
        placeholder="Coin Amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
    paddingTop: 80,
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
    backgroundColor: "#5c6ac4",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default SettingsScreen;
