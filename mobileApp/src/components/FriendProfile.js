import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {useState} from "react";
import Button1 from "./Button1";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {useFriendsContext} from "../contexts/friends.context.jsx";
import { useEffect } from "react";

export default function FriendProfile({ friend, anySelected }) {
    const navigation = useNavigation();

    const {deleteFriend} = useFriendsContext();


  return (
    <View style={styles.container}>
      {!anySelected && (
        <View style={styles.emptyCard1}>
          <Text style={styles.emptyMessage}>
            {" "}
            Click on a friend {"\n"} to see their profile{" "}
          </Text>
        </View>
      )}
      {anySelected && (
        <View style={styles.emptyCard}>
          <View style={styles.friendName}>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.emptyMessage}>
                {" "}
                {friend.name}'s Profile {"\n "}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.bottomPart}>
            <View style={styles.profile}>
              <View style={styles.left}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/character.png")} // TODO: replace with friend's character
                />
              </View>
              <View style={styles.right}>
                <View style={styles.title}>
                  <Text> Task completed: </Text>
                </View>
                <View style={styles.stats}>
                  <View style={styles.nameofstats}>
                    <Text style={styles.statsText}> fitness: </Text>
                    <Text style={styles.statsText}> intelligence: </Text>
                    <Text style={styles.statsText}> skill: </Text>
                    <Text style={styles.statsText}> wellness: </Text>
                  </View>
                  <View style={styles.valuesofstats}>
                    <Text style={styles.statsValue}>
                      {friend.stats["fitness"]}
                    </Text>
                    <Text style={styles.statsValue}>
                      {friend.stats["intelligence"]}
                    </Text>
                    <Text style={styles.statsValue}>
                      {friend.stats["wellness"]}
                    </Text>
                    <Text style={styles.statsValue}>
                      {friend.stats["skill"]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              <Button1 color="#9EBEFE" title="Send challenge" action={() => navigation.navigate("SendChallenge", friend.id)}></Button1>
              <Button1 color="#E49773" title="Remove friend" action={() => deleteFriend(friend.id) }></Button1>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 20,
  },
  emptyCard: {
    width: "85%",
    height: "75%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  emptyCard1: {
    width: "85%",
    height: "75%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
  },
  friendName: {
    backgroundColor: "#E49773",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.5,
    justifyContent: "center",
  },
  bottomPart: {
    flex: 10,
  },
  profile: {
    flex: 3.5,
    flexDirection: "row",
  },
  buttons: {
    flex: 1.5,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 18,
  },
  left: {
    flex: 1.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 2,
    // backgroundColor: "black",
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    height: "80%",
    width: "80%",
    borderColor: "black",
    borderWidth: 1.5,
    padding: 8,
    borderRadius: 10,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 17,
    justifyContent: "center",
  },
  statsText: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  title: {
    justifyContent: "center",
    // flex: 2,
    borderColor: "#9EBEFE",
    borderWidth: 0.5,
    borderRadius: "10%",
    width: "70%",
    height: "19%",
  },
  valuesofstats: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingRight: 35,
  },
  statsValue: {
    fontWeight: "700",
    color: "#E49773",
  },
  nameofstats: {
    justifyContent: "space-evenly",
  },
});
