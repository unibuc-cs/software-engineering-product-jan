import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
export default function Navbar() {
  const navigation = useNavigation();
  const { Image } = require("react-native");

  const homeIcon = require("../../assets/icons8-home-100.png");
  const journeyIcon = require("../../assets/icons8-map-64.png");
  const addIcon = require("../../assets/icons8-plus-64.png");
  const questIcon = require("../../assets/icons8-parchment-48.png");
  const friendsIcon = require("../../assets/icons8-users-100.png");

  return (
    <View style={style.container}>
      <View style={style.topBorderedView}></View>
      <View style={style.content}>
        <TouchableOpacity
          style={style.home}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={homeIcon} style={{ width: 53, height: 55 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.journey}
          onPress={() => navigation.navigate("Journey")}
        >
          <Image source={journeyIcon} style={{ width: 42, height: 42 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.add}
          onPress={() => navigation.navigate("TasksMenu1")}
        >
          <Image source={addIcon} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.quests}
          onPress={() => navigation.navigate("Quests")}
        >
          <Image source={questIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.friends}
          onPress={() => navigation.navigate("Buddies")}
        >
          <Image source={friendsIcon} style={{ width: 53, height: 53 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
0;
const style = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "column",
    // justifyContent:'center',
    alignContent: "space-around",
    backgroundColor: "#FFFFFF40",
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    top: "2%",
  },
  topBorderedView: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#fff",
    // Apply border only to the top
    borderTopWidth: 1, // Width of the top border
    borderTopColor: "#000", // Color of the top border
  },
  home: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  journey: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  quests: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  friends: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
