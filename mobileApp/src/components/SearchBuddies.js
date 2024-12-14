import { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
    TextInput,
} from "react-native";

export default function SearchBuddies() {

    const [buddyCode, setBuddyCode] = useState("");
    const [searchedYet, setSearchedYet] = useState(false);
    const [anyResults, setAnyResults] = useState(false);

    const handleCodeChange = (value) => {
        setBuddyCode(value);
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.titleText}> Search for a New Buddy </Text>
            </View>
            <View style = {styles.search}>
                <View style = {styles.inputShadow}></View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here your friend's code"
                    value={buddyCode}
                    onChangeText={handleCodeChange}
                />
            </View>
            <View style = {styles.card}>
            {
                !searchedYet && 
                <View style = {styles.emptyCard}>
                    <Text style = {styles.cardText}> 
                        Search for a new friend {"\n"} to see their profile.
                    </Text>
                </View>
            }
            {
                searchedYet && !anyResults &&
                <View style = {styles.emptyCard}>
                    <Text style = {styles.cardText}> 
                        No user with {"\n"} this code associated. 
                    </Text>
                </View>
            }
            {
                searchedYet && anyResults &&
                <View style = {styles.emptyCard}>
                    {/* change this to profile after profile component done */}
                </View>
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginTop: "10%",
    },
    title: {
        height: "12%",
        marginHorizontal: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
    },
    search: {
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    inputShadow: {
        width: "80%",
        height: "50%",
		top: 2,
		left: 2,
		borderRadius: 25,
		alignItems: "center",
		backgroundColor: "#000",
    },
    input: {
        position: "absolute",
        width: "80%",
        height: "50%",
		padding: "3%",
		borderWidth: 1,
		borderRadius: 25,
		backgroundColor: "#fff",
        textAlign: "center",
    },
    card: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyCard: {
        width: "85%",
        height: "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    cardText: {
        textAlign: "center",
        fontSize: 18,
    },
})

