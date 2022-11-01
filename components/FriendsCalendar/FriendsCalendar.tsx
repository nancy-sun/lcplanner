import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { View } from "../Themed";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";

interface FriendsCalendarProps {
    setShowTasks: (day: string) => void,
    // showTasks: string,
    // dateMarks: any
};

function FriendsCalendar({ setShowTasks }: FriendsCalendarProps) {

    const screenWidth = Dimensions.get("window").width;

    return (
        <View
            style={{
                height: 100,
                width: screenWidth
            }}>
            <CalendarProvider
                date={new Date().toLocaleDateString("en-CA")}
                style={{
                    width: screenWidth
                }}
            >
                <WeekCalendar
                    style={{
                        width: screenWidth
                    }}
                    onDayPress={(day) => {
                        setShowTasks(day.dateString)
                    }}
                    firstDay={7}
                    theme={calendarTheme}
                />
            </CalendarProvider>
        </View>
    );
};

const calendarTheme: Theme = {
    backgroundColor: "#ffffff",
    arrowColor: "#F09B2A",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: "#448f4b",
    selectedDayTextColor: "#f3f3f3",
    todayTextColor: "#448f4b",
    dayTextColor: "#222222",
    textDisabledColor: "#d9e1e8",
    dotColor: "#F09B2A",
    selectedDotColor: "#ffffff",
    disabledArrowColor: "#d9e1e8",
    monthTextColor: "#red",
    indicatorColor: "blue",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "400",
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
};

export default FriendsCalendar;