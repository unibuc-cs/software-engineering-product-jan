import { useEffect, useState, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";

export const AuthContext = createContext({});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user.uid;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const isLoggedIn = async () => {
    const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
    return loggedInStatus === "true";
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);

      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("isLoggedIn", "true");

      return `User ${user.email} logged in successfully`;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isLoggedIn");
      setUser(null);

      return "User logged out successfully";
    } catch (error) {
      console.log("Logout failed: ", error);
      return error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
 
        AsyncStorage.setItem("isLoggedIn", "true");
      } else {
        setUser(null);
        AsyncStorage.setItem("isLoggedIn", "false");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    setUser,
    register,
    login,
    logout,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
