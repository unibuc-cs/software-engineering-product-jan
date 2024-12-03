import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useAuthContext } from "../contexts/auth.context";

export default function LogOut() {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      const logoutResponse = await logout();

      if (!(logoutResponse instanceof Error)) {
        navigation.navigate("Login");
      } else {
        setErrorMessage("Logout failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logout}>
      <Image source={require("../../assets/logout.png")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
  },
});
