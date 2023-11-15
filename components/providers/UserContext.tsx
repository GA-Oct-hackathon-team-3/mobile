import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useSegments,
} from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import * as friendsService from "../../utilities/friends-service";

interface UserContextInterface {
  user: any | null;
  fetchFriend: () => void;
}

const initialState: UserContextInterface = {
  user: null,
  fetchFriend: () => {}, // No-op function for initial state
};

const UserContext = React.createContext<UserContextInterface>(initialState);
type Props = {};

function UserProvider({ children }) {
  console.log("USER PROVIDER LOADED");
  const [user, setUser] = useState(null);
  const { id } = useGlobalSearchParams();

  const fetchFriend = async () => {
    console.log("FETCHING FRIEND ID RIGHT NOW!!!!!", id);
    try {
      const friendData = await friendsService.retrieveFriend(id);
      if (friendData) {
        const uniqueTimestamp = Date.now();
        friendData.photo = `${
          friendData.photo
            ? friendData.photo
            : "https://i.imgur.com/hCwHtRc.png"
        }?timestamp=${uniqueTimestamp}`;
        console.log("USER CONTEXT USER: ", friendData);
        setUser(friendData);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  useEffect(() => {
    console.log("ID CHANGED");
    if (id) {
      fetchFriend();
    } else {
      setUser(null);
    }
  }, [id]);

  return (
    <UserContext.Provider value={{ user, fetchFriend }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export default UserProvider;
