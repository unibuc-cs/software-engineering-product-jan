import { useContext, createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";

import env from "../../env.json";

export const FriendsContext = createContext({});

export const useFriendsContext = () => {
  const friendsContext = useContext(FriendsContext);

  if (!friendsContext) {
    throw new Error("useFriendsContext must be used within a FriendsProvider");
  }
  return friendsContext;
};

export const FriendsContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);

  const API_URL_DEV = env.API_URL;


  const getUserFriends = async () => {
    try {
      const response = await axios.get(`${API_URL_DEV}/api/friends/${user.uid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Get friends response:", response.data);
      setFriends(response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching user friends:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const addFriend = async (friendId) => {
    try {
      const response = await axios.post(
        `${API_URL_DEV}/api/friends/${friendId}`,
        { user_id: user.uid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add friend response:", response.data);
      setFriends((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.log(
        "Error adding friend:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteFriend = async (friendId) => {
    try {
      const response = await axios.delete(`${API_URL_DEV}/api/friends/${friendId}`, {
        data: { user_id: user.uid },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Delete friend response:", response.data);
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
      return response.data;
    } catch (error) {
      console.log(
        "Error deleting friend:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const sendTaskToFriend = async (friendId, task) => {
    try {
      const response = await axios.put(
        `${API_URL_DEV}/api/friends/sendTask`,
        { user_id: user.uid, friend_id: friendId, task },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Send task to friend response:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Error sending task to friend:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const state = {
    friends,
    getUserFriends,
    addFriend,
    deleteFriend,
    sendTaskToFriend,
  };

  return (
    <FriendsContext.Provider value={state}>{children}</FriendsContext.Provider>
  );
};
