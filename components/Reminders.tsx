import React from "react";
import { View, useWindowDimensions } from "react-native";
import BirthdayNotification from "./BirthdayNotification";
import { ScrollView } from "react-native-gesture-handler";

const dummyReminders = [
  {
    id: 1,
    name: "Cara",
    birthday: "2023-10-24",
    message: "It's Cara's Birthday Today!",
  },
  {
    id: 2,
    name: "John",
    birthday: "2023-06-12",
    message: "John is celebrating his birthday!",
  },
  {
    id: 3,
    name: "Sophia",
    birthday: "2023-05-07",
    message: "Sophia has a birthday coming up!",
  },
  {
    id: 4,
    name: "Lucas",
    birthday: "2023-11-21",
    message: "Don't forget Lucas's birthday!",
  },
  {
    id: 5,
    name: "Emma",
    birthday: "2023-03-16",
    message: "Wish Emma a happy birthday!",
  },
];

const Reminders = () => {
  const { height } = useWindowDimensions();
  return (
    <ScrollView style={{ height: height }}>
      {dummyReminders.map((reminder) => (
        <BirthdayNotification
          name={reminder.name}
          message={reminder.message}
          birthday={reminder.birthday}
        />
      ))}
    </ScrollView>
  );
};

export default Reminders;
