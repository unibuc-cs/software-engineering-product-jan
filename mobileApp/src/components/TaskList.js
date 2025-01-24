import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Task from "./Task";
// import { useTasksContext } from "../contexts/tasks.context";

export default function TaskList({ tasks, scheduled, date }) {
  const [userTasks, setUserTasks] = useState([]);

  // Check if two Date objects are the same (ignoring the time part)
  const checkEqualDates = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Check if a recurring task should occur on a given date
  const checkMatchingDates = (task, date) => {
    let dateDayOfWeek = date.getDay(); // 0 for Sunday, 6 for Saturday
    if (dateDayOfWeek === 0) {
      dateDayOfWeek = 6;
    } else {
      dateDayOfWeek -= 1;
    }

    // Return false if days_per_week or week_interval is null
    if (task.days_per_week === null || task.week_interval === null) {
      return false;
    }

    // Check if it's the correct day of the week
    if (task.days_per_week[dateDayOfWeek] === "0") {
      return false;
    }

    // Calculate weeks since task creation date
    const createDate = new Date(task.created_at);
    const weeksBetween = Math.ceil(
      (date - createDate) / (1000 * 60 * 60 * 24 * 7)
    );

    // Ensure that the task interval condition is met
    if (weeksBetween % task.week_interval !== 0) {
      return false;
    }

    // If it's a recurring task and the due date has passed, exclude it
    if (task.type === "recurring" && task.due_date < date) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    // If tasks are provided and there's a valid date filter
    if (tasks && date) {
      const filteredTasks = tasks.filter((task) =>
        task.type === "daily"
          ? checkEqualDates(new Date(task.created_at), new Date(date))
          : checkMatchingDates(task, new Date(date))
      );
      setUserTasks(filteredTasks);
    } else if (tasks) {
      // Filter based on scheduled property
      const filteredTasks = tasks.filter((task) =>
        scheduled ? task.due_date !== null : task.due_date === null
      );
      setUserTasks(filteredTasks);
    }
  }, [tasks, scheduled, date]); // Only rerun the effect if these change

  const renderItem = ({ item }) => {
    const taskDone = item.done ? "done" : "undone";

    return (
      <View style={styles.taskItem}>
        <Task
          id={item.id}
          item={item}
          title={item.title}
          state={taskDone}
          showCheckbox={true}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={userTasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  taskItem: {
    margin: 7,
    paddingTop: 25,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    backgroundColor: "#FCF4E7",
    borderTopWidth: 2,
    border: "solid",
    borderColor: "black",
    width: "97%",
  },
});
