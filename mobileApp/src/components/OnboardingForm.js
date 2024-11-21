import { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";

export default function OnboardingForm() {

    const [form, setForm] = useState({
		name: "",
		surname: ""
	});

    const handleNameChange = (value) => {
		setForm((prevForm) => ({
			...prevForm,
			name: value
		}));
	};

	const handleSurnameChange = (value) => {
		setForm((prevForm) => ({
			...prevForm,
			surname: value
		}));
	};

    return (
        <View style = {styles.wrapper}>
            <View style = {styles.cardWrapper}>
                <View style = {styles.card}>
                    <View style = {styles.formTitle}>
                        <Text style = {styles.title}>
                            Tell us more {'\n'} about yourself!
                        </Text>
                    </View>
                    <View style = {styles.form}>
                        <Text style = {styles.label}> Name: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={form.name}
                            onChangeText={handleNameChange}
                        />
                        <Text style = {styles.label}> Surname: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Surname"
                            value={form.surname}
                            onChangeText={handleSurnameChange}
                        />
                    </View>
                    <View style = {styles.submit}>
                        <TouchableOpacity style = {styles.submitButton} >
                                <Text style = {styles.submitText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
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
        width: "90%",
        height: "55%",
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
        paddingTop: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: "#FCF4E7",
    },
    formTitle: {
        flex: 0.75,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#E49773",
        textAlign: "center",
    },
    form: {
        flex: 1.5,
        width: "100%",
        padding: "7%",
        justifyContent: "center",
    },
	input: {
		width: "100%",
		padding: "4%",
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		backgroundColor: "#fff"
	},
    label: {
        color: "#E49773",
    },
    submit: {
        flex: 0.75,
        justifyContent: "center",
    },
    submitButton: {
		padding: "4%",
		borderRadius: 10,
		backgroundColor: "#E49773",
    },
    submitText: {},
})