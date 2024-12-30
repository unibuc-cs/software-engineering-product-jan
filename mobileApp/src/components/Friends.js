import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { useState } from "react";
import FriendRoundCard from "./FriendRoundCard";
import FriendProfile from "./FriendProfile";

// mock data for friends
const friends = [
  {
    user_id: "aba",
    name: "Maria",
    stats: {
      intelligence: 1,
      fitness: 2,
      wellness: 3,
      skill: 4,
    },
  },
  {
    user_id: "dss",
    name: "Ioana",
    stats: {
      intelligence: 1,
      fitness: 2,
      wellness: 3,
      skill: 5,
    },
  },
  {
    user_id: "dsss",
    name: "Radu",
    stats: {
      intelligence: 1,
      fitness: 2,
      wellness: 3,
      skill: 6,
    },
  },
  {
    user_id: "dssss",
    name: "Iordy",
    stats: {
      intelligence: 1,
      fitness: 2,
      wellness: 3,
      skill: 7,
    },
  },
  {
    user_id: "sss",
    name: "Ana",
    stats: {
      intelligence: 1,
      fitness: 2,
      wellness: 3,
      skill: 8,
    },
  },
];

export default function Friends() {
  const [selectedFriend, setSelectedFriend] = useState({});
  const [areThereSelected, setAreThereSelected] = useState(false);

  const handleSelect = (friend) => {
    setSelectedFriend(friend);
    setAreThereSelected(true);
  };

  function renderItem({ item }) {
    const backgroundColor = selectedFriend === item ? "#E49773" : "#FFF";

    return (
      <Pressable onPress={() => handleSelect(item)}>
        <View style={styles.item}>
          <FriendRoundCard friend={item} color={backgroundColor} />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Your Buddies </Text>
      </View>
      <FlatList
        horizontal
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id}
        showsHorizontalScrollIndicator={false}
        style={styles.friendsCards}
      ></FlatList>
      <FriendProfile friend={selectedFriend} anySelected={areThereSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  title: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  friendsCards: {
    flex: 1,
    paddingLeft: 15,
  },
  item: {
    marginRight: 15,
  },
});
