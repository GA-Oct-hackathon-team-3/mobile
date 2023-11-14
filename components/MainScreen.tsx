import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { colors } from "../constants/Theme";
import * as friendsService from "../utilities/friends-service";
import AddBirthdayButton from "./AddBirthdayButton";
import { useAuth } from "./AuthContext";
import BirthdayItem from "./BirthdayItem";
import Onboarding from "./Onboarding";
import MainScreenSkeleton from "./skeletons/MainScreenSkeleton";

export default function MainScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [laterBirthdays, setLaterBirthdays] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    showReminders,
    setShowReminders,
    dismissReminders,
    onboarded,
    setOnboarded,
    dismissOnboarding,
  } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await friendsService.retrieveFriends();
        setFilteredData(friends);
        setData(friends);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching friends: ", error);
        setFilteredData(null);
        setIsLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const showToasts = () => {
    Toast.success("Friend Created");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && data.length > 0) {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  };

  const handleDismissReminder = async () => {
    setShowReminders(false);
    await dismissReminders();
  };

  const addPressed = () => {
    router.push("/add-friend");
  };
  return (
    <View style={styles.container}>
      <ToastManager />
      {isLoading ? (
        <MainScreenSkeleton />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search by name, data, month..."
            />
          </View>

          {showReminders ? (
            <View style={styles.remindersContainer}>
              <View style={styles.peopleContainer}>
                <Image
                  source={require("../assets/images/man.png")}
                  style={{ width: 80, height: 180 }}
                />
                <Image
                  source={require("../assets/images/woman.png")}
                  style={{ width: 60, height: 160 }}
                />
              </View>

              <View style={styles.remindTextContainer}>
                <TouchableOpacity
                  onPress={handleDismissReminder}
                  style={styles.dismissCircle}
                >
                  <Image
                    source={require("../assets/images/close.png")}
                    style={styles.close}
                  />
                </TouchableOpacity>
                <Text style={styles.remindersText}>
                  Your reminders will show up here!
                </Text>
              </View>
            </View>
          ) : null}

          <View>
            <Text
              style={[
                styles.headerText,
                { paddingTop: showReminders ? 40 : 20 },
              ]}
            >
              Upcoming
            </Text>
          </View>

          {filteredData && filteredData.length > 0 ? (
            <FlatList
              style={{ zIndex: 99 }}
              data={filteredData}
              renderItem={({ item, index }) => (
                <BirthdayItem {...item} index={index} id={item._id} />
              )}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View style={styles.emptyBirthdayContainer}>
              <Image
                source={require("../assets/images/sadface.png")}
                style={{ height: 100, width: 100 }}
              />
              <Text
                style={{
                  fontFamily: "PilcrowRounded",
                  maxWidth: 200,
                  fontSize: 16,
                }}
              >
                No birthdays to display-add a friend below to start gifting!
              </Text>
            </View>
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={!onboarded}
            onRequestClose={dismissOnboarding}
          >
            <Onboarding dismissOnboarding={dismissOnboarding} />
          </Modal>

          <AddBirthdayButton addPressed={addPressed} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginTop: 8,
    alignItems: "center",
    borderColor: "#E7E7E7",
    backgroundColor: colors.brightWhite,
    borderTopLeftRadius: 10, // Top left corner
    borderTopRightRadius: 10, // Top right corner
    borderBottomRightRadius: 0, // Bottom right corner
    borderBottomLeftRadius: 0,
    justifyContent: "space-between",
    zIndex: 1,
  },
  itemTextContainer: {},
  name: {
    color: "#000",
    fontFamily: "PilcrowRounded",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24, // Setting it to the font size, as 'normal' typically refers to around 100-120% of the font size
    letterSpacing: -0.72,
    maxWidth: 200,
    maxHeight: 30,
  },
  birthday: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.8,
  },
  card: {
    // for Android
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    color: "#000",
    textAlign: "center",
    fontFamily: "PilcrowRounded",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16 * 1.3,
  },
  days: {
    color: "#AF95E7",
    fontFamily: "PilcrowRounded",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 40,
  },
  searchBar: {
    backgroundColor: colors.brightWhite,
    paddingHorizontal: 10,

    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
  background: {
    position: "absolute",
    width: "100%", // Assuming the foreground view takes up 100% width
    height: "120%", // Assuming the foreground view takes up 100% height
    zIndex: 1, // Lower zIndex means it will be behind the foreground view
    backgroundColor: "#AF95E7",
    padding: 20,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    flexDirection: "column",
    justifyContent: "space-between",

    // Just to distinguish between the views
  },
  addText: {
    color: "#FFF",
    fontFamily: "PilcrowRounded", // Make sure the font is set up in your project.
    fontSize: 16,
    fontStyle: "normal",
    // fontWeight: "700", // Adjust the fontFamily to specify weight if needed.
    lineHeight: 19, // Approximation based on "normal" in CSS.
    letterSpacing: 0.48,
  },
  remindersContainer: {
    height: 130,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: colors.brightWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "visible",
    paddingTop: 12,
    marginTop: 12,
  },
  peopleContainer: {
    width: 100,
    overflow: "visible",
    flexDirection: "row",
    height: 200,
    marginTop: -20,
  },
  remindTextContainer: {
    width: 200,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 4,
  },
  searchContainer: {},
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  modalContainer: {
    backgroundColor: colors.brightWhite,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    zIndex: 1,
    marginTop: -80,

    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#53CF85",
    borderRadius: 20,
    height: 50,
    width: 240,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  text: {
    color: "white",
    fontSize: 22,
  },
  welcomeText: {
    color: "#3D3C3C",
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    fontWeight: "bold", // 'bold' typically covers font-weights of 600 or 700 in CSS
    lineHeight: 18 * 1.2, // assuming "normal" is 1.2 times the font size
    letterSpacing: 0.36,
  },
  aboutText: {
    color: "#3D3C3C",
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    fontWeight: "300", // 'bold' typically covers font-weights of 600 or 700 in CSS
    lineHeight: 18 * 1.2, // assuming "normal" is 1.2 times the font size
    letterSpacing: 0.36,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 0,
    width: 120,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#53CF85",
    zIndex: 99,
  },
  skelButtonContainer: {
    position: "absolute",
    bottom: 100,
    right: 0,
    width: 120,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: colors.brightWhite,
  },
  emptyBirthdayContainer: {
    backgroundColor: colors.brightWhite,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    gap: 8,
  },
  dismissCircle: {
    position: "absolute",
    top: -25,
    right: -12,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 20,
  },
  remindersText: {
    fontFamily: "Helvetica Neue",
    fontSize: 24,
    paddingTop: 10,
    fontWeight: "300",
  },
  headerText: {
    fontFamily: "Helvetica Neue",
    fontSize: 24,
  },
  close: {
    height: 18,
    width: 18,
  },
});
