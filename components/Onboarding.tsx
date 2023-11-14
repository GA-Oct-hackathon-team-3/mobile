import {
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/Theme";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

interface Props {
  dismissOnboarding: () => void;
}

const Onboarding = ({ dismissOnboarding }: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [showNext, setShowNext] = useState(false);

  const dismiss = async () => {
    await dismissOnboarding();
  };

  return (
    <TouchableOpacity
      style={[styles.modalBackground, { height: height, borderWidth: 2 }]}
      onPress={() => dismiss()}
    >
      {showNext ? (
        <>
          <View
            style={{
              width: width * 0.8,
              height: 200,
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 20,
                gap: 12,
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text style={styles.welcomeText}>
                {"Add a new friend profile\nto get personalized\ngift ideas."}
              </Text>
              <TouchableOpacity onPress={() => dismiss()}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Skip for now
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={require("../assets/images/hand.png")}
            style={{
              height: 200,
              width: 300,
              // transform: [{ rotate: "5deg" }],
              position: "absolute",
              top: height * 0.65,
              left: -40,
              transform: [{ rotate: "15deg" }],
            }}
          />
          <TouchableOpacity
            onPress={() => {
              dismiss();
              router.push("/add-friend");
              // showToasts();
            }}
            style={styles.floatingButtonContainer}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <FontAwesome name="plus" size={20} color="white" />
              <Text style={styles.addText}>Add Friend</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            height: height * 0.6,
            borderRadius: 20,
            zIndex: 1,
            width: width * 0.8,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              flexDirection: "column",
              justifyContent: "space-around",
              flex: 1,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text style={[{ fontSize: 24, fontFamily: "PilcrowBold" }]}>
              Welcome to your Presently Dashboard!
            </Text>
            <View>
              <Text style={[styles.aboutText, { paddingBottom: 14 }]}>
                Here you can:
              </Text>
              <Text style={[styles.aboutText, { paddingLeft: 10 }]}>
                {
                  "\u2022 see birthdays that are coming up soon. \n\n \u2022 search for a friend to view their profile or saved gifts."
                }
              </Text>
            </View>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => {
                setShowNext(true);
              }}
            >
              <View
                style={{
                  height: 60,
                  width: "auto",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                  }}
                >
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

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

  // floatingButtonContainer: {
  //   position: "absolute",
  //   bottom: 10,
  //   right: 10,
  //   width: 140,
  //   height: 50,
  //   borderRadius: 20,
  //   backgroundColor: "#53CF85",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderColor: "white",
  //   borderWidth: 2,
  //   zIndex: 1,
  // },
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
});

export default Onboarding;
