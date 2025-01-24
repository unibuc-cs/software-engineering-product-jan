import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import TaskList from "../components/TaskList";
import { useTasksContext } from "../contexts/tasks.context";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function TasksScreen() {
  const { getAllUserActivities } = useTasksContext();
  const [allTasks, setAllTasks] = useState([]);

  const navigation = useNavigation();
  const routes = useNavigation((state) => state?.routes || []);
  const currentRoute = routes[routes.length - 1]?.name;

  useEffect(() => {
    getAllUserActivities().then((data) => {
      setAllTasks(data);
    });
  }, [currentRoute]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.wrapper}> */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}> All Tasks </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Unscheduled</Text>
        <TaskList scheduled={false} tasks={allTasks}></TaskList>
      </View>
      <View>
        <Text style={styles.subtitle}>Ongoing</Text>

        <TaskList scheduled={true} tasks={allTasks}></TaskList>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7",
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
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 20,
    paddingTop: 27,
  },
});
