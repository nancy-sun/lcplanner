import { setBackgroundColorAsync } from "expo-system-ui";
import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
// import { ContributionChartValue } from "react-native-chart-kit/dist/contribution-graph/ContributionGraph";

function ProfileContributionGraph() {
    const screenWidth = Dimensions.get("window").width;

    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
    ];

    return (
        <View style={{ backgroundColor: "white" }}>
            <ContributionGraph
                values={commitsData}
                endDate={new Date("2017-04-01")}
                numDays={105}
                width={screenWidth}
                height={220}
                showOutOfRangeDays
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    backgroundColor: "white",
                }}
                chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
            // accessor={}
            />
        </View>
    );
};

const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    propsForBackgroundLines: {
        stroke: "rgba(140,140,140,.5)",
        strokeWidth: 1
    },
};

export default ProfileContributionGraph;