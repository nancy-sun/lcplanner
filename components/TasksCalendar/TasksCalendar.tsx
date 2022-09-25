import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import styles from "./TasksCalendarStyles";

interface TasksCalendarProps {
    setShowTasks: (day: string) => void,

}

function TasksCalendar({ setShowTasks }: TasksCalendarProps) {

    const [today, setToday] = useState<string>("");


    useEffect(() => {
        let date = new Date();
        setToday(date.toISOString())
    }, [])
    console.log(today)

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => {
                    setShowTasks(day.dateString)
                }}
                monthFormat={"MMM yyyy"}
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={7} // first day in the week
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                theme={calendarTheme}
            />
        </View>
    )
};

const calendarTheme = {
    backgroundColor: '#ffffff',
    arrowColor: "#f09a2a",
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: "#f09a2a",
    selectedDayTextColor: '#ffffff',
    todayTextColor: "#448f4b",
    dayTextColor: '#222222',
    textDisabledColor: '#d9e1e8',
    dotColor: "#448f4b",
    selectedDotColor: '#ffffff',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: "#red",
    indicatorColor: 'blue',
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16
}

export default TasksCalendar;