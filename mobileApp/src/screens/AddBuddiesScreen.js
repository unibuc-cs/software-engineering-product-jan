import {
	View,
	StyleSheet,
	Text,
    SafeAreaView,
    ScrollView
} from "react-native";
import BuddyCode from "../components/BuddyCode";
import SearchBuddies from "../components/SearchBuddies";

export default function AddBuddiesScreen() {
    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}> Add Buddies </Text>
                </View>
                <BuddyCode />
                <SearchBuddies />
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