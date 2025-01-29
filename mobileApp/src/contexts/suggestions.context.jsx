import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";
export const SuggestionsContext = createContext({});
import {API_URL_DEV, API_URL_PROD} from "@env";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useTasksContext } from "./tasks.context";

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
  const { createNewActivity } = useTasksContext();
  const [createdAt, setCreatedAt] = useState(new Date());
  

  const getSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL_DEV}/api/recommender/${user.uid}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const addPickedSuggestions = async (pickedSuggestions) => {

      
      pickedSuggestions.forEach(async (pickedSuggestion) => {
        const newTask = {
          from_app: false,
          from_buddy: null,
          type: "daily",
          created_at: createdAt,
          done: 0,
          description: pickedSuggestion.description,
          title: pickedSuggestion.title,
          user_id: user.uid,
          category: "",
          fitness: 0,
          skill: 0,
          wellness: 0,
          inteligence: 0,
          emoji: "AI generated",
        };
        createNewActivity(newTask);
      
    });
  };
  

  useEffect(() => {
    console.log("Fetching suggestions...");
    getSuggestions();
  }, []);

  return (
    <SuggestionsContext.Provider value={{ suggestions,getSuggestions,addPickedSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
