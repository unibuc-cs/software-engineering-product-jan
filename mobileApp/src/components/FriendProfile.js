import {
	View,
	StyleSheet,
	Text,
} from "react-native";

export default function FriendProfile({friend, anySelected}) {

    return (
        <View style = {styles.container}>
            {!anySelected && 
                <View style = {styles.emptyCard}>
                    <Text style = {styles.emptyMessage}> Click on a friend {'\n'} to see their profile </Text>
                </View>
            }
            {anySelected &&
                <View style = {styles.emptyCard}>
                    <Text style = {styles.emptyMessage}> {friend.name}'s Profile {'\n '} </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "70%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    emptyCard: {
        width: "85%",
        height: "85%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyMessage: {
        textAlign: "center",
        fontSize: 18,
    },
})