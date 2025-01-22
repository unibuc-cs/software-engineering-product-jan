import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";

export default function AddCharacterScreen() {
    const navigation = useNavigation();

    const [chosenCharacter, setChosenCharacter] = useState(0);
    const [madeChoice, setMadeChoice] = useState(false);

    const choseBoy = madeChoice && chosenCharacter == 1;
    const choseGirl = madeChoice && chosenCharacter == 2;

    const handleChoice = (character) => {
        setChosenCharacter(character);
        setMadeChoice(true);
    };

    // TODO: add logic to set the character choice in the user's data
    const handleSubmit = () => {
        navigation.navigate("Home");
    };

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.titleWrapper}>
                <Text style = {styles.title}> Pick Your Fighter! </Text>
            </View>
            <View style = {styles.imageWrappers}>
                <TouchableOpacity style = {styles.avatarWrapper} onPress = {() => handleChoice(1)}>
                    <View style = {[styles.avatar, choseBoy && {backgroundColor: "#CEDEFE"}]}>
                        <Image 
                            source={require("../../assets/boy.png")}
                            style={styles.avatarImage}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.avatarWrapper} onPress = {() => handleChoice(2)}>
                    <View style = {[styles.avatar, choseGirl && {backgroundColor: "#CEDEFE"}]}>
                        <Image 
                            source={require("../../assets/girl.png")}
                            style={[styles.avatarImage, {width: "90%",}]}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {styles.submit}>
                {
                    madeChoice &&
                    <TouchableOpacity style = {styles.submitButton} onPress = {() => handleSubmit()}>
                            <Text style = {styles.submitText}> Choose </Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 40,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor:"#E49773"
    },
    titleWrapper: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        marginBottom: "10%",
        textAlign: "center",
        color: "#FCF4E7",
        fontSize: 28,
        fontWeight: "600",
    },
    imageWrappers: {
        flex: 2,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
    },
    avatarWrapper: {
        width: "45%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 50,
    },
    avatar: {
        width: "98%",
        height: "98%",
        padding: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: "#FCF4E7",
    },
    avatarImage: {
        height: "100%",
        width: "100%",
    },
    submit: {
        flex: 1,
        justifyContent: "flex-start",
    },
    submitButton: {
		padding: "4%",
        marginTop: "10%",
		borderRadius: 10,
        borderWidth: 1,
		backgroundColor: "#FCF4E7",
    },
    submitText: {
        fontWeight: "500",
    }
})