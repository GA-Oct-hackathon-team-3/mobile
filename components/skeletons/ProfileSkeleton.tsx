import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/Theme";
import { Skeleton } from "moti/skeleton";
import ProfileContentSkeleton from "./ProfileContentSkeleton";

type Props = {};

function ProfileSkeleton({}: Props) {
  const colorMode = "light";

  return (
    <>
      <View style={styles.backgroundCover}></View>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Skeleton radius="round" colorMode="light" width={60} height={60} />
        </View>
        <Skeleton radius="square" colorMode="light" height={28} width={160} />
        <Skeleton radius="square" colorMode="light" height={20} width={100} />
      </View>
      <View style={styles.info}>
        <View style={styles.infoDescription}>
          <Skeleton radius="square" colorMode="light" height={20} width={20} />

          <Skeleton radius="square" colorMode="light" height={20} width={30} />
        </View>
        <Skeleton height={30} width={1} colorMode="light" />
        <View style={styles.infoDescription}>
          <Skeleton radius="square" colorMode="light" height={20} width={20} />

          <Skeleton radius="square" colorMode="light" height={20} width={30} />
        </View>
        <Skeleton height={30} width={1} colorMode="light" />

        <View style={styles.infoDescription}>
          <Skeleton radius="square" colorMode="light" height={20} width={20} />

          <Skeleton radius="square" colorMode="light" height={20} width={30} />
        </View>
        {/* <Skeleton colorMode="light" height={20} width={20} radius={"square"} /> */}
      </View>
      <View style={styles.actionButtons}>
        <View style={styles.button}>
          <Skeleton height={20} width={100} radius="square" colorMode="light" />
        </View>
        <View style={styles.button}>
          <Skeleton height={20} width={100} radius="square" colorMode="light" />
        </View>
      </View>

      <View>
        <View>
          <ProfileContentSkeleton />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.cream,
    paddingTop: 120,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginVertical: 10,
    paddingTop: 10,
  },
  giftType: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  infoDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  selected: {
    color: "black",
    textDecorationLine: "underline",
    fontFamily: "PilcrowMedium",
    fontSize: 20,
  },

  unselected: {
    color: "gray",
    fontFamily: "PilcrowRounded",
    fontSize: 18,
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 140,
    right: 0,
    top: 0,
    backgroundColor: colors.orange,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    fontFamily: "PilcrowMedium",
    fontSize: 24,
  },
  subText: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
  numberText: {
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    color: colors.orange,
  },
});

export default ProfileSkeleton;
