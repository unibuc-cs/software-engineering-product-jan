import React, { useCallback, useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ToggleSwitch() {
  const navigation = useNavigation();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isLoginPage = route.name === "Login";

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isLoginPage ? 0 : 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [isLoginPage, slideAnim]);

  const handleToggle = useCallback(
    (routeName: string) => {
      navigation.navigate(routeName);
    },
    [navigation]
  );

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
          onPress={() => handleToggle("Login")}
        >
          <Text style={[styles.buttonText, isLoginPage && styles.selectedText]}>
            Existing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleToggle("Register")}
        >
          <Text
            style={[styles.buttonText, !isLoginPage && styles.selectedText]}
          >
            New
          </Text>
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
    marginBottom: 0,
    padding: 0,
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
    width: "51%",
    height: 42,
    backgroundColor: "white",
    borderRadius: 21,
    top: 4,
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
    color: "#E49773",
  },
  selectedText: {
    color: "#E49773",
  },
});
