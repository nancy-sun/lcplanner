import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import styles from "./TasksCalendarStyles";

interface TasksCalendarProps {
    setShowTasks: (day: string) => void,
    showTasks: string,
    dateMarks: any
}

function TasksCalendar({ setShowTasks, showTasks, dateMarks }: TasksCalendarProps) {

    useEffect(() => {
        let date = new Date();
        setShowTasks(date.toLocaleDateString('en-CA'))
    }, [])

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
                markedDates={{
                    [showTasks]: { selected: true },
                    [dateMarks]: { marked: true }
                }}
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
    selectedDayBackgroundColor: "#448f4b",
    selectedDayTextColor: '#f3f3f3',
    todayTextColor: "#448f4b",
    dayTextColor: '#222222',
    textDisabledColor: '#d9e1e8',
    dotColor: "#f09a2a",
    selectedDotColor: "#ffffff",
    disabledArrowColor: '#d9e1e8',
    monthTextColor: "#red",
    indicatorColor: 'blue',
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "400",
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
}

export default TasksCalendar;