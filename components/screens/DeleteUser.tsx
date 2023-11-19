import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import {
  deleteUser,
  confirmDeleteUser,
  logOut,
} from "../../utilities/users-service";
import TitleBack from "../TitleBack";
import { colors } from "../../constants/Theme";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "expo-router";
import { useMainContext } from "../providers/MainContext";
import { useUser } from "../providers/UserContext";

const DeleteUser = () => {
  const [confirmToken, setConfirmToken] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [feedback, setFeedback] = useState(""); // To handle feedback input
  const router = useRouter();
  const { userData, logout } = useAuth();
  const { resetMainContext } = useMainContext();
  const { resetUserContext } = useUser();
  const handleDelete = async () => {
    console.log(userData.id, "THIS IS THE USER DATA");

    const response = await deleteUser(userData.id);
    console.log("THIS IS THE RESPONSE: ", response);
    if (response.confirmationToken) {
      setConfirmToken(response.confirmationToken);
      setShowConfirmPopup(true);
    }
  };

  const confirmDelete = async () => {
    await confirmDeleteUser(confirmToken);
    setShowConfirmPopup(false);
    await logout();
    resetMainContext();
    resetUserContext();
    // router.replace("/landing");
    // Add logic to handle navigation or response after deletion
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false);
  };

  return (
    <View style={styles.container}>
      <TitleBack title="Delete Account" marginLeft={-40} paddingRight={100} />

      <View style={{ padding: 20 }}>
        <Text style={styles.description}>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Tell us why you're leaving (optional)"
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmPopup}
        onRequestClose={() => {
          setShowConfirmPopup(!showConfirmPopup);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to permanently delete your account? All your
              data will be lost.
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonText}>Yes, Delete My Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelDelete}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PilcrowMedium",
  },
  textInput: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "white",
    fontFamily: "PilcrowMedium",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PilcrowMedium",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
});

export default DeleteUser;
