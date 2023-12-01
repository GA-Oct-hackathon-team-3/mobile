import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import UserProvider from "../../components/providers/UserContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: {
          fontFamily: "PilcrowRounded",
          fontSize: 12,
          letterSpacing: 0.2,
        },
        tabBarIconStyle: { marginTop: 6 },
        tabBarBackground: () => (
          <View
            style={{
              width: "auto",
              height: "100%",
              backgroundColor: "rgba(253, 247, 237, 1)",
              borderTopColor: "lightgray",
              borderTopWidth: 1,
            }}
          ></View>
        ),
        headerBackground: () => (
          <View
            style={{
              width: "auto",
              height: "100%",
              backgroundColor: "rgba(253, 247, 237, 1)",
            }}
          ></View>
        ),
        headerTitle: () => (
          <View>
            <Image
              source={require("../../assets/images/Prently1.png")}
              style={{ width: 140, height: 60, resizeMode: "contain" }}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require("../../assets/images/Home.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          ),
          headerTitle: () => (
            <View>
              <Image
                source={require("../../assets/images/Prently1.png")}
                style={{ width: 140, height: 60, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          headerShown: false,
          title: "Reminders",
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require("../../assets/images/Reminders.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />

      {/* <Tabs.Screen
        name="reminders/edit-reminders"
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      /> */}

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require("../../assets/images/ProfileIcon.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
