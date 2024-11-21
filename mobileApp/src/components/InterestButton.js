import { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
    Pressable,
} from "react-native";

export default function InterestButton({name, index, state, setStates}) {

    const [selected, setSelected] = useState(state);

    const handleSelect = () => {
        setSelected((current) => !current);
        setStates((states) => {
            const temp = [...states];
            temp[index] = !states[index];
            return temp;
        });
    };

    return (
        <Pressable style = {styles.wrapper} onPress = {handleSelect}>
            <View style = {[styles.interest, 
                selected && styles.pickedInterest, 
                !selected && styles.unpickedInterest]}>
                    <Text style = {[styles.interestName, 
                        selected && {color: "#FCF4E7"}, 
                        !selected && {color: "#E49773"}]}> 
                            {name} 
                    </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: "13%",
        margin: "1.6%",
        justifyContent: "center",
        alignItems: "center",
    },
    interest: {
        flex: 1,
        height: "98%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#E49773",
    },
    unpickedInterest: {
    },
    pickedInterest: {
        backgroundColor: "#E49773",
    },
    interestName: {
        fontSize: 14,
        textAlign: "center",
    },
})