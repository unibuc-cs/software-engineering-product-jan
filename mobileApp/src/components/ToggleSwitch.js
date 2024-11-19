import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ToggleSwitch() {
  const [selected, setSelected] = useState("existing");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selected === "existing" ? 0 : 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [selected, slideAnim]);

  const handleToggle = (value) => {
    setSelected(value);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width * 0.4 - 2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX }],
            },
          ]}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleToggle("existing")}
        >
          <Text
            style={[
              styles.buttonText,
              selected === "existing" && styles.selectedText,
            ]}
          >
            Existing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleToggle("new")}
        >
          <Pressable
            style={styles.registerButton}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                selected === "new" && styles.selectedText,
              ]}
            >
              New
            </Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0%",
    padding: "0%",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    width: width * 0.8,
    height: 50,
    padding: 4,
  },
  slider: {
    position: "absolute",
    width: "48%",
    height: "42",
    backgroundColor: "white",
    borderRadius: 21,
    marginTop: "1.3%",
  },
  toggleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
  },
  selectedText: {
    color: "#FF6B6B", // Adjust this to match your text color when selected
  },
});
