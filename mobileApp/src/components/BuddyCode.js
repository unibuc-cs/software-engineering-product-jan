import {
	View,
	StyleSheet,
	Text,
} from "react-native";

export default function BuddyCode() {

    return (
        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.titleText}> Your Code </Text>
            </View>
            <View style = {styles.codeContainer}> 
                <View style = {styles.shadow}></View>
                <View style = {styles.codeCard}>
                    <Text style = {styles.code}> {code} </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "40%",
        marginTop: 20,
    },
    title: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
    },
    codeContainer: {
        height: "65%",
        justifyContent: "center",
        alignItems: "center"
    },
	shadow: {
        height: "90%",
        width: "80%",
		top: 2,
		left: 2,
		borderRadius: 20,
		alignItems: "center",
		backgroundColor: "#000",
	},
    codeCard: {
        position: "absolute",
        height: "90%",
        width: "80%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    code: {
        fontSize: 26,
        fontWeight: "600",
    },
})

