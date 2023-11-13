import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/Theme";
import { Skeleton } from "moti/skeleton";

const BirthdaySkeleton = () => {
  const colorMode = "light";
  return (
    <View style={{ marginTop: 40 }}>
      <View
        style={[styles.background, { backgroundColor: colors.brightWhite }]}
      >
        <View style={{ height: 90 }}></View>
        <View
          style={{
            width: "100%",

            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Skeleton
            width={140}
            height={24}
            colorMode={colorMode}
            radius={"square"}
          />
          <Skeleton
            width={24}
            height={24}
            colorMode={colorMode}
            radius={"square"}
          />
        </View>
      </View>
      <View style={styles.item}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Skeleton
            colorMode={colorMode}
            height={60}
            width={60}
            radius={"square"}
          />
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Skeleton
              colorMode={colorMode}
              width={200}
              radius={"square"}
              height={20}
            />
            <Skeleton
              colorMode={colorMode}
              width={120}
              radius={"square"}
              height={20}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Skeleton
            colorMode={colorMode}
            height={50}
            width={40}
            radius={"square"}
          />
          <Skeleton
            colorMode={colorMode}
            height={20}
            width={50}
            radius={"square"}
          />
        </View>
      </View>
    </View>
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
    marginVertical: 8,
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
  itemTextContainer: {
    flexDirection: "row",
    marginTop: -4,

    justifyContent: "flex-start",
  },
  name: {
    color: "#000",
    fontFamily: "PilcrowRounded",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24, // Setting it to the font size, as 'normal' typically refers to around 100-120% of the font size
    letterSpacing: -0.72,
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
    gap: 4,
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
    bottom: 80,
    right: 0,
    width: 120,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#53CF85",
  },
});

export default BirthdaySkeleton;
