import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import SuggestionsSwiper from "../components/SuggestionsSwiper";
import { useSuggestionsContext } from "../../src/contexts/suggestions.context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function SuggestionsScreen() {
  const { suggestions,getSuggestions } = useSuggestionsContext();
  

  const handleRecommendMore = () => {
    console.log("Recommend More button pressed!");
    getSuggestions();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Swipe It</Text>
      </View>

      <Text style={{ textAlign: "center" }}>
        Swipe right to save, left to discard
      </Text>

      {/* "Recommend More" button with shadow, border, etc. */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={handleRecommendMore}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          

          {/* Actual button surface */}
          <View style={styles.button}>
            <Text style={styles.buttonText}>Recommend More</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Your swiper below the button */}
      <SuggestionsSwiper suggestions={suggestions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF4E7",
    paddingTop: 40,
  },
  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
  },

  // -- BUTTON STYLES --
  buttonWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  buttonContainer: {
    width: 180,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    // This view is placed behind the button to create an offset shadow
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 12,
    top: 3,
    left: 3,
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#000",
    backgroundColor: "#FFF", // Change if you want a different fill color
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
});
