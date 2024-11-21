import { useNavigation } from "@react-navigation/native";
import {
	Button,
	View,
	StyleSheet,
	Text,
    TouchableOpacity,
} from "react-native";

export default function GetStarted() {
    const navigation = useNavigation();

    return (
        <View style = {styles.wrapper}>
             <View style = {styles.cardWrapper}>
                <View style = {styles.card}>
                    <Text style = {styles.message}>
                        Your journey begins now!
                    </Text>
                    <TouchableOpacity onPress = {() => navigation.navigate("Home")}>
                        <View style = {styles.button}>
                            <Text style = {styles.buttonText}> Let's go! </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FCF4E7",
    },
    cardWrapper: {
        width: "70%",
        height: "33%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 50,
    },
    card: {
        width: "98%",
        height: "98%",
        padding: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: "#E49773",
    },
    message: {
        marginBottom: 25,
        fontSize: 24,
        fontWeight: "500",
        color: "#FCF4E7",
        textAlign: "center",
    },
    button: {
        padding: 10,
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: "#fff",
    },
    buttonText: {
        fontSize: 20,
    },
})