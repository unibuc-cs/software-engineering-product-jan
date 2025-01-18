import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTasksContext } from "../contexts/tasks.context";

export default function Task({ id, item, title, emoji, state, showCheckbox }) {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);

  const { completeActivity } = useTasksContext();

  // Sync checkbox selection with task state
  useEffect(() => {
    setSelection(state === "done");
  }, [state]);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Task", { task: item })}
    >
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.emojiWrapper}>{emoji}</Text>
          <Text>{title}</Text>
        </View>
        {showCheckbox && (
          <View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                color={"black"}
                value={isSelected}
                onValueChange={() => {
                  const newSelection = !isSelected;
                  console.log("Checkbox toggled:", newSelection);
                  setSelection(newSelection);
                  completeActivity(id, newSelection);
                }}
                
                style={styles.checkbox}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  emojiWrapper: {
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#E5E5E5",
  },
  checkbox: {
    alignSelf: "center",
    borderRadius: 4,
  },
  label: {
    margin: 8,
  },
});
