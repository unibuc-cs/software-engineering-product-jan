import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import TaskList from "../components/TaskList"; // Make sure the path is correct
import { useTasksContext } from "../contexts/tasks.context"; // Assuming you have a context for this

export default function TasksScreen() {
  const { getAllUserActivities } = useTasksContext();
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Set loading state
      const data = await getAllUserActivities(); // Assuming this returns tasks
      setAllTasks(data);
      setLoading(false); // Stop loading when tasks are fetched
    };

    fetchTasks();
  }, []); // Empty array to only run once when the component mounts

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> All Tasks </Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading tasks...</Text>
          ) : (
            <View>
              <Text style={styles.subtitle}>Unscheduled</Text>
              <TaskList tasks={allTasks} scheduled={false} /> // Pass the tasks
              once they are fetched
              <Text style={styles.subtitle}>Ongoing</Text>
              <TaskList tasks={allTasks} scheduled={true} />
            </View>
          )}
        </View>
        {/* <View>
        <Text style={styles.subtitle}>Unscheduled</Text>
        <TaskList scheduled={false} tasks={allTasks}></TaskList>
      </View>
      <View>
        <Text style={styles.subtitle}>Ongoing</Text>

        <TaskList scheduled={true} tasks={allTasks}></TaskList> */}
        {/* </View> */}
      </ScrollView>
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
