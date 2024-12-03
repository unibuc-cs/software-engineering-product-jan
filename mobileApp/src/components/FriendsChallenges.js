import {View, Text, StyleSheet, FlatList} from "react-native";

import FriendCard from "./FriendCard";

const friendsChallenges = [
    {
        id: 2,
        title: "do 100 push-ups",
        iconId: 3, 
        description: "you can bail anytime =P",
        type: "Tasks",
        stats: [3, 0, 0],
        friendId: 222,
        friend: {name: "Radu"},
      },
      {
        id: 23,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210,
        friend: {name: "Ioana"},
      },
      {
        id: 24,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210,
        friend: {name: "Maria"},
      },
      {
        id: 25,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210,
        friend: {name: "Iordy"},
      },
      {
        id: 26,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210,
        friend: {name: "Elena"},
      },
      {
        id: 27,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210,
        friend: {name: "Ana"},
      },
];

export default function FriendsChallenges() {

    function renderItem({item}) {
        return(
            <View style = {styles.item}>
                <FriendCard 
                    title = {item.title}
                    description = {item.description}
                    stats = {item.stats}
                    friend = {item.friend}
                />
            </View>
        );
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.titleText}> Friends Challenges </Text>
            </View>
            <FlatList
                horizontal
                data = {friendsChallenges}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id}
                showsHorizontalScrollIndicator = {false} 
                style = {styles.cards}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    title: {
        flex: 1,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
    },
    cards: {
        flex: 3,
        paddingLeft: 15,
    },
    item: {
        flex: 1,
        marginRight: 15,
    }
});