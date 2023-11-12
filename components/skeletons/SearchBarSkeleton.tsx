import { Skeleton } from "moti/skeleton";
import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/Theme";

const SearchBarSkeleton = () => {
  return (
    <View style={styles.searchBar}>
      <Skeleton colorMode="light" height={22} width={22} radius={"square"} />
      <Skeleton width={"92%"} colorMode="light" height={20} radius={"square"} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.brightWhite,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexDirection: "row",

    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
});

export default SearchBarSkeleton;
