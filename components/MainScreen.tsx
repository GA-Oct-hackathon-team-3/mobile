import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export const DATA = [
  { id: "1", first_name: "John Can", last_name: "Doe", birthday: "1990-05-15" },
  { id: "2", first_name: "Jane", last_name: "Smith", birthday: "1987-03-28" },
  {
    id: "3",
    first_name: "Alice",
    last_name: "Johnson",
    birthday: "1992-10-12",
  },
  { id: "4", first_name: "Bob", last_name: "Brown", birthday: "1985-06-22" },
  {
    id: "5",
    first_name: "Charlie",
    last_name: "Davis",
    birthday: "1995-02-02",
  },
];

function daysUntilBirthday(bday) {
  console.log(bday, "this is the bday");
  const array = bday.split("-");
  const birthday = new Date(array[0], array[1], array[2]);
  const currentDate = new Date(); // e.g., today's date
  // Extract month and day from the birthday date
  const month = birthday.getMonth();
  const day = birthday.getDate();

  // Set the current year's birthday
  let nextBirthday = new Date(currentDate.getFullYear(), month, day);

  // If the birthday has already occurred this year, set the next year's date
  if (currentDate > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = nextBirthday - currentDate;

  // Convert milliseconds to days
  const days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return days;
}

// Usage example:
const userBirthday = new Date(1990, 4, 15); // e.g., May 15th

export default function MainScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [laterBirthdays, setLaterBirthdays] = useState([]);
  const [birthdays, setBirthdays] = useState([]);

  const createSortedBirthdays = () => {};

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      console.log(query, "THIS IS THE QUERY");
      setFilteredData(
        DATA.filter((item) =>
          item.first_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredData(DATA);
    }
  };

  const Item = ({ first_name, last_name, birthday, id }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`/users/${id}`);
      }}
    >
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome name="birthday-cake" size={30} color="purple" />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name}>
                {first_name} {last_name}
              </Text>
              <Text style={styles.birthday}>{birthday}</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Days Left</Text>
            <Text style={styles.days}>{daysUntilBirthday(birthday)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search..."
      />
      <View>
        <Text
          style={{ fontFamily: "Helvetica Neue", fontSize: 24, paddingTop: 10 }}
        >
          Upcoming
        </Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
  },
  itemTextContainer: {},
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  birthday: {
    fontSize: 14,
    color: "gray",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // for Android
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  days: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    backgroundColor: "white",
    paddingHorizontal: 10,

    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
});
