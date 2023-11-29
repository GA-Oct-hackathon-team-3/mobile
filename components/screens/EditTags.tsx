import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import * as friendsService from "../../utilities/friends-service";
import * as tagsService from "../../utilities/tags-service";

import TagAdder from "../TagAdder";

export default function EditTags() {
  const params = useLocalSearchParams();

  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);

  const fetchTags = async () => {
    const friendData = await friendsService.retrieveFriend(params.id);
    setTags(friendData.tags);

    const tagData = await tagsService.getTags();
    setDefaultTags(tagData);
  };

  useEffect(() => {
    fetchTags();
  }, []);


  return (
    <TagAdder title={'Edit Tags'} tags={tags} setTags={setTags} defaultTags={defaultTags} friendId={params.id} />
  );
}