import { useRouter } from "expo-router";
import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LandingPage = () => {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  return (
    <View style={[styles.container, { height: height }]}>
      <View
        style={{
          position: "absolute",
          top: 20,
          width: width,
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            width: 300,
            textAlign: "center",
            paddingTop: 40,
            fontFamily: "PilcrowMedium",
          }}
        >
          Remember the perfect gift, every time
        </Text>
      </View>
      <View>
        <Image
          source={require("../../assets/images/landingpage.png")}
          style={[{ height: height * 0.54, width: width }]}
        />

        <View style={styles.bottomContainer}>
          <Text style={styles.aboutText}>
            {
              "\u2022 Get reminders to help you keep track of upcoming birthdays. \n\n \u2022 Browse recommendations based on your loved one’s interests and hobbies."
            }
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            style={styles.getStartedButton}
          >
            <View
              style={{
                height: 80,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text}>Get Started</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <View style={[{ flexDirection: "row", gap: 4, paddingTop: 20 }]}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <Text
                style={[styles.bottomText, { textDecorationLine: "underline" }]}
              >
                Log In
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    backgroundColor: "#FDF7ED",
  },
  aboutText: {
    fontSize: 22,
    fontFamily: "PilcrowRounded",
    paddingTop: 20,
    width: 240,
    textAlign: "left",
    color: "#3D3C3C",
  },

  bottomContainer: {
    flexDirection: "column",
    paddingRight: 40,
    paddingLeft: 40,
    justifyContent: "space-between",
    alignItems: "center",

    height: "auto",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontFamily: "PilcrowMedium",
  },
  bottomText: {
    fontSize: 16,
    fontFamily: "PilcrowMedium",
  },
  getStartedButton: {
    backgroundColor: "#53CF85",
    borderRadius: 20,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 20,
  },
});

export default LandingPage;
