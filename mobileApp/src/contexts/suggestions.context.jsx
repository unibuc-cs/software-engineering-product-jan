import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";
export const SuggestionsContext = createContext({});
import {API_URL_DEV, API_URL_PROD} from "@env";

export const useSuggestionsContext = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestionsContext must be used within a SuggestionsProvider");
  }
  return context;
};

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useAuthContext();

  const getSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL_DEV}/api/recommender/${user.uid}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }


  useEffect(() => {
    console.log("Fetching suggestions...");
    getSuggestions();
  }, []);

  return (
    <SuggestionsContext.Provider value={{ suggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
