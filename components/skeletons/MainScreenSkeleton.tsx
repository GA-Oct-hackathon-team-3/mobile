import React from "react";
import SearchBarSkeleton from "./SearchBarSkeleton";
import ReminderSkeleton from "./ReminderSkeleton";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";
import BirthdaySkeleton from "./BirthdaySkeleton";

type Props = {};

function MainScreenSkeleton({}: Props) {
  return (
    <>
      <SearchBarSkeleton />
      <ReminderSkeleton />
      <View style={{ marginTop: 20 }}>
        <Skeleton
          height={40}
          width={200}
          colorMode={"light"}
          radius={"square"}
        />
      </View>
      <BirthdaySkeleton />
      <BirthdaySkeleton />
      <BirthdaySkeleton />
    </>
  );
}

export default MainScreenSkeleton;
