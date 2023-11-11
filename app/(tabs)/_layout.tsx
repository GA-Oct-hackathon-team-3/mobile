import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Image, View } from "react-native";

import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/Theme";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="plus-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />

      {/* <Tabs.Screen
        name="reminders"
        options={{
          headerShown: true,
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
      /> */}

      {/* <Tabs.Screen
        name="calendar"
        options={{
          headerShown: true,
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require("../../assets/images/Calendar.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="gifts"
        options={{
          headerShown: true,
          title: "Gifts",
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require("../../assets/images/Gifts.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          ),
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
