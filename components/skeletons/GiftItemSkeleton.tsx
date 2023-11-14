import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/Theme";
import { Skeleton } from "moti/skeleton";

type Props = {};

function GiftItemSkeleton({}: Props) {
  return (
    <View style={[styles.itemContainer]}>
      <View>
        <Skeleton
          height={120}
          width={120}
          colorMode={"light"}
          radius={"square"}
        />
      </View>
      <View style={{ flexDirection: "column", gap: 4 }}>
        <Skeleton height={16} width={60} radius={"square"} colorMode="light" />
        <Skeleton height={16} width={40} radius={"square"} colorMode="light" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
    padding: 16,
    flex: 1, // This ensures the items take up equal space
    flexDirection: "column", // stack children vertically
    // alignItems: "center", // align items in the center horizontally
    gap: 4,
  },
  giftImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  giftName: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 4,
    fontFamily: "PilcrowRounded",
  },
  giftPrice: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    textAlign: "left",
  },
});

export default GiftItemSkeleton;
