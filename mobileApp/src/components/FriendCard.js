import { StyleSheet, Text, View, Image, Pressable, } from "react-native";
import { React, useState } from "react";
import FriendRoundCard from "./FriendRoundCard";

export default function FriendCard({ title, description, stats, friend }) {
    const [extended, setExtended] = useState(false);

    return (
      <Pressable onPress = {() => setExtended(!extended)}>
        {extended &&
          <View style = {style.containerCard}>
            <View style = {style.shadow}/>
            <View style = {style.card}>
                <View style = {style.top}>
                  <View style = {style.person}>
                    <Image 
                      style = {style.avatar} 
                      resizeMode = "contain"
                      source = {require('../../assets/boy.png')}
                    />
                    <Text style = {style.name}> {friend.name} </Text>
                  </View>
                  <Text style = {style.title}>{title}</Text>
                </View>
                <View style = {style.textArea}>
                <View style = {style.descriptionWrapper}>
                <Text style = {style.description}>{description}</Text>
                </View>
                <View style = {style.statsWrapper}>
                  <Text>+Str {stats[0]}</Text>
                  <Text>+Int {stats[1]}</Text>
                </View>
                </View>
            </View>
          </View>
        }
        { !extended && <FriendRoundCard friend = {friend} color={"#FFF"}/> }
      </Pressable>
    )
}

const style = StyleSheet.create({
    containerCard: {
      height: 240,
      width: 300,
      marginBottom: 5,
      justifyContent: "center",
    },
    shadow: {
      flex: 1,
      width: "100%",
      borderRadius: 26,
      alignItems: 'center',
      backgroundColor: '#000',
      top: 3,
      left: 3,
    },
    card: {
      position: 'absolute',
      flex: 1,
      width: "100%",
      height: "100%",
      borderRadius: 26,
      borderWidth: 2,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      borderWidth: 1,
    },
    top: {
      flexDirection: "row",
      height: "33%",
      width: "100%",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: "#E49773",
      alignItems: "center",
    },
    touchable: {
      flex: 1,
      margin: 5,
    },
    person: {
      flex: 1,
      alignItems: "center",
    },
    avatar: {
      flex: 3,
      width: "100%",
      height: "100%",
    },
    name: {
      flex: 1,
      fontSize: 12,
      alignSelf: "center",
    },
    title:{
      flex: 3,
    },
    textArea:{
      flex:1,
      flexDirection:'row',
    },
    descriptionWrapper:{
      flex:1,
      width:'75%',
      padding:"10%",
    },
    statsWrapper:{
      width: "25%",
      height: 20,
      marginTop: 20,
    },
});