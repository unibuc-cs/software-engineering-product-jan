import { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
} from "react-native";

import InterestButton from "./InterestButton";

export default function Interests() {

    const interests = ['Sports', 'Food', 'Gaming', 'Learning', 'Arts & Crafts', 'Outdoors', 'Reading',
        'Music', 'Technology', 'Movies', 'Home & Garden', 'Animals', 
    ];

    const [states, setStates] = useState(Array(interests.length).fill(false));


    return (
        <View style = {styles.wrapper}>
            <View style = {styles.cardWrapper}>
                <View style = {styles.card}>
                    <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Pick Your Interests!
                        </Text>
                    </View>
                    <View style = {styles.description}>
                        <Text style = {styles.descriptionText}>
                            Tell us more about what you like. {'\n'}
                            It will help us improve your experience.
                        </Text>
                    </View>
                    <View style = {styles.interestsWrapper}>
                        {
                            interests.map((interest, index) => {
                                return (<InterestButton 
                                            name={interest} 
                                            index={index} 
                                            state={states[index]}
                                            setStates={setStates}
                                        />)
                            })
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#CEDEFE",
        justifyContent: "center",
        alignItems: "center",
    },
    cardWrapper: {
        width: "90%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 50,
    },
    card: {
        width: "98%",
        height: "98%",
        paddingHorizontal: "7%",
        paddingVertical: "10%",
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: "#FCF4E7",
    },
    title: {
        flex: 0.75,
        justifyContent: "center",
        marginBottom: 15,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "600",
        color: "#E49773",
    },
    description: {
        flex: 1,
        marginBottom: 15, 
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "300",
    },
    interestsWrapper: {
        flex: 4,
        flexDirection: "row",
        flexWrap: "wrap",
    },
})