import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";
import DateTimePicker from "@react-native-community/datetimepicker";
import Arm from "../svg-components/arm";
import Intelligence from "../svg-components/Intelligence";
import Wellness from "../svg-components/Wellness";
import Skill from "../svg-components/Skill";
import { useTasksContext } from "../contexts/tasks.context";

export default function EditRecurrentTask() {
  const [title, setTitle] = useState("");
  const [titleEmoji, setTitleEmoji] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [weekInterval, setWeekInterval] = useState(1);
  const [dueDate, setDueDate] = useState(new Date());

  const { user } = useAuthContext();

  const { editActivity } = useTasksContext();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShow(Platform.OS === "ios");
    setDueDate(currentDate);
  };
  const [description, setDescription] = React.useState("");
  const createdAt = new Date().toISOString();
  const done = 0;
  const [wellnessCounter, setWellnessCounter] = useState(1);
  const [intelligenceCounter, setIntelligenceCounter] = useState(1);
  const [skillCounter, setSkillCounter] = useState(1);
  const [fitnessCounter, setFitnessCounter] = useState(1);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const incWellness = () => setWellnessCounter(wellnessCounter + 1);
  const decWellness = () => {
    if (wellnessCounter > 0) {
      setWellnessCounter(wellnessCounter - 1);
    }
  };
  const incIntelligence = () => setIntelligenceCounter(intelligenceCounter + 1);
  const decIntelligence = () => {
    if (intelligenceCounter > 0) {
      setIntelligenceCounter(intelligenceCounter - 1);
    }
  };

  const incSkill = () => setSkillCounter(skillCounter + 1);
  const decskill = () => {
    if (skillCounter > 0) setSkillCounter(skillCounter - 1);
  };
  const incFitness = () => setFitnessCounter(fitnessCounter + 1);
  const decFitness = () => {
    if (fitnessCounter > 0) setFitnessCounter(fitnessCounter - 1);
  };

  const encodeDays = (days) => {
    return days.map((day) => (day ? "1" : "0")).join("");
  };

  const handleSubmit = async () => {
    const objectToSend = {
      title: title,
      titleEmoji: titleEmoji,
      type: "recurring",
      created_at: createdAt,
      done: done,
      description: description,
      user_id: user.uid,
      fitness: fitnessCounter,
      skill: skillCounter,
      wellness: wellnessCounter,
      inteligence: intelligenceCounter,
      emoji: titleEmoji,
      frequency: weekInterval,
      days_of_the_week: encodeDays(days),
      due_date: dueDate,
    };

    console.log(objectToSend);

    try {
      const response = await editActivity(objectToSend);
      console.log("Edit activity response:", response);
    } catch (error) {
      console.log(
        "Error editing activity:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const selectWeekday = (index) => {
    setDays((previousDays) => {
      const newDays = [...previousDays];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  const renderWeekdays = (day, index) => {
    return (
      <Text
        key={index}
        style={[styles.day, days[index] && styles.pickedDay]}
        onPress={() => selectWeekday(index)}
      >
        {day}
      </Text>
    );
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit Recurrent Task</Text>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.taskTitleWrapper}>
            <TextInput
              style={styles.sectionContentTitleEmoji}
              onChangeText={setTitle}
              value={title}
              placeholder="Task title:"
            />

            <TextInput
              style={styles.sectionContentTitleEmoji}
              onChangeText={setTitleEmoji}
              value={titleEmoji}
              placeholder="Task emoji: "
            />
          </View>

          <View style={styles.taskDetails}>
            <View style={styles.multipleInputWrapper}>
              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Frequency</Text>
              </View>

              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Days</Text>
                <View style={styles.sectionContentWrapper}>
                  <View style={styles.daysWrapper}>
                    {renderWeekdays("M", 0)}
                    {renderWeekdays("T", 1)}
                    {renderWeekdays("W", 2)}
                    {renderWeekdays("T", 3)}
                    {renderWeekdays("F", 4)}
                    {renderWeekdays("S", 5)}
                    {renderWeekdays("S", 6)}
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setCategory}
                  value={category}
                  placeholder="Category: "
                />
              </View>
            </View> */}

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setDescription}
                  value={description}
                  placeholder="Description of your task: "
                />
              </View>
            </View>
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.sectionTitle}> Due date</Text>
              <TouchableOpacity onPress={() => showMode("date")}>
                <Text style={styles.sectionContent}>
                  {dueDate.toDateString()}
                </Text>
                {show && (
                  <DateTimePicker
                    style={styles.dateStyle}
                    testID="dateTimePicker"
                    value={dueDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    onTouchCancel={() => setShow(false)}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.sectionTitle}> Stats </Text>
              <View style={styles.statsWrapper}>
                <View>
                  <View style={styles.stat}>
                    <Text style={styles.statName}> Fitness </Text>
                    <Arm></Arm>
                    <View style={styles.IncContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={decFitness}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counter}>{fitnessCounter}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={incFitness}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.stat}>
                    <Text style={styles.statName}> Intelligence </Text>
                    <Intelligence></Intelligence>
                    <View style={styles.IncContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={decIntelligence}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counter}>{intelligenceCounter}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={incIntelligence}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <View>
                    <View style={styles.stat}>
                      <Text style={styles.statName}> Wellness </Text>
                      <Wellness></Wellness>
                      <View style={styles.IncContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={decWellness}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counter}>{wellnessCounter}</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={incWellness}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.stat}>
                      <Text style={styles.statName}> Skill </Text>
                      <Skill></Skill>
                      <View style={styles.IncContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={decskill}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counter}>{skillCounter}</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={incSkill}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.submitButtonWrapper}>
              <TouchableOpacity
                //title="Submit"
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}> Save changes </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    // padding: 4,
    backgroundColor: "rgba(228, 151, 115, 0.15)",
    borderRadius: "30%",
    width: 22,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
  },
  submitButtonWrapper: {
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "black",
    fontSize: 15,
    fontWeight: "200",
  },

  IncContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#FCF4E7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerScroll: {
    backgroundColor: "#FCF4E7",
    flexGrow: 1,
  },
  taskTitleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 15,
  },
  multipleInputWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  shadow: {
    position: "fixed",
    top: 105,
    left: -98,
    width: "80%",
    height: "70%",
    backgroundColor: "black",
    borderRadius: 24,
  },
  taskDetails: {
    // height: "80%",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "7%",
    paddingVertical: "7%",
    marginTop: 20,
    borderRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 7,
    borderRightWidth: 7,
    borderColor: "black",
    backgroundColor: "#fff",
  },
  sectionWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
  },
  taskContainer: {
    flex: 1,
    width: "80%",
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "200",
  },
  sectionContentWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    paddingHorizontal: 15,
  },
  sectionContentTitleEmoji: {
    fontSize: 20,
    marginTop: 10,
  },
  statsContainer: {
    flex: 1.5,
  },
  statsWrapper: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flexDirection: "column",
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  statName: {
    fontSize: 18,
    fontWeight: "200",
    // flexDirection: "row",
  },
  statValue: {
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  daysWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  day: {
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    textAlign: "center",
    textAlignVertical: "center",
    height: 20,
  },
  pickedDay: {
    backgroundColor: "#cedefe",
    borderRadius: 5,
  },
  dateStyle: {
    backgroundColor: "#E49773",
    borderRadius: "6%",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "200",
  },
  counter: {
    fontSize: 16,
    fontWeight: "200",
    padding: 8,
  },
});
