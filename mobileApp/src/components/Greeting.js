import {
	View,
	StyleSheet,
	Text,
} from "react-native";

import Logo from "../svg-components/Logo";

export default function Greeting() {

    return (
        <View style = {styles.wrapper}>
            <View style = {styles.cardWrapper}>
                <View style = {styles.card}>
                    <Text style = {styles.greeting}>
                        Get ready to start the journey to your dream life!
                    </Text>
                    <Logo />
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
        backgroundColor: "#CEDEFE",
    },
    cardWrapper: {
        width: "77%",
        height: "32%",
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
        backgroundColor: "#FCF4E7",
    },
    greeting: {
        marginBottom: 15,
        fontSize: 20,
        color: "#E49773",
        textAlign: "center",
    },
})