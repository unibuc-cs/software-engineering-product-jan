import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import TaskCard from "../components/TaskCard";
import TrashBin from "../svg-components/TrashBin";
import { useTasksContext } from "../contexts/tasks.context";
import { useNavigation } from "@react-navigation/native";
export default function TaskScreen({ route }) {
  const { task } = route.params;
  const navigation = useNavigation();
  const recurring = task.type === "recurring" ? 1 : 0;
  const taskType = recurring
    ? "Recurring Task"
    : task.type === "daily"
    ? "Task"
    : "Habit";

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const { deleteActivity } = useTasksContext();
  const { editActivity } = useTasksContext();

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 0, 
            }}>
                <TaskBackground width = "100%" height = "100%"/>
            </View> */}
      <View style={styles.titleContainer}>
        {/* Display TrashBin for delete */}
        <TrashBin width="25" height="25" fill="none" />

        {/* Display task type */}
        <Text style={styles.title}>
          <Text style={styles.sectionContent}> {taskType} </Text>
        </Text>

        {/* Edit Button */}
        <TouchableOpacity
          onPress={() => {
            // Handle edit functionality here
            editActivity(task.id);
            if (taskType === "Habit") {
              navigation.navigate("EditHabit");
            } else if (taskType === "Task") {
              navigation.navigate("EditTask");
            } else {
              navigation.navigate("EditRecurrentTask");
            }
          }}
          style={styles.editButton}
        >
          {/* Use Image component to render the Edit icon */}
          <Image
            source={require("../../assets/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => {
            deleteActivity(task.id);
            navigation.goBack();
          }}
          style={styles.deleteButton}
        >
          <TrashBin width="30" height="30" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleWrapper}>
            <Text style={styles.taskTitle}> {task.title} </Text>
            <Text style={styles.emoji}> {task.emoji} </Text>
          </View>
          <View style={styles.dateWrapper}>
            {!recurring && (
              <Text style={styles.date}>
                Due date: {formatDate(new Date(task.created_at))}
              </Text>
            )}
            {recurring && (
              <Text style={styles.date}>
                Due date: {formatDate(new Date(task.due_date))}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.taskDetailsContainer}>
          <TaskCard task={task} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7", //#00000000 - if i want a svg background,
  },
  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {},
  taskContainer: {
    flex: 1,
  },
  taskHeader: {
    flex: 1,
    paddingHorizontal: "10%",
  },
  taskTitleWrapper: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  taskTitle: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "500",
  },
  emoji: {
    fontSize: 24,
  },
  dateWrapper: {
    flex: 1,
    paddingTop: 5,
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    fontWeight: "200",
  },
  taskDetailsContainer: {
    flex: 3,
  },
  editIcon: {
    width: 25,
    height: 25,
  },

  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: "600",
  },
  sectionContent: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
  },
  editButton: {
    padding: 5,
  },
});
