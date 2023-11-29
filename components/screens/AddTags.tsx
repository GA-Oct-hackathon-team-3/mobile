import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import * as tagsService from "../../utilities/tags-service";
import TagAdder from "../TagAdder";

export default function AddTags() {
  const params = useLocalSearchParams();

  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);

  const fetchTags = async () => {
    const tagsData = await tagsService.getTags();
    setDefaultTags(tagsData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <TagAdder title={'Add Tags'} tags={tags} setTags={setTags} defaultTags={defaultTags} friendId={params.id} />
  )
}