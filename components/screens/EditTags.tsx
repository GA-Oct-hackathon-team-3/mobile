import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { colors } from "../../constants/Theme";
import * as friendsService from "../../utilities/friends-service";
import * as tagsService from "../../utilities/tags-service";
import TitleBack from "../TitleBack";
import { useUser } from "../providers/UserContext";
import { capitalizeFirstLetter } from "../../utilities/helpers";
import { FontAwesome } from "@expo/vector-icons";

import TagAdder from "../TagAdder";

export default function EditTags() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [addedTags, setAddedTags] = useState([]);
  const [friend, setFriend] = useState(null);
  const [userTags, setUserTags] = useState([]);

  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);


  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>();
  const { user, fetchFriend } = useUser();
  const { id } = useLocalSearchParams();
  const searchTagLower = searchTag.toLowerCase();
  const includesTag = addedTags.some(
    (tag) => tag.toLowerCase() === searchTagLower
  );

  const fetchTags = async () => {
    const friendData = await friendsService.retrieveFriend(params.id);
    setTags(friendData.tags);

    const tagData = await tagsService.getTags();
    setDefaultTags(tagData);


    setAddedTags(
      friendData.tags.map((tag) => capitalizeFirstLetter(tag.title))
    );
    setUserTags(
      friendData.tags.map((tag) => ({
        id: tag._id,
        tag: capitalizeFirstLetter(tag.title),
      }))
    );
    setFriend(friendData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagPress = (tag) => {
    if (!addedTags.includes(tag)) {
      setAddedTags((prev) => [...prev, tag]);
    } else {
      setAddedTags((prev) => prev.filter((t) => t !== tag));
    }
  };

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
    console.log("---------------------");
    const tagsToRemove = userTags.filter((obj) => !addedTags.includes(obj.tag));
    const sortAdd = userTags.map((obj) => obj.tag);
    console.log(sortAdd, "SORT ADD");
    const tagsToAdd = addedTags.filter((tag) => !sortAdd.includes(tag));
    console.log(tagsToRemove, "TAGS TO REMOVE");
    console.log(tagsToAdd, "TAGS TO ADD");
    console.log(`---------------------`);

    try {
      // Map to functions that return the addTag promise
      const addTagPromises = tagsToAdd.map(
        (tag) => () =>
          tagsService.addTag(friend._id, {
            title: tag,
            category: "Popular",
          })
      );

      // Map to functions that return the removeTag promise
      const removeTagPromises = tagsToRemove.map(
        (tag) => () => tagsService.removeTag(friend._id, tag.id)
      );

      console.log("RIGHT AFTER REMOVE TAG PROM");

      if (tagsToAdd.length === 0 && tagsToRemove.length > 0) {
        console.log("JUST REMOVE TAGS");
        await Promise.all(removeTagPromises.map((remove) => remove()));
      } else if (tagsToAdd.length > 0 && tagsToRemove.length === 0) {
        console.log("JUST ADD TAGS");
        await Promise.all(addTagPromises.map((add) => add()));
      } else if (tagsToAdd.length > 0 && tagsToRemove.length > 0) {
        console.log("ADD AND REMOVE TAGS");
        await Promise.all([
          ...addTagPromises.map((add) => add()),
          ...removeTagPromises.map((remove) => remove()),
        ]);
      }

      fetchFriend();
      showToasts();
    } catch (err) {
      console.log("ERROR", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TagAdder tags={tags} setTags={setTags} defaultTags={defaultTags} />
  );
}