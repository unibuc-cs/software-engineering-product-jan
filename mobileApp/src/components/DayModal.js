import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import Task from './Task';

const task = {
    id: 1,
    user_id: "user_id",
    title: "Test Task",
    description: "static task to work on rendering front tasks + some more random words for testing",
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
}
const habit = {
    id: 2,
    user_id: "user_id",
    title: "Test Habit",
    description: "static habit to work on rendering front tasks + some more random words for testing",
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
}
const recurring = {
    id: 3,
    user_id: "user_id",
    title: "Test Recurring",
    description: "static recurring task to work on rendering front tasks + some more random words for testing",
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
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const checkEqualDates = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const checkMatchingDates = (task, date) => {
  let dateDayOfWeek = date.getDay();
  if (dateDayOfWeek === 0) {
    dateDayOfWeek = 6;
  } else {
    dateDayOfWeek -= 1;
  }
  if (task.days_per_week === null || task.week_interval === null) {
    return false;
  }
  if (task.days_per_week[dateDayOfWeek] === "0") {
    return false;
  }
  const createDate = new Date(task.created_at);
  const weeksBetween = Math.ceil((date - createDate) / (1000 * 60 * 60 * 24 * 7));
  if (weeksBetween % task.week_interval > 0) {
    return false;
  }
  if (task.type === "recurring" && task.due_date < date) {
    return false;
  }
  return true;
};

const DayModal = ({ tasks, date, modalVisible, setModalVisible }) => {
  const dateString = formatDate(date);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState([task, habit]);
  const [unfinished, setUnfinished] = useState([recurring]);

//   useEffect(() => {
//     if (modalVisible) {
//       setLoading(true);
//       const dateTasks = tasks.filter((task) =>
//         task.type === "daily" ? checkEqualDates(new Date(task.created_at), new Date(date)) : checkMatchingDates(task, new Date(date))
//       );
//       const finishedTasks = dateTasks.filter((task) => task.done === true);
//       const unfinishedTasks = dateTasks.filter((task) => task.done === false);
//       setFinished(finishedTasks);
//       setUnfinished(unfinishedTasks);
//       setLoading(false);
//     }
//   }, [modalVisible, tasks, date]);

  const memoizedTasks = useMemo(() => ({
    finished,
    unfinished,
  }), [finished, unfinished]);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeText}> X </Text>
          </Pressable>
          <Text style={styles.title}> Your journey on {dateString} </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#E49773" />
        ) : (
          <ScrollView style={styles.body}>
            <View style={styles.stats}>
              <Text style={styles.subtitle}> Progress: </Text>
              <Text style={styles.doneStatus}> {memoizedTasks.finished.length} / {memoizedTasks.finished.length + memoizedTasks.unfinished.length} </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text style={styles.subtitle}> Finished: </Text>
              </View>
              <View style={styles.list}>
                {memoizedTasks.finished.map((item) => (
                  <View key={item.id} style={styles.taskItem}>
                    <Task
                      id={item.id}
                      item={item}
                      title={item.title}
                      state={item.done ? "done" : "undone"}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={[styles.section, {paddingBottom: 20,}]}>
              <View style={styles.sectionTitle}>
                <Text style={styles.subtitle}> Unfinished: </Text>
              </View>
              <View style={styles.list}>
                {memoizedTasks.unfinished.map((item) => (
                  <View key={item.id} style={styles.taskItem}>
                    <Task
                      id={item.id}
                      item={item}
                      title={item.title}
                      state={item.done ? "done" : "undone"}
                      showCheckbox={false}
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: '100%',
    backgroundColor: "#E49773",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderColor: "#000",
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    width: '100%',
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: "600",
    color: "#E49773",
  },
  doneStatus: {
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  list: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});

export default DayModal;
