import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FigmaEmbed from "../components/WavyBackground";
import TaskPage from "../svg-components/TaskPage";

export default function TaskCreationScreen1() {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.backgr}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>New Task</Text>
          </View>
          <View style={styles.welcomeMessage}>
            <View>
              <Text style={styles.welcomeText}>
                Ready to conquer your tasks? Let's get started!🚀
              </Text>
            </View>
            <View style={styles.svgContainer}>
              <TaskPage />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => handleNavigation("NewTaskCreation")}
            >
              <View style={styles.shadow} />
              <View style={styles.cardContainer}>
                <Text style={styles.buttonText}>One time task</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => handleNavigation("NewHabitCreation")}
            >
              <View style={styles.shadow} />
              <View style={styles.cardContainer}>
                <Text style={styles.buttonText}>Habit</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => handleNavigation("NewRecurrentTask")}
            >
              <View style={styles.shadow} />
              <View style={styles.cardContainer}>
                <Text style={styles.buttonText}>Recurrent task</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgr: {
    backgroundColor: "#e49773",
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 250,
  },
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleContainer: {
    marginVertical: 10,
    paddingBottom: 15,
    borderColor: "rgba(0,0, 0, 0.5)",
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  welcomeMessage: {
    // marginVertical: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    color: "black",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 8,
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  // buttonContainer: {
  //   marginTop: 10,
  // },
  buttonWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
  cardContainer: {
    height: 45,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    zIndex: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  shadow: {
    position: "absolute",
    top: 5,
    width: "80%",
    height: 45,
    backgroundColor: "#000",
    borderRadius: 20,
    zIndex: 1,
  },
});
