import React, { useEffect, useState } from "react";
import * as friendsService from "../../utilities/friends-service";
import { useAuth } from "./AuthContext";

type Props = {};

interface MainContextInterface {
  friends: { today: any[], thisWeek: any[], thisMonth: any[], upcoming: any[] },
  filteredFriends: { today: any[], thisWeek: any[], thisMonth: any[], upcoming: any[] },
  isLoading: boolean;
  fetchFriends: () => void;
  setFilteredFriends: (friends: { today: any[], thisWeek: any[], thisMonth: any[], upcoming: any[] }) => void;
}

const initialState = {
    friends: { today: [], thisWeek: [], thisMonth: [], upcoming: [] },
  filteredFriends: { today: [], thisWeek: [], thisMonth: [], upcoming: [] },
  isLoading: true,
  fetchFriends: () => {},
  setFilteredFriends: () => {},
};

const MainContext = React.createContext<MainContextInterface>(initialState);

const MainProvider = ({ children }) => {
  const [friends, setFriends] = useState({});
  const [filteredFriends, setFilteredFriends] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const resetMainContext = () => {
    setFriends({ today: [], thisWeek: [], thisMonth: [], upcoming: [] });
    setFilteredFriends({ today: [], thisWeek: [], thisMonth: [], upcoming: [] });
    setIsLoading(true);
  };

  const fetchFriends = async () => {
    try {
      const friends = await friendsService.retrieveFriends();
      setFilteredFriends(friends);
      setFriends(friends);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching friends: ", error);
      setFilteredFriends({today: [], thisWeek: [], thisMonth: [], upcoming: []});
      setFriends({today: [], thisWeek: [], thisMonth: [], upcoming: []});
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
        resetMainContext,
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
