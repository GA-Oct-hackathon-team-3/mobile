import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { colors } from "../../constants/Theme";
import * as friendsService from "../../utilities/friends-service";
import AddBirthdayButton from "../AddBirthdayButton";
import { useAuth } from "../providers/AuthContext";
import BirthdayItem from "../BirthdayItem";
import OnboardReminders from "../OnboardReminders";
import Onboarding from "../Onboarding";
import MainScreenSkeleton from "../skeletons/MainScreenSkeleton";
import { useMainContext } from "../providers/MainContext";
import Confetti from "../Confetti";
import { friendsFilter } from "../../utilities/helpers";

export default function MainScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    isLoading,
    friends,
    filteredFriends,
    fetchFriends,
    setFilteredFriends,
  } = useMainContext();

  const {
    showReminders,
    setShowReminders,
    dismissReminders,
    onboarded,
    dismissOnboarding,
    logout,
  } = useAuth();

  const [showConfetti, setShowConfetti] = useState(false);

  const showToasts = () => {
    Toast.success("Friend Created");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && friends) {
      setFilteredFriends({
        today: friendsFilter(friends.today, query),
        thisWeek: friendsFilter(friends.thisWeek, query),
        thisMonth: friendsFilter(friends.thisMonth, query),
        upcoming: friendsFilter(friends.laterOn, query),
      });
    } else {
      setFilteredFriends(friends);
    }
  };

  const handleDismissReminder = async () => {
    setShowReminders(false);
    await dismissReminders();
  };

  const addPressed = () => {
    router.push("/add-friend");
  };

  useEffect(() => {
    if (filteredFriends && filteredFriends.length > 0) {
      const hasBirthdayToday = filteredFriends.some(
        (person) => person.daysUntilBirthday === 0
      );

      if (hasBirthdayToday) {
        setTimeout(() => {
          setShowConfetti(true);
        }, 1000);
      } else {
        setShowConfetti(false);
      }
    }
  }, [filteredFriends]);


  const Section = ({ sectionTitle, friends }) => {
    if (friends.length === 0) return null; // skip empty sections

    const transformText = (input : string) => {
        // Split camelCase into separate words
        return input.replace(/([a-z])([A-Z])/g, '$1 $2');
      };

    return (
        <View>
          <Text
            style={{
            fontFamily: "Helvetica Neue",
            fontSize: 24,
            paddingTop: showReminders ? 40 : 20,
            textTransform: 'capitalize',
         }}

          >{transformText(sectionTitle)}</Text>
          <FlatList
            data={friends}
            renderItem={({ item }) => <BirthdayItem {...item} />} // rendering each friend item
            keyExtractor={(item) => item._id}
          />
        </View>
      );
    };

  return (
    <View style={styles.container}>
      {showConfetti ? <Confetti /> : null}
      <ToastManager />
      {isLoading ? (
        <MainScreenSkeleton />
      ) : (
        <>
          <View>
            <TextInput
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search by name, data, month..."
              placeholderTextColor={"gray"}
            />
          </View>

          {showReminders ? (
            <OnboardReminders handleDismissReminder={handleDismissReminder} />
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

          {filteredFriends ? (
            <FlatList
              style={{ zIndex: 99 }}
              data={Object.keys(filteredFriends)}
              renderItem={({ item }) => (
                <Section sectionTitle={item} friends={filteredFriends[item]} />
              )}
              keyExtractor={(item) => item}
            />
          ) : (
            <View style={styles.emptyBirthdayContainer}>
              <Image
                source={require("../../assets/images/sadface.png")}
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

  searchBar: {
    backgroundColor: colors.brightWhite,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
  remindTextContainer: {
    width: 200,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 4,
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

  headerText: {
    fontFamily: "Helvetica Neue",
    fontSize: 24,
  },
});
