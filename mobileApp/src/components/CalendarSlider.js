import { useState, useCallback } from "react";
import {
    Dimensions,
	StyleSheet,
	View,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const height = Dimensions.get("screen").height;
const dayComponentHeight = height * 0.07;
const numberComponentHeight = height * 0.0525;

export default function CalendarSlider({day, setDay}) {

    const [selected, setSelected] = useState(day);

    const handleDayChange = useCallback((date) => {
        setDay(date.toDate());
        setSelected(date);
    }, [day]);
	
	return (
		<View style={styles.container}>
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
                dayComponentHeight = {dayComponentHeight}
                leftSelector={[]}
                rightSelector={[]}
            />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        height: "100%",
        width: "100%",
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	item: {
        position: "relative",
		width: "87%",
        height: dayComponentHeight,
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
        width: "100%",
        height: dayComponentHeight,
        bottom: "7%",
		fontSize: 13,
		fontWeight: "500",
	},
	itemDate: {
        position: "absolute",
        left: "-50%",
        top: (-1) * numberComponentHeight,
        width: "100%",
        height: height * 0.045,
        padding: "20%",
		alignItems: "center",
		justifyContent: "center",
        fontSize: 14,
		fontWeight: "600",
		backgroundColor: "#cedefe",
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 8,
	},
	activeItem: {
        width: "90%",
        height: dayComponentHeight,
        paddingVertical: 6,
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
        bottom: numberComponentHeight,
        padding: "12%",
		alignItems: "center",
		justifyContent: "center",
        fontSize: 14,
		fontWeight: "600",
		backgroundColor: "#cedefe",
		borderWidth: 1,
		borderRadius: 8,
    },
});
