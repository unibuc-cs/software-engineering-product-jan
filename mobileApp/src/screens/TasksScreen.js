import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import TaskList from "../components/TaskList";
// some tasks for me to test the read page until we have connectivity with the backend
const task = {
  id: 1,
  user_id: "user_id",
  title: "Test Task",
  description:
    "static task to work on rendering front tasks + some more random words for testing",
  type: "daily",
  frequency: null,
  days_of_the_week: null,
  due_date: "2024-06-10",
  from_buddy: null,
  created_at: "2024-06-10",
  status: 0,
  stats: {
    fitness: 20,
    skill: 100,
    wellness: 200,
    intelligence: 500,
  },
  emoji: "😭",
};
const habit = {
  id: 2,
  user_id: "user_id",
  title: "Test Habit",
  description:
    "static habit to work on rendering front tasks + some more random words for testing",
  type: "habit",
  frequency: 1,
  days_of_the_week: "0011010",
  due_date: null,
  from_buddy: null,
  created_at: "2024-06-07",
  status: 0,
  stats: {
    fitness: 20,
    skill: 100,
    wellness: 200,
    intelligence: 500,
  },
  emoji: "😭",
};
const recurring = {
  id: 3,
  user_id: "user_id",
  title: "Test Recurring",
  description:
    "static recurring task to work on rendering front tasks + some more random words for testing",
  type: "recurring",
  frequency: 1,
  days_of_the_week: "1011010",
  due_date: "2024-10-17",
  from_buddy: null,
  created_at: "2024-06-07",
  status: 0,
  stats: {
    fitness: 20,
    skill: 100,
    wellness: 200,
    intelligence: 500,
  },
  emoji: "😭",
};

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> All Tasks </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Unscheduled</Text>
          <TaskList
            scheduled={false}
            tasks={[task, habit, recurring]}
          ></TaskList>
        </View>
        <View>
          <Text style={styles.subtitle}>Ongoing</Text>
          <TaskList scheduled={true} tasks={[]}></TaskList>
        </View>
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
