import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const SuggestionsContext = createContext({});

export const useSuggestionsContext = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestionsContext must be used within a SuggestionsProvider");
  }
  return context;
};

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const interests = ["Fitness", "Gaming", "Yoga"];
      const defaultSuggestions = interests.map((interest) => ({
        interest: interest.toLowerCase(),
        suggestion: {
          title: `Demo task with '${interest}'`,
          description: `This is a demo task related to ${interest}.`,
        },
      }));

      console.log("Default suggestions:", defaultSuggestions);

      try {
        console.log("Attempting to fetch suggestions...");

        // Use a relative URL and set up proxy in package.json for development
        const response = await axios.get("http://192.168.1.134:4000/api/user/recommend");

        console.log("Suggestions fetched:", response.data);
        setSuggestions(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error response from server:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Axios error:", error.message);
        }
        console.log("Using default suggestions.");
        setSuggestions(defaultSuggestions);
      }
    };

    console.log("Fetching suggestions...");
    getSuggestions();
  }, []);

  return (
    <SuggestionsContext.Provider value={{ suggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
