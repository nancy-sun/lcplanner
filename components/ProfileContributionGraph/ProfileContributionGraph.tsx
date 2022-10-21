import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

function ProfileContributionGraph({ lcCalendarStat }: { lcCalendarStat: Array<any> }) {
    const screenWidth = Dimensions.get("window").width;
    return (
        <View>
            {lcCalendarStat &&
                <ContributionGraph
                    values={lcCalendarStat}
                    endDate={new Date(Date.now())}
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
            }
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