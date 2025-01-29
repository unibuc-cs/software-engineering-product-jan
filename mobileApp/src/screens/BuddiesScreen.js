import {
	View,
	StyleSheet,
	Text,
    SafeAreaView,
    ScrollView
} from "react-native";
import ButtonCard from "../components/ButtonCard";
import Friends from "../components/Friends";
import {useFriendsContext} from "../contexts/friends.context";

export default function BuddiesScreen() {
    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style={{flex:1, paddingBottom: "35%",}}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.title}> Buddies </Text>
                    </View>
                    <ButtonCard
                        sectionTitle={"Add New Buddies"}
                        navigateTo={"AddBuddies"}
                        cardText={"Add new buddies through their code or see your own"}
                        iconPath={require('../../assets/friendsIcon.png')}
                        />
                    <Friends />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
})