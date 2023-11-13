import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/Theme";
import { Skeleton } from "moti/skeleton";
type Props = {};

function ProfileContentSkeleton({}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.giftTypeContainer}>
        {/* Gift Type Top */}
        <View style={styles.giftTop}>
          <Skeleton radius="square" colorMode="light" height={20} width={80} />
          <Skeleton colorMode="light" height={20} width={20} radius="square" />
        </View>
        {/* Gift Type Bottom */}
        <View style={styles.giftSquareContainer}>
          <View style={[styles.giftTypeSquare]}>
            <Skeleton colorMode="light" height={80} width={80} />
          </View>
          <View style={[styles.giftTypeSquare]}>
            <Skeleton colorMode="light" height={80} width={80} />
          </View>
          <View style={[styles.giftTypeSquare]}>
            <Skeleton colorMode="light" height={80} width={80} />
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Skeleton radius="square" colorMode="light" height={20} width={80} />
          <View>
            <Skeleton
              radius="square"
              colorMode="light"
              height={20}
              width={20}
            />
          </View>
        </View>
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Skeleton
              radius="square"
              height={30}
              width={120}
              colorMode="light"
            />
          </View>

          <View style={styles.tag}>
            <Skeleton
              radius="square"
              height={30}
              width={120}
              colorMode="light"
            />
          </View>

          <View style={styles.tag}>
            <Skeleton
              radius="square"
              height={30}
              width={120}
              colorMode="light"
            />
          </View>

          <View style={styles.tag}>
            <Skeleton
              radius="square"
              height={30}
              width={120}
              colorMode="light"
            />
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        {/* <Gifts isExplore={false} favoriteGifts={favoriteGifts} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 28,
  },
  giftTypeContainer: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 150,
    backgroundColor: colors.brightWhite,
  },
  giftTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  giftTypeSquare: {
    height: 80,
    width: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  giftSquareContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    gap: 20,
    marginTop: 10,
  },

  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 100,
    padding: 10,
    alignItems: "center",
    gap: 12,
  },
  tag: {
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  text: {
    fontFamily: "PilcrowMedium",
    fontSize: 16,
  },
  lightText: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    color: colors.brightWhite,
  },
});

export default ProfileContentSkeleton;
