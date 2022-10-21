import { setBackgroundColorAsync } from "expo-system-ui";
import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

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
        <View>
            <ContributionGraph
                values={commitsData}
                endDate={new Date("2017-04-01")}
                numDays={105}
                width={screenWidth}
                height={220}
                showOutOfRangeDays
                style={{
                    borderRadius: 16,
                    marginLeft: -22
                }}
                chartConfig={chartConfig}
            // accessor={}
            />
        </View>
    );
};

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(240, 154, 42, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default ProfileContributionGraph;