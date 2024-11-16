import { View, StyleSheet, Text } from "react-native";

export default function TaskCard({task}) {

    const taskStatus = task.status ? "Done" : "Ongoing...";
    const statusColor = task.status ? "#CEDEFE" : "#C7B0A0";
  
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    };

    const renderWeekday = (day, index) => {
        return (
            <Text style={[styles.day, task.days_of_the_week[index] === "1" && styles.pickedDay]}>
                {day}
            </Text>
        );
    };

    return (
        <>
        <View style = {styles.shadow}></View>
        <View style = {styles.taskDetails}>
            {task.type == "daily" && (
                <View style = {styles.row}>
                    {/* Date Section */}
                    <View style = {[styles.sectionWrapper, {flex: 1}]}>
                        <Text style = {styles.sectionTitle}> Date </Text>
                        <Text style = {styles.sectionContent}>
                            {formatDate(new Date(task.created_at))}
                        </Text>
                    </View>
                    {/* Status Section */}
                    <View style = {[styles.sectionWrapper, {flex: 1}]}>
                        <Text style = {styles.sectionTitle}> Status </Text>
                        <Text style = {[styles.sectionContent, {color: statusColor, fontWeight: "bold"}]}>
                            {taskStatus}
                        </Text>
                    </View>
                </View>
            )}
            {(task.type === "habit" || task.type === "recurring") && (
                <View style = {styles.row}>
                    {/* Frequency Section */}
                    <View style = {[styles.sectionWrapper, {flex: 1.25}]}>
                        <Text style = {styles.sectionTitle}> Frequency </Text>
                        <Text style = {styles.sectionContent}>
                            Every {task.frequency} week(s)
                        </Text>
                    </View>
                    {/* Days of the Week Section */}
                    <View style = {[styles.sectionWrapper, {flex: 1}]}>
                        <Text style = {styles.sectionTitle}></Text>
                        <View style = {styles.daysWrapper}>
                            {renderWeekday("M", 0)}
                            {renderWeekday("T", 1)}
                            {renderWeekday("W", 2)}
                            {renderWeekday("T", 3)}
                            {renderWeekday("F", 4)}
                            {renderWeekday("S", 5)}
                            {renderWeekday("S", 6)}
                        </View>
                    </View>
                </View>
            )}
            {/* Stats Section */}
            <View style={[styles.sectionWrapper, {flex: 2}]}>
            <Text style={styles.sectionTitle}> Stats </Text>
            <View style={styles.statsWrapper}>
                <View>
                <View style={styles.stat}>
                    <Text style={styles.statName}> Fitness </Text>
                    <Text style={styles.statValue}> + {task.stats.fitness} </Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statName}> Intelligence </Text>
                    <Text style={styles.statValue}> + {task.stats.intelligence} </Text>
                </View>
                </View>
                <View>
                <View style={styles.stat}>
                    <Text style={styles.statName}> Wellness </Text>
                    <Text style={styles.statValue}> + {task.stats.wellness} </Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statName}> Skill </Text>
                    <Text style={styles.statValue}> + {task.stats.skill} </Text>
                </View>
                </View>
            </View>
            </View>
            {/* Description Section */}
            <View style = {{flex: 1.5}}>
                <Text style = {styles.sectionTitle}> Description </Text>
                <Text style = {styles.sectionContent}> {task.description} </Text>
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
  taskDetails: {
    position: "absolute",
    height: "85%",
    width: "80%",
    alignSelf: "center",
    paddingHorizontal: "7%",
    paddingVertical: "3%",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#C7B0A0",
    backgroundColor: "#fff",
  },
  shadow: {
    top: 2,
    left: 41,
    width: "80%",
    height: "85%",
    backgroundColor: "black",
    borderRadius: 24,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  sectionWrapper: {
    borderBottomWidth: 1,
    borderColor: "#C7B0A0",
    borderStyle: "dashed",
  },
  sectionTitle: {
    marginTop: 10,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: "200",
    letterSpacing: 3,
  },
  sectionContent: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  daysWrapper: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 10,
    paddingHorizontal: 4,
    marginHorizontal: 0.5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
  },
  pickedDay: {
    backgroundColor: "#CEDEFE",
  },
  statsWrapper: {
    paddingHorizontal: 25,
  },
  stat: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  statName: {
    letterSpacing: 1,
  },
  statValue: {
    fontWeight: "500",
    color: "#E49773",
  },
});
