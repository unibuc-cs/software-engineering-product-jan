import { View, Text, ScrollView, SafeAreaView } from "react-native";

import TasksCarousel from "../components/TasksCarousel";
import FriendsChallenges from "../components/FriendsChallenges";
import ButtonCard from "../components/ButtonCard";

const suggestionsTitle = "Suggestions of the day"
const suggestionsCardText = "Swipe trough all suggestions and find the perfect challenge for you"
const suggestionsIcon = require('../../assets/swords.png')

export default function QuestsScreen() {

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}> QuestBook </Text>
                </View>
                <TasksCarousel style = {styles.carouselContainer} />
                <FriendsChallenges/>
                <ButtonCard 
                    sectionTitle={suggestionsTitle}
                    navigateTo={"Suggestions"}
                    cardText={suggestionsCardText}
                    iconPath={suggestionsIcon}/>
            </ScrollView>
        </SafeAreaView>
    );

}
const styles = {
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor:"#FCF4E7"
    },
    titleContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        paddingBottom: 15,
        borderColor: "black",
        borderStyle: "dashed",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        alignSelf: "center",
    },
    carouselContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
}
