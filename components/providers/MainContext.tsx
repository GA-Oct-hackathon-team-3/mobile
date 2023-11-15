import React, { useEffect, useState } from "react";
import * as friendsService from "../../utilities/friends-service";
import { useAuth } from "./AuthContext";

type Props = {};

interface MainContextInterface {
  friends: any[];
  filteredFriends: any[];
  isLoading: boolean;
  fetchFriends: () => void;
  setFilteredFriends: (friends: any[]) => void;
}

const initialState = {
  friends: [],
  filteredFriends: [],
  isLoading: true,
  fetchFriends: () => {},
  setFilteredFriends: () => {},
};

const MainContext = React.createContext<MainContextInterface>(initialState);

const MainProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const fetchFriends = async () => {
    try {
      const friends = await friendsService.retrieveFriends();
      setFilteredFriends(friends);
      setFriends(friends);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching friends: ", error);
      setFilteredFriends([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFriends();
    }
  }, [token]);

  return (
    <MainContext.Provider
      value={{
        friends,
        fetchFriends,
        filteredFriends,
        isLoading,
        setFilteredFriends,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = React.useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

export default MainProvider;
