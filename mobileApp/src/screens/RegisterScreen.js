import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";
import { ImageBackground } from "react-native";
import ToggleSwitch from "../components/ToggleSwitch";

export default function RegisterScreen() {
  const { register, login, user } = useAuthContext();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    uid: "",
  });

  const backgroundImage = "../../assets/blue_gradient.png";
  const happyPeople = "../../assets/highFive.png";

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const uid = await register(formData.email, formData.password);
    if (uid) {
      const updatedFormData = { ...formData, uid: uid };
      console.log(updatedFormData);
      try {
        const response = await axios.post(
          "https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/register",
          updatedFormData
        );
        console.log(response.data); // Successfully posted to server
      } catch (error) {
        console.error("Error posting data to server:", error);
        throw Error("Error posting data to server, won't continue to login");
      }

      try {
        const response = await login(formData.email, formData.password);
        console.log(response);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {" "}
      <View style={styles.bigcontainer}>
        <ImageBackground
          source={require(backgroundImage)}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require(happyPeople)} // Local image
              style={styles.image}
            />
            <ToggleSwitch></ToggleSwitch>
          </View>
          <View style={styles.formContainer}>
            {/* <Text style={styles.title}>Begin your journey here!</Text> */}
            <Text style={styles.title}>Begin your journey here!</Text>
            <TextInput
              style={styles.formElement}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={styles.formElement}
              placeholder="Password"
              name="password"
              value={formData.password}
              secureTextEntry={true}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <TextInput
              style={styles.formElement}
              placeholder="Confirm Password"
              name="confirm_password"
              value={formData.confirm_password}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange("confirm_password", text)
              }
            />
            <Pressable
              style={[styles.formElement, styles.button]}
              title="Submit"
              onPress={handleSubmit}
            >
              <Text>Submit</Text>
            </Pressable>

            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  registerText: {
    textAlign: "center",
    color: "#000",
  },

  container: {
    marginTop: "15%",
    display: "flex",
    //justifyContent: "center",
    alignItems: "center",
    flex: 5,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#E49773",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    fontSize: 40,
    padding: 10,
    width: "60%",
  },
  touch: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  image: {
    height: "80%",
    width: "80%",
  },
  formContainer: {
    flex: 5,
    width: "80%",
    height: "20%",
    // backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white background
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  imageContainer: {
    flex: 4,
    alignItems: "center",
    marginTop: "10%",
  },
  bigcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formElement: {
    height: 40,
    width: "100%",
    margin: 9,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
