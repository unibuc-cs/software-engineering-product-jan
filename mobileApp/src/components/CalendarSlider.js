import { useState, useCallback } from "react";
import {
    Dimensions,
	StyleSheet,
	View,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const height = Dimensions.get("window").height;

export default function CalendarSlider({day, setDay}) {

    const [selected, setSelected] = useState(day);

    const handleDayChange = useCallback((date) => {
        setDay(date.toDate());
        setSelected(date);
    }, [day]);
	
	return (
		<View style={styles.container}>
			<View style={styles.picker}>
				<CalendarStrip 
                    scrollable
                    scrollerPaging
                    selectedDate = {selected}
                    onDateSelected = {handleDayChange}
                    minDate = {moment().subtract(6, "months")}
                    maxDate = {moment().add(6, "months")}
                    scrollToOnSetSelectedDate = {true}
                    dateNameStyle = {styles.itemWeekday}
                    dateNumberStyle = {styles.itemDate}
                    dayContainerStyle = {styles.item}
                    highlightDateNumberStyle = {styles.activeNumber}
                    highlightDateNameStyle = {styles.itemWeekday}
                    highlightDateContainerStyle = {styles.activeItem}
                    styleWeekend = {false}
                    headerText={null}
                    calendarHeaderStyle = {{fontSize: 16,}}
                    style={{flex: 1, width: "100%", height: "95%",}}
                    dayComponentHeight = {70}
                    leftSelector={[]}
                    rightSelector={[]}
                />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	picker: {
		flex: 1,
        height: 70,
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	item: {
		width: "87%",
        height: "100%",
        paddingVertical: 5,
		alignItems: "center",
        justifyContent: "flex-start",
		backgroundColor: "#E49773",
		borderWidth: 1,
        borderBottomWidth: 2,
        borderRightWidth: 2,
		borderRadius: 8,
	},
	itemWeekday: {
		fontSize: 13,
		fontWeight: "500",
        bottom: "7%",
	},
	itemDate: {
        position: "absolute",
        left: "-50%",
        top: -3,
        width: "100%",
        height: height * 0.06,
        padding: "25%",
		alignItems: "center",
		justifyContent: "center",
        fontSize: 15,
		fontWeight: "600",
		backgroundColor: "#cedefe",
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 8,
	},
	activeItem: {
        width: "90%",
        paddingTop: 10,
		alignItems: "center",
        justifyContent: "space-between",
		backgroundColor: "#E49773",
		borderStyle: "dashed",
		borderWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
		borderRadius: 8,
	},
    activeNumber: {
        bottom: "12%",
        padding: 7,
		alignItems: "center",
		justifyContent: "center",
        fontSize: 15,
		fontWeight: "600",
		backgroundColor: "#cedefe",
		borderWidth: 1,
		borderRadius: 8,
    },
});
