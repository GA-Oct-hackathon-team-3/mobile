import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { itemColors } from "../constants/Colors";
import { formatDate } from "../utilities/helpers";

import { colors } from "../constants/Theme";

interface Props {
  name: string;
  dob: string;
  _id: string;
  daysUntilBirthday: number;
  index: number;
  favoriteGifts: any[];
  id: string;
}

const BirthdayItem = ({
  name,
  dob,
  _id,
  daysUntilBirthday,
  index,
  favoriteGifts,
  id,
}: Props) => {
  const [collapse, setCollapse] = useState(false);
  const router = useRouter();

  return (
    <>
      <View key={_id} style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            router.push(`/users/${_id}`);
          }}
        >
          <View style={styles.itemTextContainer}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <FontAwesome
                name="birthday-cake"
                size={30}
                color={itemColors[index]}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={[styles.birthday]}>{formatDate(dob)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.content}>
              <Text style={[styles.days, { color: itemColors[index] }]}>
                {daysUntilBirthday}
              </Text>
              <Text style={styles.label}>Days Left</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCollapse(!collapse);
          }}
          style={{
            borderBottomRightRadius: collapse ? 0 : 10,
            borderBottomLeftRadius: collapse ? 0 : 10,
            flexDirection: "row",
            padding: 10,
            backgroundColor: itemColors[index],
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "#FDF7ED",
              fontFamily: "PilcrowRounded", // This should match the name you've set up in your React Native project.
              fontSize: 16,
              fontStyle: "normal",
              // fontWeight: "700", // You might need to adjust the fontFamily instead to specify the weight.
              lineHeight: 19, // Approximation based on "normal" in CSS.
              letterSpacing: 0.48,
            }}
          >
            {collapse ? "Collapse" : "View Saved Gifts"}
          </Text>
          {!collapse ? (
            <FontAwesome name="chevron-down" size={22} color="white" />
          ) : (
            <FontAwesome name="chevron-up" size={22} color="white" />
          )}
        </TouchableOpacity>
        {collapse ? (
          <View
            style={{
              height: "auto",
              width: "auto",
              backgroundColor: colors.brightWhite,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "PilcrowRounded",
                fontSize: 18,
                padding: 12,
              }}
            >
              Saved Gifts
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "auto",
                gap: 8,
                paddingHorizontal: 20,
              }}
            >
              {favoriteGifts && favoriteGifts.length > 0 ? (
                favoriteGifts.map((fav, idx) => (
                  <View key={idx}>
                    <View
                      style={{
                        height: 80,
                        width: 120,
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "lightgray",
                        borderRadius: 8,
                      }}
                    >
                      <Image
                        source={{ uri: fav.image }}
                        style={{ height: 80, width: 120 }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "PilcrowRounded",
                        fontSize: 18,
                        paddingVertical: 12,
                        textAlign: "center",
                      }}
                    >
                      {fav.title}
                    </Text>
                  </View>
                ))
              ) : (
                <View>
                  <Text>No favorite gifts at this time</Text>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => router.push(`/users/${id}`)}
                    >
                      <Image
                        source={require("../assets/images/blackplus.png")}
                        style={{ height: 40, width: 40 }}
                      />
                    </TouchableOpacity>
                    <Text>Add New</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        ) : null}
      </View>
    </>
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

export default BirthdayItem;
