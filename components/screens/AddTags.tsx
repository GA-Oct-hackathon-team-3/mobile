import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "../../constants/Theme";
import * as friendsService from "../../utilities/friends-service";
import * as tagsService from "../../utilities/tags-service";
import TitleBack from "../TitleBack";
import { FontAwesome } from "@expo/vector-icons";
import TagAdder from "../TagAdder";

export default function AddTags() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const [searchTag, setSearchTag] = useState("");
  const [addedTags, setAddedTags] = useState([]);

  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>();
  const [friend, setFriend] = useState(null);
  const searchTagLower = searchTag.toLowerCase();
  const includesTag = addedTags.some(
    (tag) => tag.toLowerCase() === searchTagLower
  );

  const fetchTags = async () => {
    const friendData = await friendsService.retrieveFriend(params.id);
    setTags(friendData.tags)

    console.log(friendData);

    const tagsData = await tagsService.getTags();
    setDefaultTags(tagsData);
    console.log(tagsData);

    setAddedTags(friendData.tags);
    setFriend(friendData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {}, [addedTags]);

  const handleSearchSubmit = () => {
    if (!addedTags.includes(searchTag) && searchTag !== "") {
      setAddedTags((prev) => [...prev, searchTag]);
      setSearchTag("");
    }
  };

  function scrollViewSizeChanged(height) {
    // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      addedTags.forEach(async (tag) => {
        await tagsService.addTag(friend._id, {
          title: tag,
          category: "Popular",
        });
      });
    } catch (err) {}
    setTimeout(() => {
      setLoading(false);
      navigation.dispatch({ type: "POP_TO_TOP" });
    }, 3000);
  };

  const handleTagPress = (tag) => {
    if (!addedTags.includes(tag)) {
      setAddedTags((prev) => [...prev, tag]);
    } else {
      setAddedTags((prev) => prev.filter((t) => t !== tag));
    }
  };

  return (
    <TagAdder tags={tags} setTags={setTags} defaultTags={defaultTags} />
  )
}