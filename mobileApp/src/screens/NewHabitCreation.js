import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../contexts/auth.context";
import Arm from "../svg-components/arm";
import Intelligence from "../svg-components/Intelligence";
import Wellness from "../svg-components/Wellness";
import Skill from "../svg-components/Skill";
import { useTasksContext } from "../contexts/tasks.context";
export default function NewHabitCreation() {
  const [title, setTitle] = React.useState("");
  const [titleEmoji, setTitleEmoji] = React.useState("");

  const { user } = useAuthContext();

  const [days, setDays] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [wellnessCounter, setWellnessCounter] = useState(1);
  const [intelligenceCounter, setIntelligenceCounter] = useState(1);
  const [skillCounter, setSkillCounter] = useState(1);
  const [fitnessCounter, setFitnessCounter] = useState(1);

  const {createNewActivity} = useTasksContext();

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

  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [weekInterval, setWeekInterval] = React.useState(1);

  const encodeDays = (days) => {
    return days.map((day) => (day ? "1" : "0")).join("");
  };

  const handleSubmit = async () => {
   

    const daysString = encodeDays(days);
    const data = {
      from_app: false,
      from_buddy: false,
      type: "habit",
      created_at: new Date(),
      done: false,
      description: description,
      title: title,
      user_id: user.uid,
      category: category,
      fitness: fitnessCounter,
      skill: skillCounter,
      wellness: wellnessCounter,
      inteligence: intelligenceCounter,
      emoji: titleEmoji,
      days_of_the_week: daysString,
      week_interval: weekInterval,
    };

    console.log(data);

    try{
      const response = await createNewActivity(data);
      console.log(response);
    }

      
      catch (error) {
        console.log(
          "Error creating activity:",
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
      <TouchableOpacity
        key={index}
        style={[styles.day, days[index] && styles.pickedDay]}
        onPress={() => selectWeekday(index)}
      >
        <Text>{day.trim()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.containerScroll}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>New Habit</Text>
          </View>

          <View style={styles.taskContainer}>
            <View style={styles.taskTitleWrapper}>
              <TextInput
                style={styles.sectionContentTitleEmoji}
                onChangeText={setTitle}
                value={title}
                placeholder="Habit title:"
              />

              <TextInput
                style={styles.sectionContentTitleEmoji}
                onChangeText={setTitleEmoji}
                value={titleEmoji}
                placeholder="Habit emoji: "
              />
            </View>

            <View style={styles.taskDetails}>
              <View style={styles.multipleInputWrapper}>
                <View style={styles.sectionWrapper}>
                  <Text style={styles.sectionTitle}>Days</Text>
                  <View style={styles.sectionContentWrapper}>
                    <View style={styles.daysWrapper}>
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, index) =>
                        renderWeekdays(day, index)
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.sectionContentWrapper}>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setCategory}
                    value={category}
                    placeholder="Category: "
                  />
                </View>
              </View>

              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Description</Text>
                <View style={styles.sectionContentWrapper}>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description of your habit: "
                  />
                </View>
              </View>

              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Week Interval</Text>
                <View style={styles.sectionContentWrapper}>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setWeekInterval}
                    value={weekInterval}
                    placeholder="Week Interval: "
                  />
                </View>
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
                        <Text style={styles.counter}>
                          {intelligenceCounter}
                        </Text>
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
                        <Wellness> </Wellness>
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
                  <Text style={styles.submitText}> Submit </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(228, 151, 115, 0.15)",
    borderRadius: "30%",
    width: 22,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  IncContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
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
    marginTop: 30,
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
    // height: "100%",
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
    display: "flex",
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
    // paddingBottom: 2,
  },
  sectionContent: {
    fontSize: 14,
    paddingHorizontal: 15,
    margin: 3,
  },
  sectionContentTitleEmoji: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  statsContainer: {
    flex: 2,
  },
  statsWrapper: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  statName: {
    fontSize: 18,
    fontWeight: "200",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    height: 30,
  },
  pickedDay: {
    backgroundColor: "#cedefe",
    borderRadius: 5,
    width: 30,
    height: 30,
  },
  submitText: {
    color: "black",
    fontSize: 15,
    fontWeight: "200",
  },
  submitButtonWrapper: {
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
